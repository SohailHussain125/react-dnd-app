import React from "react";
import { DragSource, DropTarget } from "react-dnd";
import cn from "classnames";
import _ from "lodash";
import { useDrag, useDrop } from "react-dnd";

export function DraggableCard(mainProps) {
  //   console.log(mainProps, "===p");
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: "ItemTypes.CARD",
      id: mainProps.id,
    },
    isDragging(monitor){
console.log(monitor.getItem(),"===");
return mainProps.id === monitor.getItem().id
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
        return{isDragging:false}
    },
  });
  const [, drop] = useDrop({
    accept: "ItemTypes.CARD",
    // canDrop: () => false,
    hover(props, monitor) {
      const { columnId, columnIndex } = mainProps;
      const draggingItem = monitor.getItem();

      if (draggingItem.id !== mainProps.id) {
          console.log("===move")
        mainProps.moveCard(draggingItem.id, columnId, columnIndex);
      }
    },
  });
  console.log("isDragging", isDragging);
  return (
    <div
      ref={(node) => drag(drop(node))}
      className={cn("Card", {
        "Card--dragging": isDragging,
        "Card--spacer": mainProps.isSpacer,
      })}
    >
      <div className="Card__title">{mainProps.title}</div>
    </div>
  );
}

// export const DraggableCard = _.flowRight([
//   DropTarget(
//     "Card",
//     {
//       hover(props, monitor) {
//         const { columnId, columnIndex } = props;
//         const draggingItem = monitor.getItem();
//         if (draggingItem.id !== props.id) {
//           props.moveCard(draggingItem.id, columnId, columnIndex);
//         }
//       },
//     },
//     (connect) => ({
//       connectDropTarget: connect.dropTarget(),
//     })
//   ),
//   DragSource(
//     "Card",
//     {
//       beginDrag(props) {
//         return { id: props.id };
//       },

//       isDragging(props, monitor) {
//         return props.id === monitor.getItem().id;
//       },
//     },
//     (connect, monitor) => ({
//       connectDragSource: connect.dragSource(),
//       isDragging: monitor.isDragging(),
//     })
//   ),
// ])(Card);
