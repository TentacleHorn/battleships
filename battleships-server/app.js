'use strict';
const cors = require("cors");
const http = require("http");
const IoServer = require("socket.io");
const initializeBoardsListeners = require("./src/events/initializeBoardsEvents/initializeBoardsListeners");
const gameMovesListeners = require("./src/events/gameMovesEvents/gameMovesListeners");
const disconnectionListeners = require("./src/events/disconnectionEvents/disconnectionListeners");
const sessions = require("./src/states/sessions.js").sessionsManager;

const port = process.env.PORT || 3000;
const app = http.createServer();

const io = new IoServer(app);

//new EventListener(io);  // Bind event listeners to the server object


io.on("connection", (socket) => {
    let session;// = undefined;
    let user;// = undefined;
    let isNewUser;
    if(!sessions.isSocketAlreadySubscribe(socket)){
        isNewUser = true;
        let {session: usedSession, user: newUser} = sessions.subscribeUserSocketForAvailableSession(socket);
        session = usedSession;
        user = newUser;
    }
    else{
        isNewUser = false;
        user = sessions.getUserBySocket(socket);
        session = sessions.getSessionBySocket(socket);
    }

    initializeBoardsListeners(socket, session, user, isNewUser);
    gameMovesListeners(sessions.sessions, socket, session, user);
    disconnectionListeners(sessions.sessions, socket, session, user);

});


//startLogic(io);  // Call game logic

app.listen(port);  // Start running server
