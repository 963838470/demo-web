var express = require("express")
var app = require("express")()
var http = require("http").createServer(app)
const protooServer = require("protoo-server")

const options = {
  maxReceivedFrameSize: 960000, // 960 KBytes.
  maxReceivedMessageSize: 960000,
  fragmentOutgoingMessages: true,
  fragmentationThreshold: 960000
}
protooWebSocketServer = new protooServer.WebSocketServer(http, options)
protooWebSocketServer.on("connectionrequest", async (info, accept, reject) => {
  //const parseUrl = url.parse(info.request.url, true)
  console.log(`info.request.url=${info.request.url}`)

  var roomId = "123"
  var userId = "user" + Math.random()
  var rooms = new Map()

  //如果没有房间
  var room = new protooServer.Room()
  rooms.set(roomId, room)

  //房间里面创建人
  const transport = accept()
  user = room.createPeer(userId, transport)

  user.on("request", (request, accept, reject) => {
    console.log("服务端事件响应request:", request.method, request.data)
    user.request("request", { foo: "bar" })
    user.notify("notify", { foo: "bar" })
    accept({ foo: "bar" })
  })
  user.on("notification", notification => {
    console.log("服务端事件响应notification:", request, accept, reject)
    if (notification.method === "method") {
      console.log(notification)
    }
  })

  if (info) {
    accept("登录成功")
  } else {
    reject("登陆失败")
  }
})

// index.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})
app.use(express.static("node_modules"))
http.listen(3000, function() {
  console.log("listening on *:3000")
})
