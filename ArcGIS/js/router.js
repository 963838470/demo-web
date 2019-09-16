var points = []
var initPoint = [113.267957, 23.139696, 0]
for (let index = 0; index < 10; index++) {
  initPoint[0] += Math.random() * 0.0001 - 0 * Math.random() * 0.0001
  initPoint[1] += Math.random() * 0.0001 - 0 * Math.random() * 0.0001
  var newPoint = []
  Object.assign(newPoint, initPoint)
  points.push(newPoint)
}

require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/geometry/Polyline",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/widgets/LayerList"
], function(Map, SceneView, Polyline, Graphic, GraphicsLayer, Graphic, LayerList) {
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
        console.log(index)
        pointLayer.graphics.removeAll()
        addPoint(points[index][0], points[index][1])
        startLayer.graphics.removeAll()
        addStartLine(points.slice(0, index + 1))
        endLayer.graphics.removeAll()
        addEndLine(points.slice(index, points.length))
        //view.goTo(endLayer.fullExtent)
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
  function addPoint(x, y, z) {
    var point = {
      type: "point", // autocasts as new Point()
      x: x,
      y: y,
      z: z ? z : 0
    }
    markerSymbol = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 2
      }
    }
    var pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    })
    pointLayer.graphics.add(pointGraphic)
  }

  /**
   * 绘制路径
   * @param {Array} paths 路径
   */
  function addStartLine(paths) {
    var polyline = {
      type: "polyline", // autocasts as new Polyline()
      paths: paths
    }
    lineSymbol = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [255, 255, 255],
      width: 4
    }
    var polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol
    })
    startLayer.graphics.add(polylineGraphic)
  }

  /**
   * 绘制路径
   * @param {Array} paths 路径
   */
  function addEndLine(paths) {
    var polyline = {
      type: "polyline", // autocasts as new Polyline()
      paths: paths
    }
    lineSymbol = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [66, 255, 66],
      width: 4
    }
    var polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol
    })
    endLayer.graphics.add(polylineGraphic)
  }
})
