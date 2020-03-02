const protooClient = require("protoo-client")

const transport = new protooClient.WebSocketTransport("ws://localhost:3000")
const peer = new protooClient.Peer(transport)

peer.on("request", (request, accept, reject) => {
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

peer.on("notification", async notification => {
  if (notification.method === "xxxxx") {
    console.log(notification)
  }
})
peer.notify("method", { foo: "bar" })
