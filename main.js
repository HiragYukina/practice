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
  image.addEventListener("load", function() {
    backcanvas = document.createElement("canvas")
    backcanvas.width = 512
    backcanvas.height = 512
    const backctx = backcanvas.getContext("2d")
    backctx.drawImage(image, 0, 0)
    image = backcanvas
  })

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

  const screenLeft = camera.x - screen_width / 2
  const screenTop = camera.y - screen_height / 2

  const startTileX = Math.floor(screenLeft / tile_rect.x)
  const startTileY = Math.floor(screenTop / tile_rect.y)

  //レイヤー
  if (camera.x >= 320 && camera.y >= 240 && camera.x <= 1536 - 320 && camera.y <= 1152 - 240) {

    for (var i = 0; i < layer.length; i++) {
      //縦幅
      for (var y = 0; y < (screen_height / 32) + 1; y++) {
        //横幅
        for (var x = 0; x < (screen_width / 32) + 1; x++) {

          const index = startTileX + x + (startTileY + y) * map_width
          if (index < 0 || index >= layer[i].data.length) {
            continue
          }
          var id = layer[i].data[index] - 1
          var sx = (id % 16) * tile_rect.x
          var sy = Math.floor(id / 16) * tile_rect.y
          const dx = x * tile_rect.x - screenLeft % tile_rect.x
          const dy = y * tile_rect.y - screenTop % tile_rect.y
          //         タイル画像、トリミング　ｘ、ｙ、 タイル幅ｘ、ｙ、描画開始位置　ｘ、　ｙ　　　　　　　　描画タイルｘ、ｙ、
          ctx.drawImage(image, sx, sy, tile_rect.x, tile_rect.y, dx, dy, tile_rect.x, tile_rect.y);
        }
      }
    }
  } else {
    flame()
  }
  //画面端の当たり判定
  function flame() {
    if (camera.x <= 320) {
      camera.x = 320;
    }
    if (camera.y <= 240) {
      camera.y = 240;
    }
    if (camera.x >= 1536 - 320) {
      camera.x = 1536 - 320;
    }
    if (camera.y >= 1152 - 240) {
      camera.y = 1152 - 240;
    }
    renderSteage()
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
      player();
      break;
  }

}
