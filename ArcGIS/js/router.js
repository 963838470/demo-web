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

  // 线图层
  var lineLayer = new GraphicsLayer({ graphics: [], visible: true, title: "线" })
  map.layers.add(lineLayer, 1)

  // 多边形
  var polygonLayer = new GraphicsLayer({ graphics: [], visible: true, title: "多边形" })
  map.layers.add(polygonLayer, 2)

  // 其它元素图层
  var otherLayer = new GraphicsLayer({ graphics: [], visible: true, title: "其它" })
  map.layers.add(otherLayer, 3)
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
  otherLayer.graphics.add(polylineGraphic)

  function defineActions(event) {
    // The event object contains an item property.
    // is is a ListItem referencing the associated layer
    // and other properties. You can control the visibility of the
    // item, its title, and actions using this object.

    var item = event.item

    if (item.title === "点") {
      // An array of objects defining actions to place in the LayerList.
      // By making this array two-dimensional, you can separate similar
      // actions into separate groups with a breaking line.

      item.actionsSections = [
        [
          {
            title: "Go to full extent",
            className: "esri-icon-zoom-out-fixed",
            id: "full-extent"
          }
        ],
        [
          {
            title: "Increase opacity",
            className: "esri-icon-up",
            id: "increase-opacity"
          },
          {
            title: "Decrease opacity",
            className: "esri-icon-down",
            id: "decrease-opacity"
          }
        ]
      ]
    }
  }

  // 图层开关组件
  const layerList = new LayerList({
    view: view,
    container: document.getElementById("container"),
    listItemCreatedFunction: defineActions
  })
  view.ui.add(layerList, "top-right")

  layerList.on("trigger-action", function(event) {
    // Capture the action id.
    var id = event.action.id

    if (id === "full-extent") {
      // if the full-extent action is triggered then navigate
      // to the full extent of the visible layer
      view.goTo(polygonLayer.fullExtent)
    } else if (id === "increase-opacity") {
      // if the increase-opacity action is triggered, then
      // increase the opacity of the GroupLayer by 0.25

      if (pointLayer.opacity < 1) {
        pointLayer.opacity += 0.25
      }
    } else if (id === "decrease-opacity") {
      // if the decrease-opacity action is triggered, then
      // decrease the opacity of the GroupLayer by 0.25

      if (pointLayer.opacity > 0) {
        pointLayer.opacity -= 0.25
      }
    }
  })

  addPoint(113.267957, 23.139696)
  addLine([[113.267958, 23.139696, 0], [113.268, 23.139696, 0]])
  addPolygon([
    [113.267, 23.138, 0],
    [113.267, 23.139, 0],
    [113.268, 23.139, 0],
    [113.268, 23.138, 0],
    [113.267, 23.138, 0]
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
    pointLayer.graphics.add(pointGraphic)
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
    lineLayer.graphics.add(polylineGraphic)
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
    polygonLayer.graphics.add(polygonGraphic)
  }
})
