
////////////////
//universal initialization
///////////////////

readWindowSize();
maindiv.appendChild(canvas);
canvas.id = "theCanvas"; canvas.oncontextmenu = () => {return false;}
checkorien(); setStyles(); sizeCanvas();
window.addEventListener('resize', sizeCanvas, true);
window.requestAnimationFrame(mainLoop);
setTimeout(timeLoop, 0)
console.log('App Started')