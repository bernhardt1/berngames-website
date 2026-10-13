// Authored 16-board remix; see Tools/author-campaign.mjs and Docs/CAMPAIGN.md.
export const CAMPAIGN = [
  {
    "id": "rock-first-spark",
    "title": "First Spark",
    "hint": "Tap to boom. Hold to preview. Rocks block blasts.",
    "chapter": 0,
    "moves": 0,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 1,
        "row": 3
      },
      {
        "id": "b1",
        "kind": "barrel",
        "col": 3,
        "row": 3
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 0,
        "row": 3
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 3,
        "row": 1
      },
      {
        "id": "g2",
        "kind": "goblin",
        "col": 3,
        "row": 5
      },
      {
        "id": "g3",
        "kind": "goblin",
        "col": 4,
        "row": 3
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 1,
        "row": 2
      }
    ],
    "solution": [
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 0
  },
  {
    "id": "rock-around",
    "title": "Around the Rock",
    "hint": "A rock blocks the obvious connection. Try the other side.",
    "chapter": 0,
    "moves": 1,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 2,
        "row": 3
      },
      {
        "id": "b1",
        "kind": "barrel",
        "col": 4,
        "row": 2
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 4,
        "row": 3
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 2,
        "row": 0
      },
      {
        "id": "g2",
        "kind": "goblin",
        "col": 0,
        "row": 2
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 3,
        "row": 3
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "b0",
        "to": {
          "col": 2,
          "row": 2
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 1
  },
  {
    "id": "rock-long-carry",
    "title": "Long Carry",
    "hint": "You can move the same barrel twice.",
    "chapter": 0,
    "moves": 2,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 0,
        "row": 3
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 4,
        "row": 3
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 2,
        "row": 1
      },
      {
        "id": "g2",
        "kind": "goblin",
        "col": 2,
        "row": 5
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 0,
        "row": 1
      },
      {
        "id": "s1",
        "kind": "stone",
        "col": 1,
        "row": 1
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "b0",
        "to": {
          "col": 1,
          "row": 3
        }
      },
      {
        "type": "move",
        "id": "b0",
        "to": {
          "col": 2,
          "row": 3
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 2
  },
  {
    "id": "rock-two-links",
    "title": "Two Missing Links",
    "hint": "Two gaps. Two moves. Connect the whole relay.",
    "chapter": 0,
    "moves": 2,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 0,
        "row": 1
      },
      {
        "id": "b1",
        "kind": "barrel",
        "col": 3,
        "row": 1
      },
      {
        "id": "b2",
        "kind": "barrel",
        "col": 2,
        "row": 3
      },
      {
        "id": "b3",
        "kind": "barrel",
        "col": 4,
        "row": 3
      },
      {
        "id": "b4",
        "kind": "barrel",
        "col": 3,
        "row": 5
      },
      {
        "id": "b5",
        "kind": "barrel",
        "col": 2,
        "row": 5
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 0,
        "row": 0
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 1,
        "row": 1
      },
      {
        "id": "g2",
        "kind": "goblin",
        "col": 2,
        "row": 0
      },
      {
        "id": "g3",
        "kind": "goblin",
        "col": 4,
        "row": 1
      },
      {
        "id": "g4",
        "kind": "goblin",
        "col": 4,
        "row": 6
      },
      {
        "id": "g5",
        "kind": "goblin",
        "col": 2,
        "row": 6
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 1,
        "row": 2
      },
      {
        "id": "s1",
        "kind": "stone",
        "col": 3,
        "row": 2
      },
      {
        "id": "s2",
        "kind": "stone",
        "col": 1,
        "row": 3
      },
      {
        "id": "s3",
        "kind": "stone",
        "col": 3,
        "row": 4
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "b1",
        "to": {
          "col": 2,
          "row": 1
        }
      },
      {
        "type": "move",
        "id": "b4",
        "to": {
          "col": 4,
          "row": 5
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 2
  },
  {
    "id": "armor-thick-skin",
    "title": "Thick Skin",
    "hint": "Orcs have two health. Use two different explosions.",
    "chapter": 1,
    "moves": 0,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 1,
        "row": 3
      },
      {
        "id": "b1",
        "kind": "barrel",
        "col": 3,
        "row": 3
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 1,
        "row": 1
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 3,
        "row": 5
      },
      {
        "id": "o0",
        "kind": "orc",
        "col": 2,
        "row": 3
      }
    ],
    "solution": [
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 0
  },
  {
    "id": "armor-second-opinion",
    "title": "Second Opinion",
    "hint": "Arrange a second blast for the armored orc.",
    "chapter": 1,
    "moves": 1,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 1,
        "row": 3
      },
      {
        "id": "b1",
        "kind": "barrel",
        "col": 3,
        "row": 2
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 1,
        "row": 0
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 3,
        "row": 4
      },
      {
        "id": "o0",
        "kind": "orc",
        "col": 2,
        "row": 2
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "b0",
        "to": {
          "col": 1,
          "row": 2
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 1
  },
  {
    "id": "armor-heavy-metal",
    "title": "Heavy Metal",
    "hint": "Both shields need two sources. Repair both branches.",
    "moves": 2,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 0,
        "row": 2
      },
      {
        "id": "b1",
        "kind": "barrel",
        "col": 3,
        "row": 2
      },
      {
        "id": "b2",
        "kind": "barrel",
        "col": 3,
        "row": 5
      },
      {
        "id": "b3",
        "kind": "barrel",
        "col": 0,
        "row": 5
      },
      {
        "id": "b4",
        "kind": "barrel",
        "col": 1,
        "row": 4
      },
      {
        "id": "o0",
        "kind": "orc",
        "col": 0,
        "row": 3
      },
      {
        "id": "o1",
        "kind": "orc",
        "col": 3,
        "row": 3
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 2,
        "row": 4
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 1,
        "row": 6
      },
      {
        "id": "g2",
        "kind": "goblin",
        "col": 4,
        "row": 2
      },
      {
        "id": "g3",
        "kind": "goblin",
        "col": 4,
        "row": 4
      },
      {
        "id": "g4",
        "kind": "goblin",
        "col": 0,
        "row": 0
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "b2",
        "to": {
          "col": 3,
          "row": 4
        }
      },
      {
        "type": "move",
        "id": "b3",
        "to": {
          "col": 0,
          "row": 4
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "chapter": 1,
    "minimumMoves": 2
  },
  {
    "id": "armor-make-room",
    "title": "Make Some Room",
    "hint": "Clear a space, then bring the second fuse through.",
    "chapter": 1,
    "moves": 3,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 1,
        "row": 2
      },
      {
        "id": "b1",
        "kind": "barrel",
        "col": 0,
        "row": 1
      },
      {
        "id": "b2",
        "kind": "barrel",
        "col": 3,
        "row": 2
      },
      {
        "id": "b3",
        "kind": "barrel",
        "col": 3,
        "row": 4
      },
      {
        "id": "b4",
        "kind": "barrel",
        "col": 1,
        "row": 4
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 2,
        "row": 0
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 1,
        "row": 6
      },
      {
        "id": "g2",
        "kind": "goblin",
        "col": 4,
        "row": 4
      },
      {
        "id": "o0",
        "kind": "orc",
        "col": 1,
        "row": 3
      },
      {
        "id": "o1",
        "kind": "orc",
        "col": 3,
        "row": 3
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 0,
        "row": 2
      },
      {
        "id": "s1",
        "kind": "stone",
        "col": 3,
        "row": 1
      },
      {
        "id": "s2",
        "kind": "stone",
        "col": 2,
        "row": 4
      },
      {
        "id": "s3",
        "kind": "stone",
        "col": 1,
        "row": 0
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "b0",
        "to": {
          "col": 2,
          "row": 2
        }
      },
      {
        "type": "move",
        "id": "b1",
        "to": {
          "col": 1,
          "row": 1
        }
      },
      {
        "type": "move",
        "id": "b1",
        "to": {
          "col": 1,
          "row": 2
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 3
  },
  {
    "id": "gold-double-boom",
    "title": "Double BOOM",
    "hint": "Gold barrels deal two damage. Same two-tile reach.",
    "chapter": 2,
    "moves": 0,
    "pieces": [
      {
        "id": "h0",
        "kind": "heavy",
        "col": 2,
        "row": 3
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 4,
        "row": 3
      },
      {
        "id": "o0",
        "kind": "orc",
        "col": 0,
        "row": 3
      },
      {
        "id": "o1",
        "kind": "orc",
        "col": 2,
        "row": 1
      },
      {
        "id": "o2",
        "kind": "orc",
        "col": 2,
        "row": 5
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 1,
        "row": 2
      }
    ],
    "solution": [
      {
        "type": "ignite",
        "id": "h0"
      }
    ],
    "minimumMoves": 0
  },
  {
    "id": "gold-corner-shot",
    "title": "Golden Corner",
    "hint": "Connect the gold keg to the ordinary barrel.",
    "chapter": 2,
    "moves": 1,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 3,
        "row": 2
      },
      {
        "id": "h0",
        "kind": "heavy",
        "col": 1,
        "row": 3
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 1,
        "row": 0
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 3,
        "row": 4
      },
      {
        "id": "o0",
        "kind": "orc",
        "col": 1,
        "row": 1
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 2,
        "row": 3
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "h0",
        "to": {
          "col": 1,
          "row": 2
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 1
  },
  {
    "id": "gold-corner-carry",
    "title": "Golden Detour",
    "hint": "Carry the relay around the rock. Gold cracks armor.",
    "chapter": 2,
    "moves": 2,
    "pieces": [
      {
        "id": "b0",
        "kind": "heavy",
        "col": 0,
        "row": 1
      },
      {
        "id": "b1",
        "kind": "barrel",
        "col": 2,
        "row": 1
      },
      {
        "id": "b2",
        "kind": "barrel",
        "col": 1,
        "row": 4
      },
      {
        "id": "b3",
        "kind": "barrel",
        "col": 4,
        "row": 3
      },
      {
        "id": "b4",
        "kind": "barrel",
        "col": 4,
        "row": 5
      },
      {
        "id": "b5",
        "kind": "barrel",
        "col": 2,
        "row": 5
      },
      {
        "id": "g0",
        "kind": "orc",
        "col": 0,
        "row": 0
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 2,
        "row": 6
      },
      {
        "id": "g2",
        "kind": "goblin",
        "col": 1,
        "row": 1
      },
      {
        "id": "o0",
        "kind": "orc",
        "col": 3,
        "row": 3
      },
      {
        "id": "o1",
        "kind": "orc",
        "col": 4,
        "row": 4
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 2,
        "row": 4
      },
      {
        "id": "s1",
        "kind": "stone",
        "col": 3,
        "row": 2
      },
      {
        "id": "s2",
        "kind": "stone",
        "col": 0,
        "row": 4
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "b2",
        "to": {
          "col": 1,
          "row": 3
        }
      },
      {
        "type": "move",
        "id": "b2",
        "to": {
          "col": 2,
          "row": 3
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 2
  },
  {
    "id": "gold-switchback",
    "title": "The Golden Switchback",
    "hint": "Make room, connect the gold keg, then light the fuse.",
    "chapter": 2,
    "moves": 3,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 1,
        "row": 3
      },
      {
        "id": "b1",
        "kind": "barrel",
        "col": 0,
        "row": 2
      },
      {
        "id": "b2",
        "kind": "heavy",
        "col": 2,
        "row": 1
      },
      {
        "id": "b3",
        "kind": "barrel",
        "col": 4,
        "row": 1
      },
      {
        "id": "b4",
        "kind": "barrel",
        "col": 4,
        "row": 3
      },
      {
        "id": "b5",
        "kind": "barrel",
        "col": 2,
        "row": 5
      },
      {
        "id": "b6",
        "kind": "barrel",
        "col": 1,
        "row": 5
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 1,
        "row": 6
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 2,
        "row": 6
      },
      {
        "id": "g2",
        "kind": "goblin",
        "col": 0,
        "row": 3
      },
      {
        "id": "g3",
        "kind": "orc",
        "col": 2,
        "row": 0
      },
      {
        "id": "o0",
        "kind": "orc",
        "col": 1,
        "row": 4
      },
      {
        "id": "o1",
        "kind": "orc",
        "col": 3,
        "row": 1
      },
      {
        "id": "o2",
        "kind": "orc",
        "col": 4,
        "row": 2
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 2,
        "row": 4
      },
      {
        "id": "s1",
        "kind": "stone",
        "col": 3,
        "row": 3
      },
      {
        "id": "s2",
        "kind": "stone",
        "col": 1,
        "row": 1
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "b0",
        "to": {
          "col": 2,
          "row": 3
        }
      },
      {
        "type": "move",
        "id": "b1",
        "to": {
          "col": 1,
          "row": 2
        }
      },
      {
        "type": "move",
        "id": "b1",
        "to": {
          "col": 1,
          "row": 3
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 3
  },
  {
    "id": "roll-first-push",
    "title": "Roll With It",
    "hint": "A blast pushes a wheeled barrel one tile, then BOOM.",
    "chapter": 3,
    "moves": 0,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 0,
        "row": 3
      },
      {
        "id": "r0",
        "kind": "roller",
        "col": 2,
        "row": 3
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 0,
        "row": 1
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 3,
        "row": 1
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 1,
        "row": 2
      }
    ],
    "solution": [
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 0
  },
  {
    "id": "roll-corner-shot",
    "title": "Rolling Corner",
    "hint": "Aim the push. A blocked roller explodes in place.",
    "chapter": 3,
    "moves": 1,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 0,
        "row": 3
      },
      {
        "id": "r0",
        "kind": "roller",
        "col": 2,
        "row": 2
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 0,
        "row": 1
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 3,
        "row": 1
      },
      {
        "id": "g2",
        "kind": "goblin",
        "col": 4,
        "row": 3
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 2,
        "row": 4
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "r0",
        "to": {
          "col": 2,
          "row": 3
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 1
  },
  {
    "id": "roll-gold-relay",
    "title": "Rolling Gold",
    "hint": "Aim the roller to reach the gold keg and the top rival.",
    "chapter": 3,
    "moves": 2,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 0,
        "row": 3
      },
      {
        "id": "h0",
        "kind": "heavy",
        "col": 3,
        "row": 4
      },
      {
        "id": "r0",
        "kind": "roller",
        "col": 1,
        "row": 2
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 0,
        "row": 1
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 3,
        "row": 0
      },
      {
        "id": "o0",
        "kind": "orc",
        "col": 3,
        "row": 6
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 2,
        "row": 3
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "b0",
        "to": {
          "col": 0,
          "row": 2
        }
      },
      {
        "type": "move",
        "id": "r0",
        "to": {
          "col": 2,
          "row": 2
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 2
  },
  {
    "id": "roll-powder-pinball",
    "title": "Powder Pinball",
    "hint": "Three moves. Two rollers. One glorious chain.",
    "chapter": 3,
    "moves": 3,
    "pieces": [
      {
        "id": "b0",
        "kind": "barrel",
        "col": 0,
        "row": 4
      },
      {
        "id": "h0",
        "kind": "heavy",
        "col": 3,
        "row": 4
      },
      {
        "id": "r0",
        "kind": "roller",
        "col": 1,
        "row": 2
      },
      {
        "id": "r1",
        "kind": "roller",
        "col": 3,
        "row": 0
      },
      {
        "id": "g0",
        "kind": "goblin",
        "col": 0,
        "row": 1
      },
      {
        "id": "g1",
        "kind": "goblin",
        "col": 1,
        "row": 0
      },
      {
        "id": "g2",
        "kind": "goblin",
        "col": 4,
        "row": 0
      },
      {
        "id": "o0",
        "kind": "orc",
        "col": 3,
        "row": 5
      },
      {
        "id": "o1",
        "kind": "orc",
        "col": 3,
        "row": 6
      },
      {
        "id": "s0",
        "kind": "stone",
        "col": 2,
        "row": 3
      },
      {
        "id": "s1",
        "kind": "stone",
        "col": 2,
        "row": 4
      }
    ],
    "solution": [
      {
        "type": "move",
        "id": "b0",
        "to": {
          "col": 0,
          "row": 3
        }
      },
      {
        "type": "move",
        "id": "b0",
        "to": {
          "col": 0,
          "row": 2
        }
      },
      {
        "type": "move",
        "id": "r0",
        "to": {
          "col": 2,
          "row": 2
        }
      },
      {
        "type": "ignite",
        "id": "b0"
      }
    ],
    "minimumMoves": 3
  }
];
