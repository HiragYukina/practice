let keystate = {
  "a": false,
  "d": false,
  "x": false,
  "s": false
}
function player() {
  if (keystate["a"]) {
    camera.x--
  }
  if (keystate["w"]) {
    camera.y--
  }
  if (keystate["d"]) {
    camera.x++
  }
  if (keystate["s"]) {
    camera.y++
  }

  //キーイベント
  window.addEventListener("keydown", function(e) {
    keystate[e.key] = true;
  })
  window.addEventListener("keyup", function(e) {
    keystate[e.key] = false;
  })

}
