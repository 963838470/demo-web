var app = require("express")()
var http = require("http").createServer(app)
var io = require("socket.io")(http)

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

// middleware
io.use((socket, next) => {
  let token = socket.handshake.query.token
  if (isValid(token)) {
    return next()
  }
  return next(new Error("授权异常"))
})

// 监听socket连接
io.on("connection", function(socket) {
  let name = socket.handshake.query.name
  let roomname = socket.handshake.query.roomname
  // 加入房间
  socket.join(roomname, () => {
    console.log(name + "进入房间" + roomname, socket.id)
    // 广播，除了消息发送者都可以收到
    socket.to(roomname).broadcast.emit("send", { type: "tip", msg: name + "加入房间," })
    // 将消息发送给所有人
    io.to(roomname).emit("send", { type: "tip", msg: "当前用户数量:" + Object.keys(socket.nsp.sockets).length })
  })

  // 监听掉线设备事件
  socket.on("disconnect", function() {
    console.log(name + "退出房间" + roomname, socket.id)
    socket.to(roomname).broadcast.emit("send", { type: "tip", msg: name + "退出房间" + roomname })
  })
  // 监听自定义事件
  socket.on("send", function(msg) {
    console.log(name + "发送消息: " + msg)
    io.to(roomname).emit("send", { type: "msg", msg: name + "说:" + msg })
    console.log(socket)
  })
})

http.listen(3000, function() {
  console.log("listening on *:3000")
})

function isValid() {
  return true
}
