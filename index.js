



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
    const menuMin = 0.3;
    var marg = (wHeight*0.01);

    //default
    var canH = (wHeight-marg*2);
    var canW = canH;
    var canT = marg;
    var canL = marg;
    var menW = (wWidth - canW - marg*3);
    var menH = wHeight - marg*2;
    var menL = canW + marg*2

    if(orien == "horizontal"){
        if(wWidth > (wHeight + marg + menuMin*wWidth)){
            //normal (default)
        }else{
            //squeeze
            menW = wWidth*menuMin;
            canW = wWidth - menW - marg*3;
            canH = canW;
            menL = canW + marg*2
        }
    }else{
        //vertical
        if(wHeight > (wWidth + marg + menuMin*wHeight)){
            //normal
            canW = (wWidth-marg*2);
            canH = canW;
            menH = (wHeight - canH - marg*3);
            menW = wWidth - marg*2;
            menL = marg;
            canT = menH + marg*2;
        }else{
            //squeeze
            menH = wHeight*menuMin;
            menW = wWidth - marg*2
            menL = marg;
            canH = wHeight - menH - marg*3;
            canW = canH;
            canT = menH + marg*2;
            canL = wWidth/2 - canW/2;
        }

    }

    canvas.style.width = canW.toString()+"px";
    canvas.style.height = canH.toString()+"px";
    canvas.style.marginLeft = canL.toString()+"px";
    canvas.style.marginTop = canT.toString()+"px";
    canvas.style.marginRight = marg.toString()+"px";

    menudiv.style.left = menL.toString()+"px";
    menudiv.style.width = menW.toString()+"px";
    menudiv.style.height = menH.toString()+"px";
    menudiv.style.marginTop = marg.toString()+"px";
    
}

const checkorien = function(){
    const prevorien = orien
    if(wWidth >= wHeight) {orien = "horizontal"}
    else {orien = "vertical"}
    setStyles()
}

const sizeCanvas = function(){
    readWindowSize()
    checkorien()    
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
var orien = "horizontal"


////////////////
//initialization
///////////////////

readWindowSize()
maindiv.appendChild(canvas)
maindiv.appendChild(menudiv)
canvas.id = "theCanvas";
// canvas.style.position = "absolute"
menudiv.id = "theMenu";
menudiv.style.position = "absolute";
checkorien()
setStyles()
sizeCanvas()
window.addEventListener('resize', sizeCanvas, true);
window.requestAnimationFrame(mainLoop);
