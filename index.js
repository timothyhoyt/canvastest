



//Main Animation Loop
const mainLoop = function(timeStamp){
    
    //clearframe
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw
    fillRectRel(25,25,25,25,"rgba(100,150,200,0.5)")

    //next frame
    window.requestAnimationFrame(mainLoop)
}


//////////////////
//functions
///////////////////

const readWindowSize = function(){
    wWidth = window.innerWidth
    wHeight = window.innerHeight
    wAR = wWidth/wHeight
}

const setStyles = function(){
    if(orientation == "horizontal"){
        canvas.style.width = "98vh";
        canvas.style.height = "98vh";
        canvas.style.marginLeft = "1vh";
        canvas.style.marginTop = "1vh";
        menudiv.style.width = "10vw";
        menudiv.style.height = "10vw";
        
    }else{
        canvas.style.height = "98vw";
        canvas.style.width = "98vw";
        canvas.style.marginLeft = "1vw";
        canvas.style.marginTop = "calc(100vh - 99vw)";
    }

   
}

const checkOrientation = function(){
    const prevOrientation = orientation
    if(wWidth >= wHeight) {orientation = "horizontal"}
    else {orientation = "vertical"}
    if (prevOrientation != orientation){
        console.log("orientation changed to:",orientation)
        setStyles()
    }
}

const sizeCanvas = function(){
    readWindowSize()
    checkOrientation()    
    brect = canvas.getBoundingClientRect();
    dvp = window.devicePixelRatio || 1
    canvas.width = (brect.right - brect.left) * dvp
    canvas.height = (brect.bottom - brect.top) * dvp   
    cAR = canvas.width/canvas.height
}


const fillRectRel = function(x,y,w,h,c){
    ctx.fillStyle = c;
    ctx.fillRect(x/100*canvas.width,y/100*canvas.height,w/100*canvas.width,h/100*canvas.height);
}

////////////////
//globals
////////////////

const maindiv = document.getElementsByTagName('main')[0]
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");
const menudiv = document.createElement('div')
var brect, dvp, cAR, wAR, wWidth, wHeight
var orientation = "horizontal"


////////////////
//initialization
///////////////////

readWindowSize()
maindiv.appendChild(canvas)
maindiv.appendChild(menudiv)
canvas.id = "theCanvas";
// canvas.style.position = "absolute"
menudiv.id = "theMenu";

checkOrientation()
setStyles()
sizeCanvas()
window.addEventListener('resize', sizeCanvas, true);
window.requestAnimationFrame(mainLoop);
