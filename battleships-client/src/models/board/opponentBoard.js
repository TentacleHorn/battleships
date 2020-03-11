'use strict';
import BoardBase from './boardBase.js';
import Cell from '../cell.js';
import GameMovesEmitters from '../../events/gameMovesEvents/gameMovesEmitters.js';

export default class OpponentBoard extends BoardBase{
    constructor(nodeId, rowsNumber, columnsNumber){
        super(nodeId, rowsNumber, columnsNumber);
        this.isUserTurn = false;
    }

    addCellsClickListener(userSocket, messageBox){
        for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
                this.cells[rowIndex][columnIndex].element.addEventListener("click", () => {
                    if(!this.isUserTurn){
                        return;
                    }
                    if(!this.cells[rowIndex][columnIndex].isExposed){
                        GameMovesEmitters.userMove(userSocket, rowIndex, columnIndex);
                    }
                })
            }
        }
    }

    prepareForUserTurn(){
        this.isUserTurn = true;
    }

    prepareForOpponentTurn(messageBox, popFirstMessage = true){
        if(popFirstMessage){
            messageBox.popMessage();
        }
        messageBox.pushMessage("This is the opponent\'s turn.");
        this.isUserTurn = false;
    }

    render(){
        let userBoardElement = document.createElement("div");
        userBoardElement.id = "opponent-board";
        userBoardElement.innerText = "";

        userBoardElement.innerHTML = `Opponent Board
        <table>
                <tr>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                </tr>
                <tr>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                </tr>
                <tr>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                </tr>
                <tr>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                </tr>
                <tr>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                </tr>
                <tr>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                </tr>
                <tr>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                </tr>
                <tr>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                </tr>
                <tr>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                </tr>
                <tr>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                    <td class="not-exposed"></td>
                </tr>
            </table>`;

        let parentDiv = document.getElementById("game-boards");
        parentDiv.insertBefore(userBoardElement, parentDiv.childNodes[0] || null);

        this.mapBoard();
    }
}