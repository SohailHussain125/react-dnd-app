import React, { memo } from "react";
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";
import DndProviderWrap from "./../DndProviderWrap/index";
export const Simpledrag = DndProviderWrap(
  memo(function Simpledrag() {
    return (
      <div>
        <div style={{ overflow: "hidden", clear: "both" }}>
          <Dustbin />
        </div>
        <div style={{ overflow: "hidden", clear: "both" }}>
          <Box name="Glass" />
          <Box name="Banana" />
          <Box name="Paper" />
        </div>
      </div>
    );
  })
);
