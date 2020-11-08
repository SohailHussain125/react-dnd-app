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
    // width: 400,
  };
  const ITEMS = [
    {
      id: "1",
      name: "Open",
      tickets: [
        { id: "O1" },
        { id: "O2" },
        { id: "O3" },
        { id: "O4" },
        { id: "O5" },
        { id: "O6" },
      ],
    },
    {
      id: "2",
      name: "Progress",
      tickets: [
        { id: "P1" },
        { id: "P2" },
        { id: "P3" },
        { id: "P4" },
        { id: "P5" },
        { id: "P6" },
      ],
    },
    {
      id: "3",
      name: "Done",
      tickets: [
        { id: "D1" },
        { id: "D2" },
        { id: "D3" },
        { id: "D4" },
        { id: "D5" },
        { id: "D6" },
      ],
    },
  ];
  const [state, setSwimlane] = useState({ swimlane: ITEMS });
  const { swimlane } = state;
  const moveCard = (
    ticketIndex,
    dragSwimIndex,
    draggedTicketIndex,
    swimIndex
  ) => {
    console.log(ticketIndex, dragSwimIndex, draggedTicketIndex, swimIndex);
    let Ticket = swimlane[dragSwimIndex].tickets[draggedTicketIndex];
    console.log("Ticket", Ticket);
    if (swimIndex === dragSwimIndex) {
      let updatedSwim1 = update(swimlane[dragSwimIndex].tickets, {
        $splice: [
          [draggedTicketIndex, 1],
          [ticketIndex, 0, Ticket],
        ],
      });

      swimlane[dragSwimIndex].tickets = updatedSwim1;
      setSwimlane({ ...state, swimlane });
    }
  };

  const findCard = (id) => {
    const card = swimlane.filter((c) => `${c.id}` === id)[0];
    return {
      card,
      index: swimlane.indexOf(card),
    };
  };
  const [, drop] = useDrop({ accept: ItemTypes.CARD });
  return (
    <>
      <div ref={drop} style={style}>
        <div className="flex-column">
          {swimlane.map((swim, swimIndex) => (
            <div className="swim-div">
              <div className="flex-center-center">{swim.name}</div>
              {swim.tickets.map((ticket, ticketIndex) => (
                <Card
                  key={swim.id}
                  swimId={`${swim.id}`}
                  text={ticket.id}
                  id={ticket.id}
                  swimIndex={swimIndex}
                  ticketIndex={ticketIndex}
                  moveCard={moveCard}
                  findCard={findCard}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
