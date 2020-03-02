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
  // if (success) {
  //   accept("")
  // } else {
  //   reject("")
  // }
})

// index.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})
app.use(express.static("node_modules"))
http.listen(3000, function() {
  console.log("listening on *:3000")
})
