var layers,
  map_width,
  map_height,
  tile_rect = {
    x: 0,
    y: 0
  },
  tile = [],
  images = []
var canvas,
  ctx,
  image
var camera = {
  x: 0,
  y: 0
}
var gamemode = "game"
window.addEventListener("DOMContentLoaded", init)

function init() {

  //キャンパス要素
  canvas = document.getElementById("maincanvas")
  ctx = canvas.getContext("2d")
  //タイル読み込み
  image = new Image();
  image.src = "images/map_images/map1.png"
  //マップの生成
  mapload(function(event) {
    load_map(event);
    stageSetup()
    requestAnimationFrame(updata)
  })

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
  tile_rect.x = mainmap.tilewidth
  tile_rect.y = mainmap.tileheight
}
function stageSetup() {
  //画像読み込み完了
  image.addEventListener("load", renderSteage())
}
function renderSteage() {

  const screen_width = 640
  const screen_height = 480

  const startTileX = Math.floor((camera.x - screen_width / 2) / tile_rect.x)
  const startTileY = Math.floor((camera.y - screen_height / 2) / tile_rect.y)

  //レイヤー
  for (var i = 0; i < layer.length; i++) {
    //縦幅
    for (var y = startTileY; y < map_height; y++) {
      //横幅
      for (var x = startTileX; x < map_width; x++) {

        var id = layer[i].data[x + y * map_width] - 1
        var image_x = (id % 16) * tile_rect.x
        var image_y = Math.floor(id / 16) * tile_rect.y
        //         タイル画像、トリミング　ｘ、ｙ、 タイル幅ｘ、ｙ、　　　　    描画開始位置　ｘ、　ｙ　　　　　　　　描画タイルｘ、ｙ、
        ctx.drawImage(image, image_x, image_y, tile_rect.x, tile_rect.y, x * tile_rect.x, y * tile_rect.y, tile_rect.x, tile_rect.y);
      }
    }
  }
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
      renderSteage();
      break;
  }

}
