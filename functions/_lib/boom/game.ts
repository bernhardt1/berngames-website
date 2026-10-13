import { COLS, ROWS, LEVELS, type Piece, type Position, type Command, isBarrel } from './levels';
export type State = { level: number; pieces: Piece[]; used: number; status: 'planning' | 'won' | 'lost'; history: { pieces: Piece[]; used: number }[] };
export type Hit = { id: string; count: number; required: number; damage: number; defeated: boolean };
export type Roll = {id:string;from:Position;to:Position;source:string;blocked:boolean};
export type Blast = { id: string; origin: Position; cells: Position[]; hits: Hit[]; damage:number; rolls:Roll[] };
export type Outcome = { waves: Blast[][]; detonated: string[]; defeated: string[]; survivors: string[]; hits: Record<string, string[]>; damage:Record<string,number>; remaining:Piece[]; won: boolean };
export const key = (p: Position) => `${p.col},${p.row}`;
export const copyPieces = (pieces: Piece[]) => pieces.map(p => ({...p}));
export const inside = (p: Position) => Number.isInteger(p.col) && Number.isInteger(p.row) && p.col >= 0 && p.col < COLS && p.row >= 0 && p.row < ROWS;
export const enemies = (pieces: Piece[]) => pieces.filter(p => p.kind === 'goblin' || p.kind === 'orc');
export const requiredHits = (p: Piece) => p.kind === 'orc' ? 2 : 1;
export function createState(level = 0): State {
  if (!Number.isInteger(level) || !LEVELS[level]) throw new Error('Unknown board');
  return {level, pieces: copyPieces(LEVELS[level].pieces), used: 0, status:'planning', history:[]};
}
export function blastCells(pieces: Piece[], origin: Position): Position[] {
  const stones = new Set(pieces.filter(p => p.kind === 'stone').map(key));
  const cells: Position[] = [];
  for (const [dc,dr] of [[0,-1],[1,0],[0,1],[-1,0]]) for (let distance=1;distance<=2;distance++) {
    const p = {col:origin.col+dc*distance,row:origin.row+dr*distance};
    if (!inside(p) || stones.has(key(p))) break;
    cells.push(p);
  }
  return cells;
}
export function resolveBlast(pieces: Piece[], id: string): Outcome | null {
  const first=pieces.find(p=>p.id===id&&isBarrel(p));if(!first)return null;
  let active=copyPieces(pieces),current=[id];
  const scheduled=new Set([id]),defeated=new Set<string>(),sources=new Map<string,Map<string,number>>();
  const waves:Blast[][]=[];
  while(current.length){
    // Every explosion in a beat reads the same layout. Rollers move between beats.
    const snapshot=copyPieces(active),at=new Map(snapshot.map(p=>[key(p),p]));
    const next:string[]=[],kicks:{piece:Piece;source:Blast}[]=[],wave:Blast[]=[];
    for(const barrelId of current){
      const barrel=snapshot.find(p=>p.id===barrelId)!;
      const blast:Blast={id:barrelId,origin:{col:barrel.col,row:barrel.row},cells:blastCells(snapshot,barrel),damage:barrel.kind==='heavy'?2:1,hits:[],rolls:[]};
      wave.push(blast);
      for(const cell of blast.cells){
        const piece=at.get(key(cell));if(!piece)continue;
        if(isBarrel(piece)&&!scheduled.has(piece.id)){
          scheduled.add(piece.id);next.push(piece.id);
          if(piece.kind==='roller')kicks.push({piece,source:blast});
        }
        if(piece.kind==='goblin'||piece.kind==='orc'){
          const hits=sources.get(piece.id)??new Map<string,number>();hits.set(barrelId,blast.damage);sources.set(piece.id,hits);
          const count=[...hits.values()].reduce((sum,value)=>sum+value,0),required=requiredHits(piece),killed=count>=required;
          if(killed)defeated.add(piece.id);
          blast.hits.push({id:piece.id,count,required,damage:blast.damage,defeated:killed});
        }
      }
    }
    // Cleared tiles are empty before knockback. First contact sets the direction;
    // each barrel is scheduled once, so later hits cannot move it a second time.
    active=active.filter(p=>!current.includes(p.id)&&!defeated.has(p.id));
    for(const {piece,source}of kicks){
      const roller=active.find(p=>p.id===piece.id)!;
      const from={col:roller.col,row:roller.row},target={col:from.col+Math.sign(from.col-source.origin.col),row:from.row+Math.sign(from.row-source.origin.row)};
      const blocked=!inside(target)||active.some(p=>key(p)===key(target));
      const to=blocked?from:target;Object.assign(roller,to);
      source.rolls.push({id:piece.id,from,to,source:source.id,blocked});
    }
    waves.push(wave);current=next;
  }
  const survivors=enemies(active).map(p=>p.id);
  return{waves,detonated:[...scheduled],defeated:[...defeated],survivors,remaining:active,
    hits:Object.fromEntries([...sources].map(([id,hits])=>[id,[...hits.keys()]])),
    damage:Object.fromEntries([...sources].map(([id,hits])=>[id,[...hits.values()].reduce((sum,value)=>sum+value,0)])),won:survivors.length===0};
}
export function move(state: State, id: string, to: Position): boolean {
  if (state.status!=='planning' || state.used>=LEVELS[state.level].moves || !inside(to)) return false;
  const barrel=state.pieces.find(p=>p.id===id && isBarrel(p));
  if (!barrel || Math.abs(barrel.col-to.col)+Math.abs(barrel.row-to.row)!==1 || state.pieces.some(p=>key(p)===key(to))) return false;
  state.history.push({pieces:copyPieces(state.pieces),used:state.used});
  barrel.col=to.col; barrel.row=to.row; state.used++; return true;
}
export function undo(state: State): boolean {
  if (state.status!=='planning') return false;
  const last=state.history.pop(); if(!last) return false;
  state.pieces=last.pieces; state.used=last.used; return true;
}
export function ignite(state: State, id: string): Outcome | null {
  if (state.status!=='planning') return null;
  const outcome=resolveBlast(state.pieces,id); if(!outcome) return null;
  state.status=outcome.won?'won':'lost';
  state.pieces=copyPieces(outcome.remaining); return outcome;
}
export function act(state: State, command: Command): boolean | Outcome | null {
  if (command.type==='move') return move(state,command.id,command.to);
  if (command.type==='undo') return undo(state);
  if (command.type==='ignite') return ignite(state,command.id);
  if (command.type==='retry') {Object.assign(state,createState(state.level));return true;} return false;
}
export function solveLevel(level: number): {commands:Command[]; moves:number; winningIgnitions:number} | null {
  const queue=[{state:createState(level),commands:[] as Command[]}], seen=new Set<string>();
  for(let n=0;n<queue.length;n++) {
    const {state,commands}=queue[n];
    const winning=state.pieces.filter(p=>isBarrel(p) && resolveBlast(state.pieces,p.id)?.won);
    if(winning.length) return {commands:[...commands,{type:'ignite',id:winning[0].id}],moves:state.used,winningIgnitions:winning.length};
    if(state.used>=LEVELS[level].moves) continue;
    for(const barrel of state.pieces.filter(p=>isBarrel(p))) for(const [dc,dr] of [[0,-1],[1,0],[0,1],[-1,0]]) {
      const next:State={...state,pieces:copyPieces(state.pieces),history:[]};
      const command:Command={type:'move',id:barrel.id,to:{col:barrel.col+dc,row:barrel.row+dr}};
      if(!move(next,barrel.id,command.to)) continue;
      const signature=next.pieces.map(p=>`${p.id}:${key(p)}`).join('|'); if(seen.has(signature)) continue;
      seen.add(signature);queue.push({state:next,commands:[...commands,command]});
    }
  }
  return null;
}
