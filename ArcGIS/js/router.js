// 初始化模拟数据
var points = []
// 预测路径微调数据
var calculatePoints = []
var initPoint = [113.267957, 23.139696, 0]
for (let index = 0; index < 30; index++) {
  initPoint[0] += Math.random() * 0.0001 - 0 * Math.random() * 0.0001
  initPoint[1] += Math.random() * 0.0001 - 0 * Math.random() * 0.0001
  var newPoint = []
  Object.assign(newPoint, initPoint)
  points.push(newPoint)
  var newCalculatePoints = []
  Object.assign(newCalculatePoints, newPoint)
  newCalculatePoints[0] += Math.random() * 0.00001 * (index % 7)
  newCalculatePoints[1] += Math.random() * 0.00001 * (index % 7)
  calculatePoints.push(newCalculatePoints)
}
console.log(JSON.stringify(points))
console.log(JSON.stringify(calculatePoints))

require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/geometry/Polyline",
  "esri/symbols/SimpleLineSymbol",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/widgets/LayerList"
], function(Map, SceneView, Polyline, SimpleLineSymbol, Graphic, GraphicsLayer, Graphic, LayerList) {
  var map = new Map({
    basemap: "hybrid"
  })
  var view = new SceneView({
    container: "viewDiv", // Reference to the scene div created in step 5
    map: map, // Reference to the map object created before the scene
    scale: 1000, // Sets the initial scale to 1:50,000,000
    center: [113.267957, 23.139696] // Sets the center point of view with lon/lat
  })

  // 点图层
  var pointLayer = new GraphicsLayer({ graphics: [], visible: true, title: "点" })
  map.layers.add(pointLayer, 0)

  // 开始线图层
  var startLayer = new GraphicsLayer({ graphics: [], visible: true, title: "线" })
  map.layers.add(startLayer, 1)

  // 结束线图层
  var endLayer = new GraphicsLayer({ graphics: [], visible: true, title: "线" })
  map.layers.add(endLayer, 1)

  for (let index = 0; index < points.length; index++) {
    ;(function(index) {
      setTimeout(() => {
        drawPoint(pointLayer, points[index][0], points[index][1])
        drawStartLine(startLayer, points.slice(0, index + 1))
        drawEndLine(endLayer, [points[index]].concat(calculatePoints.slice(index, calculatePoints.length)))
        if (index === 0) {
          view.goTo(endLayer.graphics)
        }
      }, 1000 * index)
    })(index)
  }

  /**
   * 绘制点
   * @param {number} x x轴坐标
   * @param {number} y y轴坐标
   * @param {number} z z轴坐标，若不穿则为0
   */
  function drawPoint(layer, x, y, z) {
    var point = {
      type: "point", // autocasts as new Point()
      x: x,
      y: y,
      z: z ? z : 0
    }
    var markerSymbol = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 1
      }
    }
    var pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    })
    layer.graphics.removeAll()
    layer.graphics.add(pointGraphic)
  }

  /**
   * 绘制开始路径,并清除前一条路径
   * @param {Object} layer 图层
   * @param {Array} paths 路径
   */
  function drawStartLine(layer, paths) {
    var polyline = new Polyline({
      type: "polyline", // autocasts as new Polyline()
      paths: paths
    })
    var lineSymbol = new SimpleLineSymbol({
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [255, 255, 255],
      width: 2
    })
    var polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol
    })
    layer.graphics.removeAll()
    if (paths.length > 1) {
      layer.graphics.add(polylineGraphic)
    }
  }

  /**
   * 绘制预测路径,并清除前一条路径
   * @param {Object} layer 图层
   * @param {Array} paths 路径
   */
  function drawEndLine(layer, paths) {
    var polyline = new Polyline({
      type: "polyline", // autocasts as new Polyline()
      paths: paths
    })
    var lineSymbol = new SimpleLineSymbol({
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [66, 255, 66],
      width: 2,
      style: "short-dot"
    })
    // debugger
    // lineSymbol.setMarker({
    //   style: "arrow",
    //   placement: "end"
    // })
    //lineSymbol.setColor(new Color([250, 150, 0, 1]));

    var polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol
    })
    layer.graphics.removeAll()
    if (paths.length > 1) {
      layer.graphics.add(polylineGraphic)
    }
  }
})
