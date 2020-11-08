import React, { memo, useState } from "react";
import DndProviderWrap from "../DndProviderWrap/index";
import { Swimlane } from "./Swimlane.js";
import "./index.css";
import update from "immutability-helper";

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
      ticketList: [
        { id: "p1" },
        { id: "p2" },
        { id: "p3" },
        { id: "p4" },
        { id: "p5" },
        { id: "p6" },
      ],
    });
    let { boardArray, ticketList } = state;
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

    const findCard = (id) => {
      var ticket = ticketList.filter((c) => `${c.id}` === id)[0];
      return {
        ticket,
        index: ticketList.indexOf(ticket),
      };
    };

    const moveCard = (id, atIndex) => {
      console.log("move", id, atIndex);

      const { ticket, index } = findCard(id);
      console.log("ticket, index", ticket, index);
      let updatedTicket = update(ticketList, {
        $splice: [
          [index, 1],
          [atIndex, 0, ticket],
        ],
      });
      updateState({
        ...state,
        ticketList: updatedTicket,
      });
    };
    console.log(ticketList, "==");
    return (
      // <div className="flex-column">
      //   {boardArray.map((swim, i) => (
      <div className="swim-div">
        <Swimlane
          ticket={ticketList}
          index={0}
          replaceTicket={replaceTicket}
          findCard={findCard}
          moveCard={moveCard}
        />
      </div>
      //   ))}
      // </div>
    );
  })
);
