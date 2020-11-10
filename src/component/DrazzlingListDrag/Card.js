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
//   // const originalIndex = findCard(id).index;
//   const [{ isDragging }, drag] = useDrag({
//     item: { type: ItemTypes.CARD, id },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     end: (dropResult, monitor) => {
//       const { id: droppedId, originalIndex } = monitor.getItem();
//       const didDrop = monitor.didDrop();
//       if (!didDrop) {
//         // moveCard(droppedId, originalIndex);
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
  id,
  text,
  moveCard,
  findCard,
  swim,
  cardIndex,
  SwimIndex,
  swimId,
  findSwimLane,
}) => {
  const originalIndex = findCard(id, SwimIndex).index;
  const originalSwimIndex = findSwimLane(swimId).index;
  console.log("originalSwimIndex", originalSwimIndex);
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      id,
      originalIndex,
      SwimIndex,
      swimId,
      originalSwimIndex,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCard(droppedId, originalIndex);
      }
    },
  });
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: () => false,
    hover({ id: draggedId, SwimIndex: dragSwimIndex, swimId: dragSwimId }) {
      // console.log(SwimIndex, "SwimIndex");
      // console.log(id, "id");

      if (draggedId !== id || dragSwimId !== swimId) {
        const { index: overIndex } = findCard(id, SwimIndex);
        const { index: overSwimIndex } = findSwimLane(swimId);

        moveCard(
          draggedId,
          overIndex,
          SwimIndex,
          dragSwimIndex,
          id,
          overSwimIndex,
          dragSwimId
        );
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
