// 初始化模拟数据
var points = []
// 预测路径微调数据
var calculatePoints = []
var initPoint = [113.267957, 23.139696, 0]
// 生成的轨迹长度
var maxCount = 30
for (let index = 0; index < maxCount; index++) {
  initPoint[0] += Math.random() * 0.0001 - 0 * Math.random() * 0.0001
  initPoint[1] += Math.random() * 0.0001 - 0 * Math.random() * 0.0001
  var newPoint = []
  Object.assign(newPoint, initPoint)
  points.push(newPoint)
  var newCalculatePoints = []
  Object.assign(newCalculatePoints, newPoint)
  if (index !== maxCount - 1) {
    newCalculatePoints[0] += Math.random() * 0.00001 * (index % 7)
    newCalculatePoints[1] += Math.random() * 0.00001 * (index % 7)
  }
  calculatePoints.push(newCalculatePoints)
}

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/geometry/Polyline",
  "esri/symbols/SimpleLineSymbol",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/widgets/LayerList"
], function(Map, MapView, Polyline, SimpleLineSymbol, Graphic, GraphicsLayer, Graphic, LayerList) {
  var map = new Map({
    basemap: "hybrid"
  })
  var view = new MapView({
    container: "viewDiv", // Reference to the scene div created in step 5
    map: map, // Reference to the map object created before the scene
    scale: 1000, // Sets the initial scale to 1:50,000,000
    center: [113.267957, 23.139696], // Sets the center point of view with lon/lat
    popup: {
      actionsMenuEnabled: false,
      crashEnabled: false,
      dockEnabled :false
    }
  })

  view.when(function() {
    // 点图层
    var pointLayer = new GraphicsLayer({ graphics: [], visible: true, title: "点" })
    map.layers.add(pointLayer, 2)

    // 开始线图层
    var startLayer = new GraphicsLayer({ graphics: [], visible: true, title: "线" })
    map.layers.add(startLayer, 0)

    // 结束线图层
    var endLayer = new GraphicsLayer({ graphics: [], visible: true, title: "线" })
    map.layers.add(endLayer, 1)

    for (let index = 0; index < points.length; index++) {
      ;(function(index) {
        setTimeout(() => {
          drawPoint(pointLayer, points[index][0], points[index][1])
          drawStartLine(startLayer, points.slice(0, index + 1))
          drawEndLine(endLayer, [points[index]].concat(calculatePoints.slice(index, calculatePoints.length)))
          //if (index === 0) {
            view.goTo(endLayer.graphics)
          //}
        }, 5000 * index)
      })(index)
    }
  })

  /**
   * 绘制点
   * @param {Object} layer 图层
   * @param {number} x x轴坐标
   * @param {number} y y轴坐标
   * @param {number} z z轴坐标，若不传则为0
   */
  function drawPoint(layer, x, y, z) {
    var point = {
      type: "point", // autocasts as new Point()
      x: x,
      y: y,
      z: z ? z : 0
    }
    var markerSymbol = {
      type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
      url: "./image/gis_ground.png",
      width: "25px",
      height: "25px"
    }
    var fontSymbol = {
      type: "text",
      color: "white",
      text: "地线1组",
      haloColor: "black",
      haloSize: "1px",
      yoffset: "20px",
      font: {
        size: 12,
        family: "sans-serif"
      }
    }
    var pointGraphic = {
      geometry: point,
      symbol: markerSymbol,
      attributes: {
        title: '小组成员',
        name: '张麻子',
        age: 18
      },
      popupTemplate: {
        title: '{title}',
        content: [
          {
            type: 'fields',
            fieldInfos: [
              {
                fieldName: 'name',
                label: '姓名'
              },
              {
                fieldName: 'age',
                label: '年龄'
              }]
          }
        ],
        actions: [{
          title: '查看详情',
          id: 'actionShowDetail',
          image: "./image/show-detail.png"
        }]
      }
    }
    var fontGraphic = {
      geometry: point,
      symbol: fontSymbol
    }
    layer.graphics.removeAll()
    layer.graphics.add(pointGraphic)
    layer.graphics.add(fontGraphic)
  }

  /**
   * 绘制开始路径,并清除前一条路径
   * @param {Object} layer 图层
   * @param {Array} paths 路径
   */
  function drawStartLine(layer, paths) {
    var polyline = {
      type: "polyline", // autocasts as new Polyline()
      paths: paths
    }
    var lineSymbol = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [255, 255, 255],
      width: 2,
      join: "round",
      marker: {
        style: "arrow",
        placement: "end"
      }
    }
    var polylineGraphic = {
      // autocasts as Graphic()
      geometry: polyline,
      symbol: lineSymbol
    }
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
    var polyline = {
      type: "polyline",
      paths: paths
    }
    var lineSymbol = {
      type: "simple-line",
      color: [66, 255, 66],
      width: 2,
      style: "short-dot",
      join: "bevel"
      // marker: {
      //   style: "arrow",
      //   placement: "end"
      // }
    }
    // lineSymbol.setMarker({
    //   style: "arrow",
    //   placement: "end"
    // })
    //lineSymbol.setColor(new Color([250, 150, 0, 1]));

    var polylineGraphic = {
      geometry: polyline,
      symbol: lineSymbol
    }
    layer.graphics.removeAll()
    if (paths.length > 1) {
      layer.graphics.add(polylineGraphic)
    }
  }
})
