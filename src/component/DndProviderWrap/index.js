import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React from "react";
export default (Comp) => (props) => (
  <DndProvider backend={HTML5Backend}>
    <Comp {...props} />
  </DndProvider>
);