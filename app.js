
const express = require("express")
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(session({ secret: 'expresspasskey' }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render('index')
})

var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    let count = 0;
    console.log(count)
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    // all the server socket code goes in here
    socket.on("button_count", function (data) {
        count = count + 1;
        socket.emit('server_response', { count });
    })
    socket.on("button_reset", function (data) {
        count = 0;
        socket.emit('server_response', { count });
    })

})
