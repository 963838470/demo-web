var app = require("express")()
var http = require("http").createServer(app)
var io = require("socket.io")(http)

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

function isValid() {
  return true
}

// middleware
io.use((socket, next) => {
  let token = socket.handshake.query.token
  if (isValid(token)) {
    return next()
  }
  return next(new Error("授权异常"))
})

const roomid = "some room"

// 监听socket连接
io.on("connection", function(socket) {
  // 加入房间
  socket.join(roomid)
  let name = socket.handshake.query.name
  console.log("a user connected:", socket.id, name)
  // 广播，除了消息发送者
  socket.to(roomid).broadcast.emit("chat message", "hi")
  // 监听socket断开连接
  socket.on("disconnect", function() {
    console.log("user disconnected", socket.id, name)
  })
  // 监听自定义事件
  socket.on("chat message", function(msg) {
    console.log("message: " + msg)
    // 将消息发送给所有人
    io.to(roomid).emit("chat message", msg)
  })
})

http.listen(3000, function() {
  console.log("listening on *:3000")
})
