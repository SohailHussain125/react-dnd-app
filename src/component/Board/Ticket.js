import "./index.css";
import { useDrag } from "react-dnd";

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



export function Ticket({ticket, Swimindex,ticketIndex,replaceTicket}) {
  const [collectedProps, drag] = useDrag({
    item: { ticketIndex,Swimindex, type:"name" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(dropResult,"==dropResult")
        replaceTicket(item,dropResult)
          // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
  },
  
  collect: (monitor) => { 
    return({
      isDragging: monitor.isDragging(),
      
  })},
  isDragging:(monitior)=>{
        // console.log(monitior.getItem(),"props") 
  }
  });
  return (
    <div ref={drag} key={ticketIndex}>
      <div className="ticket-div">
          <div className="ticket">
            {/* {Swimindex} */}
            {ticket.id}
          </div>
      </div>
    </div>
  );
}
