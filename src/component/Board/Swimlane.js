import "./index.css";
import { Ticket } from "./Ticket";
import { useDrop, useDrag } from "react-dnd";

export function Swimlane({ ticket, index, replaceTicket, findCard, moveCard }) {
  const [, drop] = useDrop({
    accept: "name",
    // drop: () => ({ isDrop: index }),
  });

  //   const findCard = (id) => {
  //     const card = cards.filter((c) => `${c.id}` === id)[0];
  //     return {
  //         card,
  //         index: cards.indexOf(card),
  //     };
  // };
  return (
    <div  >
      <div className="ticket-div" ref={drop}>
        {ticket.map((tick, i) => (
          <Ticket
            ticket={tick}
            Swimindex={index}
            ticketIndex={i}
            replaceTicket={replaceTicket}
            findCard={findCard}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
}
