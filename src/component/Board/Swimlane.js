import "./index.css";
import { Ticket } from "./Ticket";
import { useDrop ,useDrag} from "react-dnd";
// export const Swimlane = ({ ticket, index }) => (
//   <div className="ticket-div">
//     {ticket.map((tick) => (
//       //   <div className="ticket">
//       //     {index}
//       //     {tick.id}
//       //   </div>
//       <Ticket ticket={tick} index={index} />
//     ))}
//   </div>
// );

export function Swimlane({ ticket, index, replaceTicket }) {

    let [{ isDragging }, drag] = useDrag({
        item: { type: "name", ticket, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (dropResult, monitor) => {
            const { id: droppedId, originalIndex } = monitor.getItem();
            const didDrop = monitor.didDrop();
            console.log(monitor.getItem(),">>>")
            if (!didDrop) {
                console.log('==========')
                // moveCard(droppedId, originalIndex);
            }
        },
    });

  const [collectedProps, drop] = useDrop({
    accept: "name",
    drop: () => ({ isDrop: index }),
    hover: (props, monitor, component) => {
    //   console.log(props, "=======props");
    //   console.log(monitor.getItem(), "=======monitor");
    //   console.log(component, "=======component");
    },
    collect: (monitor) => ({
        // isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{  opacity }}>
      <div className="ticket-div">
        {ticket.map((tick, i) => (
          //   <div className="ticket">
          //     {index}
          //     {tick.id}
          //   </div>
          <Ticket
            ticket={tick}
            Swimindex={index}
            ticketIndex={i}
            replaceTicket={replaceTicket}
          />
        ))}
      </div>
    </div>
  );
}
