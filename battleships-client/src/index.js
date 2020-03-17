'use strict';
import CONFIG from './config.js';
import MessageBox from './models/messageBox.js';
import UserBoard from './models/board/userBoard.js';
import OpponentBoard from './models/board/opponentBoard.js';
import initializeBoardListeners from './events/initializeBoardEvents/initializeBoardListeners.js';
import gameMovesListeners from './events/gameMovesEvents/gameMovesListeners.js';
import disconnectionListeners from './events/disconnectionEvents/disconnectionListeners.js';


const userBoardId = "user-board";
const opponentBoardId = "opponent-board";
const startButton = document.getElementById("start-button");

const messageBox = new MessageBox();
const userBoard = new UserBoard(userBoardId);
const opponentBoard = new OpponentBoard(opponentBoardId);

function addGameListeners(socket, buttonToRemove){
    initializeBoardListeners(socket, messageBox, userBoard, opponentBoard, buttonToRemove);
    gameMovesListeners(socket, messageBox, userBoard, opponentBoard, beforeunloadFunc);
    disconnectionListeners(socket, beforeunloadFunc);
}

function beforeunloadFunc(event){
    event.returnValue = ''; // When changing this value to value other then null or undefined, it prompt the message (in old browsers it prompt tje string set to the property)
}

messageBox.pushMessage("Please click on \"Find me an opponent\" button to start");

let isStartButtonClicked = false;
startButton.onclick = () => {
    if(isStartButtonClicked){
        return;
    }
    window.addEventListener("beforeunload", beforeunloadFunc);
    isStartButtonClicked = true;
    startButton.disabled = true;
    messageBox.popMessage();
    messageBox.pushMessage("Looking for an opponent. Please wait.");
    const socket = io.connect(`${CONFIG.serverHost}:${CONFIG.serverPort}`);
    addGameListeners(socket, startButton);
};




