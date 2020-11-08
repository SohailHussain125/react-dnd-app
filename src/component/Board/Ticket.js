import React from "react";
import "./index.css";
import { useDrag, useDrop } from "react-dnd";

// export const Ticket = ({ ticket, index }) => (
//   <div className="ticket-div">
//     {ticket.map((tick) => (
//       <div className="ticket">
//         {index}
//         {tick.id}
//       </div>
//     ))}
//   </div>
// );

export function Ticket({
  ticket,
  Swimindex,
  ticketIndex,
  replaceTicket,
  findCard,
  moveCard,
}) {
  const originalIndex = findCard(ticket.id).index;
  console.log('')
  const [{ isDragging }, drag] = useDrag({
    item: {
      id: ticket.id,
      ticketIndex,
      Swimindex,
      originalIndex,
      type: "name",
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // const dropResult = monitor.getDropResult();
      const didDrop = monitor.didDrop();
      const { id: droppedId, originalIndex } = monitor.getItem();
      if (!didDrop) {
        moveCard(droppedId, originalIndex);
      }
      // if (item && dropResult) {
      //   // console.log(dropResult, "==dropResult");
      //   replaceTicket(item, dropResult);
      //   // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      // }
    },
  });
  const [, drop] = useDrop({
    accept: "name",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== ticket.id) {
        const { index: overIndex } = findCard(ticket.id);
        moveCard(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0.5 : 1;
  const style = {
    // border: "1px dashed gray",
    // padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move"
  };
  return (
    <div ref={(node) => drag(drop(node))} key={ticketIndex} style={{...style, opacity }}>
      <div className="ticket-div" >
        <div className="ticket">
          {/* {Swimindex} */}
          {ticket.id}
        </div>
      </div>
    </div>
  );
}




