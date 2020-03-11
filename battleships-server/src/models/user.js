'use strict';
const Board = require('./board');

module.exports = class User{
    constructor(socket){
        this.socket = socket;
        this.board = new Board();
        this.battleshipsToLocate = [
            {
                length: 5,
                isLocated: false
            },
            {
                length: 4,
                isLocated: false
            },
            {
                length: 3,
                isLocated: false
            },
            {
                length: 3,
                isLocated: false
            },
            {
                length: 2,
                isLocated: false
            }
        ];
    }

    get isFinishedLocating(){
        return this.nextBattleship() === undefined;
    }

    nextBattleship(){
        for(let battleshipToLocate of this.battleshipsToLocate){
            if (!battleshipToLocate.isLocated){
                return battleshipToLocate;
            }
        }

        return undefined;
    }

    markLastBattleshipAsLocated(){
        this.nextBattleship().isLocated = true;
    }
};