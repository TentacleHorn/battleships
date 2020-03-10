const LocatingEmitters = require("./initializeBoardsEmitters");
const GameMovesEmitters = require("../gameMovesEvents/gameMovesEmitters.js");
const LocatingStatus = require("../../consts/locatingStatus");

module.exports = class InitializeBoardsHandlers{
    static locateABattleshipHandler(session, user, event){
        let startRowIndex = event.startRowIndex;
        let startColumnIndex = event.startColumnIndex;
        let length = event.length;
        let isHorizontal = event.isHorizontal;
        if(user.board.areCellsAvailableForLocating(startRowIndex, startColumnIndex, length, isHorizontal)){
            user.board.markCellsAsContainBattleship(startRowIndex, startColumnIndex, length, isHorizontal);
            user.markLastBattleshipAsLocated();
            LocatingEmitters.locateABattleshipStatus(user.socket, startRowIndex, startColumnIndex, length, isHorizontal, LocatingStatus.SUCCEED);
            if(!user.isFinishedLocating){
                LocatingEmitters.askForABattleship(user.socket, user.nextBattleship().length);
            }
            else{
                LocatingEmitters.allBattleshipsAreLocated(user.socket);
                let opponent = session.getOpponent(user);
                LocatingEmitters.opponentIsReadyToPlay(opponent.socket);
                if(user.isFinishedLocating && opponent.isFinishedLocating){
                    GameMovesEmitters.startGame(user.socket, true);
                    GameMovesEmitters.startGame(opponent.socket, false);
                }
            }
        }
        else{
            LocatingEmitters.locateABattleshipStatus(user.socket, startRowIndex, startColumnIndex, length, isHorizontal, LocatingStatus.FAILED);
        }
    }
};