var app = require('http').createServer()
var io = require('socket.io')(app)
const PORT = process.env.PORT || 3030


io.on('connection', socket=> {
    console.log("a user has connected")
    socket.on("upload", timestamp => {
        console.log("UPLOADED FILE, EMITTING....")
        io.emit("timestamp", {
            text: timestamp,
        })
    })
    socket.on("comment", timestamp => {
        console.log("UPLOADED COMMENT, EMITTING....")
        io.emit("timestamp", {
            text: timestamp,
        })
    })
    socket.on("like", timestamp => {
        console.log("LIKED POST, EMITTING....")
        io.emit("timestamp", {
            text: timestamp,
        })
    })
    socket.on("dmUser", timestamp => {
        console.log("NEW DB USER, EMITTING....")
        io.emit("timestamp", {
            text: timestamp,
        })
    })
    socket.on("convo", timestamp => {
        console.log("NEW DM CONVO, EMITTING....")
        io.emit("timestamp", {
            text: timestamp,
        })
    })
    socket.on("message", timestamp => {
        console.log("MESSAGE SENT, EMITTING....")
        io.emit("timestamp", {
            text: timestamp,
        })
    })
})

app.listen (PORT, ()=>{
    console.log("connected to sock on :3030")
})


