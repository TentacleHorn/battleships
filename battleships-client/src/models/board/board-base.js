'use strict';
import Cell from '../cell.js';

export default class boardBase{
    constructor(nodeId){
        this.id = nodeId;
        this.rowsNumber = 10;
        this.columnsNumber = 10;
        this.cells = [];
        this.element;
    }

    mapBoard(){
        this.element = document.querySelector(`#${this.id}`);
        for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
            this.cells.push([]);
            let rowCellsElements = this.element.querySelectorAll(`tr`)[rowIndex].querySelectorAll("td");
            for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
                this.cells[rowIndex][columnIndex] = new Cell(rowCellsElements[columnIndex]);
            }
        }
    }

    locateABattleship(startRowIndex, startColumnIndex, length, isHorizontal){
        if(isHorizontal){
            for(let columnIndex = startColumnIndex; columnIndex < startColumnIndex + length; columnIndex++){
                this.cells[startRowIndex][columnIndex].markAsContainBattleship();
            }
        }
        else{
            for(let rowIndex = startRowIndex; rowIndex < startRowIndex + length; rowIndex++){
                this.cells[rowIndex][startColumnIndex].markAsContainBattleship();
            }
        }
    }

    markCellAsExposed(rowIndex, columnIndex){
        this.cells[rowIndex][columnIndex].markAsExposed();
    }

    markCellAsContainBattleship(rowIndex, columnIndex){
        this.cells[rowIndex][columnIndex].markAsContainBattleship()
    }

    createHTMLRow(...classNames){
        let htmlRow = `<tr>`;
        for(let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++){
            htmlRow += `\n\t<td class="${classNames.join(" ")}"></td>`;
        }
        htmlRow += '\n</tr>';

        return htmlRow;
    }

    createHTMLTable(...cellClassNames){
        let htmlTable = `<table>`;
        for(let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++){
            htmlTable += `\n\t${this.createHTMLRow(cellClassNames)}`;
        }
        htmlTable += '\n</table>';

        return htmlTable;
    }
}