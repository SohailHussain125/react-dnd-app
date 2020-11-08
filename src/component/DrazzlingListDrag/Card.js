// import React from "react";
// import { useDrag, useDrop } from "react-dnd";
// import { ItemTypes } from "./ItemTypes";
// const style = {
//   //   border: "1px dashed gray",
//   //   padding: "0.5rem 1rem",
//   marginBottom: ".5rem",
//   backgroundColor: "white",
//   cursor: "move",
// };
// export const Card = ({ id, text, moveCard, findCard }) => {
//   const originalIndex = findCard(id).index;
//   const [{ isDragging }, drag] = useDrag({
//     item: { type: ItemTypes.CARD, id, originalIndex },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     end: (dropResult, monitor) => {
//       const { id: droppedId, originalIndex } = monitor.getItem();
//       const didDrop = monitor.didDrop();
//       if (!didDrop) {
//         moveCard(droppedId, originalIndex);
//       }
//     },
//   });
//   const [, drop] = useDrop({
//     accept: ItemTypes.CARD,
//     canDrop: () => false,
//     hover({ id: draggedId }) {
//       if (draggedId !== id) {
//         const { index: overIndex } = findCard(id);
//         moveCard(draggedId, overIndex);
//       }
//     },
//   });

//   const opacity = isDragging ? 0.5 : 1;
//   return (
//     <div className="ticket-div">
//       <div
//         className="ticket"
//         ref={(node) => drag(drop(node))}
//         style={{
//           ...style,
//           opacity,
//           border: isDragging ? "1px dashed rgba(0, 0, 0, 1)" : "",
//         }}
//       >
//         {text}
//       </div>
//     </div>
//   );
// };

import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
const style = {
  //   border: "1px dashed gray",
  //   padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};
export const Card = ({
  swimId,
  id,
  text,
  moveCard,
  findCard,
  swimIndex,
  ticketIndex,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, swimId, swimIndex, ticketIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { ticketIndex: draggedTicketIndex, swimIndex: dragSwimIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCard(ticketIndex, dragSwimIndex, draggedTicketIndex, swimIndex);
      }
    },
  });
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: () => false,
    hover({ ticketIndex: draggedTicketIndex, swimIndex: dragSwimIndex }) {
      if (ticketIndex !== draggedTicketIndex ) {
        moveCard(ticketIndex, dragSwimIndex, draggedTicketIndex, swimIndex);
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;
  return (
    <div className="ticket-div">
      <div
        className="ticket"
        ref={(node) => drag(drop(node))}
        style={{
          ...style,
          opacity,
          border: isDragging ? "1px dashed rgba(0, 0, 0, 1)" : "",
        }}
      >
        {text}
      </div>
    </div>
  );
};
