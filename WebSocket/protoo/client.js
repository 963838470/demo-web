const protooClient = require("protoo-client")

var url = "ws://localhost:3000"

const transport = new protooClient.WebSocketTransport(url)
const peer = new protooClient.Peer(transport)

peer.on("open", () => {
  console.log(`服务器已连接：${url}`)

  peer.request("peer", { foo: "bar" })
  peer.notify("method", { foo: "bar" })
})

peer.on("disconnected", () => {
  console.log('protoo Peer "disconnected" event')
})

peer.on("request", (request, accept, reject) => {
  console.log("事件响应request:", request.method, request.data)
  switch (request.method) {
    case "peer":
      this.setState({
        peers: request.data.peers
      })
      break
    default:
      console.log("default")
  }
  accept({ foo: "bar" })
})

//let result = await peer.request("method", { foo: "bar" })

peer.on("notification", notification => {
  console.log("事件响应notification:", request, accept, reject)
  if (notification.method === "method") {
    console.log(notification)
  }
})
