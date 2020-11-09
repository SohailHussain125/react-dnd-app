// import React, { useState } from "react";
// import { useDrop } from "react-dnd";
// import DndProviderWrap from "../DndProviderWrap/index";
// import { Card } from "./Card";
// import update from "immutability-helper";
// import { ItemTypes } from "./ItemTypes";
// import './index.css'
// export const DrazzlingListDrag = DndProviderWrap(function DrazzlingListDrags() {
//   const style = {
//     width: 400,
//   };
//   const ITEMS = [
//     { id: "p1" },
//     { id: "p2" },
//     { id: "p3" },
//     { id: "p4" },
//     { id: "p5" },
//     { id: "p6" },
//   ];
//   const [cards, setCards] = useState(ITEMS);
//   const moveCard = (id, atIndex) => {
//     console.log("move");

//     const { card, index } = findCard(id);
//     setCards(
//       update(cards, {
//         $splice: [
//           [index, 1],
//           [atIndex, 0, card],
//         ],
//       })
//     );
//   };
//   const findCard = (id) => {
//     const card = cards.filter((c) => `${c.id}` === id)[0];
//     return {
//       card,
//       index: cards.indexOf(card),
//     };
//   };
//   const [, drop] = useDrop({ accept: ItemTypes.CARD });
//   return (
//     <>
//       <div ref={drop} style={style}>
//         {cards.map((card) => (
//           <Card
//             key={card.id}
//             id={`${card.id}`}
//             text={card.id}
//             moveCard={moveCard}
//             findCard={findCard}
//           />
//         ))}
//       </div>
//     </>
//   );
// });

import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DndProviderWrap from "../DndProviderWrap/index";
import { Card } from "./Card";
import update from "immutability-helper";
import { ItemTypes } from "./ItemTypes";
import "./index.css";
export const DrazzlingListDrag = DndProviderWrap(function DrazzlingListDrags() {
  const style = {
    width: 400,
  };
  const ITEMS = [
    {
      swimId: 1,
      name: "Open",
      card: [
        { id: "Op1" },
        { id: "Op2" },
        { id: "Op3" },
        { id: "Op4" },
        { id: "Op5" },
        { id: "Op6" },
      ],
    },
    {
      swimId: 2,
      name: "In Progress",
      card: [
        { id: "IP1" },
        { id: "IP2" },
        { id: "IP3" },
        { id: "IP4" },
        { id: "IP5" },
        { id: "IP6" },
      ],
    },
    {
      swimId: 3,
      name: "Done",
      card: [
        { id: "D1" },
        { id: "D2" },
        { id: "D3" },
        { id: "D4" },
        { id: "D5" },
        { id: "D6" },
      ],
    },
  ];
  const [state, setState] = useState({ SwimLane: ITEMS });
  const { SwimLane } = state;
  const moveCard = (id, atIndex, SwimIndex, dragSwimIndex, DropId) => {
    const { card, index } = findCard(id, dragSwimIndex);
    const { index: onDropIndex } = findCard(DropId, SwimIndex);
    if (SwimIndex === dragSwimIndex) {
      let updatedCard = update(SwimLane[dragSwimIndex].card, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      });
      SwimLane[dragSwimIndex].card = updatedCard;
      setState({ ...state, SwimLane });
    } else {
      console.log("dragSwimIndex,SwimIndex,index,onDropIndex");
      console.log(dragSwimIndex, SwimIndex, index, onDropIndex);

      if (
        dragSwimIndex !== -1 &&
        SwimIndex !== -1 &&
        index !== -1 &&
        onDropIndex !== -1
      ) {
        let updatedCard = update(SwimLane[dragSwimIndex].card, {
          $splice: [[index, 1]],
        });
        let updatedDropCard = update(SwimLane[SwimIndex].card, {
          $splice: [, [onDropIndex, 0, card]],
        });

        SwimLane[dragSwimIndex].card = updatedCard;
        SwimLane[SwimIndex].card = updatedDropCard;
        setState({ ...state, SwimLane });
      }
    }
  };
  const findCard = (id, i) => {
    const card = SwimLane[i].card.filter((c) => `${c.id}` === id)[0];
    return {
      card,
      index: SwimLane[i].card.indexOf(card),
    };
  };

  const findSwimLane = (swimId) => {
    console.log('swimId',swimId)
    const swim = SwimLane.filter((c) => c.swimId === swimId)[0];
    return {
      swim,
      index: SwimLane.indexOf(swim),
    };
  };

  const [, drop] = useDrop({ accept: ItemTypes.CARD });
  return (
    <>
      <div ref={drop} className="flex-column" style={{ height: "100%" }}>
        {SwimLane.map((swim, SwimIndex) => (
          <div style={style}>
            <div>{swim.name}</div>
            {swim.card.map((card, cardIndex) => (
              <Card
                key={card.id}
                id={`${card.id}`}
                text={card.id}
                moveCard={moveCard}
                findCard={findCard}
                findSwimLane={findSwimLane}
                swim={swim}
                swimId={swim.swimId}
                cardIndex={cardIndex}
                SwimIndex={SwimIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
});
