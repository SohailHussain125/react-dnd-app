import React, { memo, useState } from "react";
import DndProviderWrap from "../DndProviderWrap/index";
import { Swimlane } from "./Swimlane.js";
import "./index.css";
export const Board = DndProviderWrap(
  memo(function Board() {
    let [state, updateState] = useState({
      boardArray: [
        {
          swimlane: 1,
          ticket: [
            { id: "p1" },
            { id: "p2" },
            { id: "p3" },
            { id: "p4" },
            { id: "p5" },
            { id: "p6" },
          ],
        },
        {
          swimlane: 2,
          ticket: [
            { id: "S1" },
            { id: "S2" },
            { id: "S3" },
            { id: "S4" },
            { id: "S5" },
            { id: "S6" },
          ],
        },
        {
          swimlane: 3,
          ticket: [
            { id: "T1" },
            { id: "T2" },
            { id: "T3" },
            { id: "T4" },
            { id: "T5" },
            { id: "T6" },
          ],
        },
      ],
    });
    let { boardArray } = state;
    const replaceTicket = (ticket, swimIndex) => {
      let board = boardArray[ticket.Swimindex].ticket.splice(
        ticket.ticketIndex,
        1
      );
      boardArray[swimIndex.isDrop].ticket.push(board[0]);
      updateState({
        ...state,
        boardArray,
      });
    };
    return (
      <div className="flex-column">
        {boardArray.map((swim, i) => (
          <div className="swim-div" key={i}>
            <Swimlane
              ticket={swim.ticket}
              index={i}
              replaceTicket={replaceTicket}
            />
          </div>
        ))}
      </div>
    );
  })
);
