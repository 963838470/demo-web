// 菜单
$(document).ready(function() {
  $.ajaxSetup({ cache: false })
  //$(window).resize(function () {
  //    if ($(window).width() >= 765) {
  //        $(".sidebar #nav").slideDown(350);
  //    }
  //    else {
  //        $(".sidebar #nav").slideUp(350);
  //    }
  //});

  //$("#nav > li > a").on('click', function (e) {
  //    if ($(this).parent().hasClass("has_sub")) {
  //        e.preventDefault();
  //    }

  //    if (!$(this).hasClass("subdrop")) {
  //        $("#nav li ul").slideUp(350);
  //        $("#nav li a").removeClass("subdrop");

  //        $(this).next("ul").slideDown(350);
  //        $(this).addClass("subdrop");
  //    }
  //    else if ($(this).hasClass("subdrop")) {
  //        $(this).removeClass("subdrop");
  //        $(this).next("ul").slideUp(350);
  //    }
  //});

  addUser()
})

// 地图
require([
  "esri/Map",
  "esri/config",
  "esri/request",
  "esri/Color",
  "esri/Graphic",
  "esri/WebScene",
  "esri/geometry/Point",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/layers/MapImageLayer",
  "esri/widgets/LayerList",
  "esri/widgets/ScaleBar",
  "esri/widgets/BasemapToggle",
  "esri/layers/BaseTileLayer",
  "esri/layers/KMLLayer",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/support/LabelClass",
  "esri/layers/SceneLayer",
  "esri/symbols/PictureMarkerSymbol",
  "esri/tasks/Locator",
  "dojo/domReady!",
  "dojo/on"
], function(
  Map,
  esriConfig,
  esriRequest,
  Color,
  Graphic,
  WebScene,
  Point,
  MapView,
  SceneView,
  MapImageLayer,
  LayerList,
  ScaleBar,
  BasemapToggle,
  BaseTileLayer,
  KMLLayer,
  GraphicsLayer,
  FeatureLayer,
  LabelClass,
  SceneLayer,
  PictureMarkerSymbol,
  Locator,
  on
) {
  var map, view
  var TintLayer = BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null,
      tint: {
        value: null,
        type: Color
      }
    },
    getTileUrl: function(level, row, col) {
      return this.urlTemplate
        .replace("{z}", level)
        .replace("{x}", col)
        .replace("{y}", row)
    },
    fetchTile: function(level, row, col) {
      var url = this.getTileUrl(level, row, col)

      return esriRequest(url, {
        responseType: "image",
        allowImageDataAccess: true
      }).then(
        function(response) {
          var image = response.data
          var width = this.tileInfo.size[0]
          var height = this.tileInfo.size[0]
          var canvas = document.createElement("canvas")
          var context = canvas.getContext("2d")
          canvas.width = width
          canvas.height = height
          context.drawImage(image, 0, 0, width, height)
          return canvas
        }.bind(this)
      )
    }
  })
  mapInit()

  // 点击 现场作业人员
  $(".user > ul a").click(function() {
    if (
      $(this)
        .html()
        .indexOf("在线") <= -1
    ) {
      return
    }
    showUser()
    if (view.type == "2d") {
      mapInit()
    }
    var $this = $(this)
    var data = {
      value: {
        flash: true,
        cam: true,
        rifd: true,
        gps: true,
        mobile: true,
        wifi: true,
        laser: true,
        battery: 98,
        mobileData: 55
      }
    }
    if (data.value) {
      var txt =
        '<h3 class="fl">实时视频：</h3><img class="video-img" src="./image/video.png" onclick="showView(' +
        $this.attr("data-id") +
        ",'" +
        $this.attr("data-name") +
        "')\"/>"
      txt += '<table style="margin-top:5px;overflow: hidden;">'
      txt += "<tbody>"
      txt += "<tr>"
      txt += '<td class="td dashboard-td">'
      if (data.value.flash) {
        txt += '<div id="flash" title="灯光" class="label-circle  label-enable">'
      } else {
        txt += '<div id="flash" title="灯光" class="label-circle  label-disable">'
      }
      txt += '<span class="glyphicon glyphicon-flash"></span>'
      txt += "</div>"
      txt += "</td>"
      txt += '<td class="td dashboard-td">'
      if (data.value.cam) {
        txt += '<div id="camera" title="摄像" class="label-circle  label-enable">'
      } else {
        txt += '<div id="camera" title="摄像" class="label-circle  label-disable">'
      }
      txt += '<span class="glyphicon glyphicon-camera"></span>'
      txt += "</div>"
      txt += "</td>"
      txt += '<td class="td dashboard-td">'
      if (data.value.rifd) {
        txt += '<div id="rfid" title="RFID" class="label-circle  label-enable">'
      } else {
        txt += '<div id="rfid" title="RFID" class="label-circle  label-disable">'
      }
      txt += '<span class="glyphicon glyphicon-flag"></span>'
      txt += "</div>"
      txt += "</td>"
      txt += '<td class="td dashboard-td">'
      if (data.value.gps) {
        txt += '<div id="gps" title="GPS" class="label-circle  label-enable">'
      } else {
        txt += '<div id="gps" title="GPS" class="label-circle  label-disable">'
      }
      txt += '<span class="glyphicon  glyphicon-map-marker"></span>'
      txt += "</div>"
      txt += "</td>"
      txt += '<td class="td dashboard-td">'
      if (data.value.mobile) {
        txt += '<div id="mobile" title="4G" class="label-circle  label-enable">'
      } else {
        txt += '<div id="mobile" title="4G" class="label-circle  label-disable">'
      }
      txt += '<div id="mobile" title="4G" class="label-circle  label-enable">'
      txt += '<span class="glyphicon glyphicon-signal"></span>'
      txt += "</div>"
      txt += "</td>"
      txt += '<td class="td dashboard-td">'
      if (data.value.wifi) {
        txt += '<div id="wifi" title="WIFI" class="label-circle  label-enable">'
      } else {
        txt += '<div id="wifi" title="WIFI" class="label-circle  label-disable">'
      }
      txt += '<span class="glyphicon glyphicon-asterisk"></span>'
      txt += "</div>"
      txt += "</td>"
      txt += '<td class="td dashboard-td">'
      if (data.value.laser) {
        txt += '<div id="laser" title="激光" class="label-circle  label-enable">'
      } else {
        txt += '<div id="laser" title="激光" class="label-circle  label-disable">'
      }
      txt += '<span class="glyphicon glyphicon-bullhorn"></span>'
      txt += "</div>"
      txt += "</td>"
      txt += '<td class="td dashboard-td">'
      txt += '<div id="powerStatContainer" title="电量" class="label-circle label-enable">'
      txt += '<span style="font-size:10px;vertical-align:middle;">' + parseFloat(data.value.battery) + "%</span></div>"
      txt += "</td>"
      txt += '<td class="td dashboard-td">'
      txt += '<div id="powerStatContainer" title="流量" class="label-circle label-enable">'
      txt +=
        '<span style="font-size:10px;vertical-align:middle;">' + parseFloat(data.value.mobileData) + "%</span></div>"
      txt += "</td>"
      txt += "</tr>"
      txt += "<tr>"
      txt += '<td class="td dashboard-td infoWindow-icon">灯光</td>'
      txt += '<td class="td dashboard-td infoWindow-icon">摄像</td>'
      txt += '<td class="td dashboard-td infoWindow-icon">RFID</td>'
      txt += '<td class="td dashboard-td infoWindow-icon">GPS</td>'
      txt += '<td class="td dashboard-td infoWindow-icon">4G</td>'
      txt += '<td class="td dashboard-td infoWindow-icon">WIFI</td>'
      txt += '<td class="td dashboard-td infoWindow-icon">激光</td>'
      txt += '<td class="td dashboard-td infoWindow-icon">电量</td>'
      txt += '<td class="td dashboard-td infoWindow-icon">流量</td></tr>'
      txt += "</tbody>"
      txt += "</table>"
      //if (view.type == "3d") {
      //    view.center = [$this.attr("data-x"), $this.attr("data-y")];
      //} else {
      //    view.goTo({
      //        heading: 80, // face due east
      //        tilt: 45, // looking from a bird's eye view
      //        position: {
      //            latitude: $this.attr("data-y"),
      //            longitude: $this.attr("data-x"),
      //            z: 500,
      //            spatialReference: { wkid: 4326 }
      //        }
      //    });
      //}
      view.goTo({
        position: {
          x: $this.attr("data-x"),
          y: $this.attr("data-y") - 0.5,
          z: 5184,
          spatialReference: { wkid: 4326 }
        },
        heading: 0,
        tilt: 80
      })
      //view.zoom = 16;
      view.popup.open({
        title: "作业人员：" + $this.attr("data-name"),
        location: { latitude: $this.attr("data-y"), longitude: $this.attr("data-x") },
        content: txt,
        dockEnabled: true,
        position: "top-left",
        dockOptions: {
          dockEnabled: true
        }
      })
    }
  })
  // 点击 水利工程
  $("#showKML").click(function() {
    var layer = new KMLLayer({
      url: "http://quickmap.dot.ca.gov/data/lcs.kml"
    })
    var map = new Map({
      basemap: "osm",
      layers: [layer]
    })

    view = new MapView({
      container: "viewDiv",
      map: map
    })
    layer.then(function() {
      layer.watch("fullExtent", function(fullExtent) {
        view.extent = fullExtent
      })
    })
  })
  // 点击 三维模型
  $("#portal1").click(function() {
    view.goTo({
      heading: 80, // face due east
      tilt: 45, // looking from a bird's eye view
      position: {
        latitude: 60.156,
        longitude: 24.942,
        z: 500,
        spatialReference: { wkid: 4326 }
      }
    })

    var layer = new SceneLayer({
      portalItem: {
        id: "5ecba5273b2d41ff9f6f1eb33f238d18"
      }
    })
    layer.renderer = {
      type: "unique-value", // autocasts as new UniqueValueRenderer()
      field: "usage",
      defaultSymbol: {
        type: "mesh-3d", // autocasts as new MeshSymbol3D()
        symbolLayers: [
          {
            type: "fill", // autocasts as new FillSymbol3DLayer()
            material: {
              color: [230, 230, 230, 0.7],
              // We are not interested in these buildings, but we keep them for context
              // We want to remove the texture so we set the colorMixMode to replace
              colorMixMode: "replace"
            }
          }
        ]
      },
      uniqueValueInfos: [
        {
          value: "general or commercial",
          label: "commercial buildings",
          symbol: {
            type: "mesh-3d", // autocasts as new MeshSymbol3D()
            symbolLayers: [
              {
                type: "fill", // autocasts as new FillSymbol3DLayer()
                material: {
                  color: null,
                  colorMixMode: null
                }
              }
            ]
          }
        }
      ],
      legendOptions: {
        title: "Usage"
      }
    }
    view.map.add(layer)
  })
  // 前进路线
  $("#route").click(function() {
    var scene = new WebScene({
      portalItem: {
        // autocasts as new PortalItem()
        id: "3a9976baef9240ab8645ee25c7e9c096"
      }
    })
    view.map = scene
  })
  // 切换地图
  $(".toggle-map button").click(function() {
    mapInit($(this).attr("data-type"))
  })
  // 地图初始化
  function mapInit(type) {
    esriConfig.request.corsEnabledServers.push("http://mt2.google.cn/")
    if (!type) {
      type = "y"
    }
    var stamenTileLayer = new TintLayer({
      urlTemplate: "http://mt2.google.cn/maps/vt/lyrs=" + type + "@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}"
    })
    var map = new Map({
      layers: [stamenTileLayer],
      ground: "world-elevation"
    })

    view = new SceneView({
      container: "viewDiv",
      map: map
      //scale: 50000000,
      //camera: {
      //    position: [111.611, 26.2, 5184],
      //    tilt: 80
      //}
    })

    showUser()

    // 比例尺
    var scalebar = new ScaleBar({ view: view })
    view.ui.add(scalebar, "bottom-left")

    // 定位至指定坐标
    view.then(function() {
      view.goTo({
        position: {
          x: 111.611,
          y: 26.2,
          z: 5184,
          spatialReference: { wkid: 4326 }
        },
        heading: 0,
        tilt: 80
      })

      var point = {
        type: "point",
        longitude: 111.611,
        latitude: 26.2
      }

      var simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40], // orange
        outline: {
          color: [255, 255, 255], // white
          width: 1
        }
      }

      var pointGraphic = new Graphic({
        type: "my-simple-marke",
        geometry: point,
        symbol: simpleMarkerSymbol
      })

      view.graphics.add(pointGraphic)

      // Get the screen point from the view's click event
      view.on("click", function(event) {
        var screenPoint = {
          x: event.x,
          y: event.y
        }
        // Search for graphics at the clicked location
        view.hitTest(screenPoint).then(function(response) {
          var result = response.results[0]

          if (result) {
            var lon = result.mapPoint.longitude
            var lat = result.mapPoint.latitude

            console.log("Hit surface at (" + lon + ", " + lat + "), graphic:", result.graphic || "none")
          }
        })
      })
    })

    // 点击弹出坐标
    //view.on("click", function (event) {
    //    event.stopPropagation();
    //    var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
    //    var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
    //    view.popup.open({
    //        title: "Reverse geocode: [" + lon + ", " + lat + "]",
    //        location: event.mapPoint
    //    });
    //});
  }
  // 将所有人显示在地图上
  function showUser() {
    var pointStyle = {
      type: "picture-marker",
      url: "./image/user.png",
      width: "100px"
    }
    var pointArray = []
    $(".user ul li a").each(function() {
      if (
        $(this)
          .html()
          .indexOf("在线") > -1
      ) {
        var graphic = new Graphic({
          geometry: {
            type: "point",
            longitude: $(this).attr("data-x"),
            latitude: $(this).attr("data-y")
          },
          symbol: pointStyle
        })

        pointArray.push(graphic)

        pointArray.push(
          new Graphic({
            geometry: {
              type: "point",
              longitude: $(this).attr("data-x") + 1,
              latitude: $(this).attr("data-y") + 1
            },
            symbol: {
              type: "text",
              color: "white",
              haloColor: "black",
              haloSize: "1px",
              text: $(this).attr("data-name"),
              font: {
                size: 12,
                family: "sans-serif",
                weight: "bolder"
              }
            }
          })
        )
      }
    })
    view.graphics.addMany(pointArray)
  }
})

// 动态获取在线作业人员
function addUser() {
  var data = [{ userId: 1, name: "王天睿" }, { userId: 2, name: "张天佑" }, { userId: 3, name: "李兴国" }]

  for (var i in data) {
    $(".user ul").append(
      '<li><a class="online" href="javascript:void(0);" data-name="' +
        data[i].name +
        '" data-id="' +
        data[i].userId +
        '" data-x="' +
        (111.61 + Math.random() * 0.01) +
        '" data-y="' +
        (26.421 + Math.random() * 0.01) +
        '">' +
        data[i].name +
        "(在线)</a></li>"
    )
  }
}

// 打开实时视频
function showView(id, name) {
  $(".monitor-player").attr("src", "http://119.29.223.108:3001/monitor/" + id)
  $(".monitor-title").html(name + "实时视频")
  $(".div-monitor").show()
}

// 关闭实时视频
$(".monitor-close").click(function() {
  $(".div-monitor").hide()
  $(".monitor-player").attr("src", "")
})
