var layers,
  map_width,
  map_height,
  tile_rect = [],
  tile = [],
  images = []
var canvas,
  ctx,
  image
var gamemode = "game"
window.addEventListener("DOMContentLoaded", init)

function init() {
  canvas = document.getElementById("maincanvas")
  ctx = canvas.getContext("2d")
  image = new Image();
  image.src = "images/map_images/map1.png"

  mapload(function(event) {
    load_map(event);
    //requestAnimationFrame(updata)
    stageSetup()
  });
}
function mapload(onload) {
  //JSON読み込み
  var map = new XMLHttpRequest

  map.addEventListener("load", onload, false)
  map.open("GET", "images/map.json", true)
  map.send(null)
};
function load_map(event) {
  var loadmap = event.target
  var mainmap = JSON.parse(loadmap.responseText)

  //ステージ抽出
  layer = mainmap.layers
  //マップの横幅
  map_width = mainmap.width
  //マップ高さ
  map_height = mainmap.height
  //タイル
  tile_rect[0] = mainmap.tilewidth
  tile_rect[1] = mainmap.tileheight

}
function stageSetup() {
  image.addEventListener("load", function() {
    for (var i = 0; i < layer.length; i++) {
      for (var y = 0; y < map_height; y++) {
        for (var x = 0; x < map_width; x++) {
          var id = layer[i].data[x + y * map_width] - 1
          var image_x = (id % 16) * 32
          var image_y = Math.floor(id / 16) * 32
          ctx.drawImage(image, image_x, image_y, 32, 32, x * 32, y * 32, 32, 32);
        }
      }
    }
  })
}

function updata() {
  requestAnimationFrame(updata)
  render()
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  switch (gamemode) {
    case "title":

      break;
    case "game":
      stageSetup();
      break;
  }

}
