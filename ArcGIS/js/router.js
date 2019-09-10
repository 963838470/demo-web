require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/geometry/Polyline",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/Graphic"
], function(Map, SceneView, Polyline, Graphic, GraphicsLayer, Graphic) {
  var map = new Map({
    basemap: "hybrid"
  })
  var view = new SceneView({
    container: "viewDiv", // Reference to the scene div created in step 5
    map: map, // Reference to the map object created before the scene
    scale: 1000, // Sets the initial scale to 1:50,000,000
    center: [113.267957, 23.139696] // Sets the center point of view with lon/lat
  })

  // 添加点
  const polylineGraphic = {
    geometry: {
      type: "point",
      longitude: 113.267657,
      latitude: 23.139496
    },
    symbol: {
      type: "picture-marker",
      url: "js/roadblock.png",
      width: "24px",
      height: "24px",
      outline: {
        style: "solid"
      }
    },
    attributes: {
      title: "岔道",
      name: "大岔口"
    },
    popupTemplate: {
      title: "{title}",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "name",
              label: "岔道名称"
            }
          ]
        }
      ]
    }
  }
  view.graphics.add(polylineGraphic)
  // debugger
  // view.graphics.remove(polylineGraphic) 无法删除

  var graphicsLayer = new GraphicsLayer()
  map.add(graphicsLayer)

  addPoint(113.267957, 23.139696)
  addLine([[-0.178, 51.48791, 0], [-0.178, 51.48791, 1000]])
  addPolygon([
    [-0.184, 51.48391, 400],
    [-0.184, 51.49091, 500],
    [-0.172, 51.49091, 500],
    [-0.172, 51.48391, 400],
    [-0.184, 51.48391, 400]
  ])
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
    graphicsLayer.add(pointGraphic)
  }

  /**
   * 绘制路径
   * @param {Array} paths 路径
   */
  function addLine(paths) {
    var polyline = {
      type: "polyline", // autocasts as new Polyline()
      paths: paths
    }
    lineSymbol = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [226, 119, 40],
      width: 4
    }
    var polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol
    })
    graphicsLayer.add(polylineGraphic)
  }

  /**
   * 绘制多边形
   * @param {Array} rings 包围的点
   */
  function addPolygon(rings) {
    var polygon = {
      type: "polygon", // autocasts as new Polygon()
      rings: rings
    }
    var fillSymbol = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: [227, 139, 79, 0.8],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 1
      }
    }
    var polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: fillSymbol
    })
    graphicsLayer.add(polygonGraphic)
  }
})
