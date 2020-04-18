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
})

app.listen (PORT, ()=>{
    console.log("connected to sock on :3030")
})


