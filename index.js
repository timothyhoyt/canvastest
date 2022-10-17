



//Main Animation Loop
const mainLoop = function(timeStamp){

    //constants
    const C1 = "rgba(200, 200, 100, 0.5)";
    const C2 = "rgba(100, 150, 200, 0.5)";
    const C3 = "rgba(200,100,255,0.5)";
    const C4 = "rgba(150, 100, 200, 0.5)";

    //clearframe
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, cWidth, cHeight);

    //draw
    const rec1 = [25,25,25,25]
    var rectC = mouseDownCan? mouseOverRect(rec1)? C1 : C2 : mouseOverRect(rec1)? C3 : C4

    fillRectRel(rec1, rectC);


    //cursor
    fillCirRel(mX, mY, 0.5, 'rgba(255,255,255,0.5)')

    //next frame
    window.requestAnimationFrame(mainLoop);
}


//////////////////
//functions
///////////////////

const mouseOverRect = function(rect){
    return mX >= rect[0] && mX <= (rect[0]+rect[2]) && mY >= rect[1] && mY <= (rect[1]+rect[3])
}

onmousedown = (e) => {
    if(e.button === 0){
        mcdX = e.clientX; mcdY = e.clientY;
        const cW = (brect.right-brect.left); const cH = (brect.bottom-brect.top);
        mdX = 100*(mcdX - brect.left)/cW; mdY = 100*(mcdY - brect.top)/cH;
        mdX = (mdX < 0)? -1 : mdX;  mdX = (mdX > 100)? -1 : mdX;
        mdY = (mdY < 0)? -1 : mdY;  mdY = (mdY > 100)? -1 : mdY;
        if((mdX >= 0) && (mdY >= 0)) { onMouseDownCanvas(); }
    }
}

const onMouseDownCanvas = function(){
    console.log("Canvas Clicked:",mdX, mdY);
    mouseDownCan = true;
}

onmouseup = (e) => {
    if(mouseDownCan){
        mcuX = e.clientX; mcuY = e.clientY;
        const cW = (brect.right-brect.left); const cH = (brect.bottom-brect.top);
        muX = 100*(mcuX - brect.left)/cW; muY = 100*(mcuY - brect.top)/cH;
        muX = (muX < 0)? 0 : muX;  muX = (muX > 100)? 100 : muX;
        muY = (muY < 0)? 0 : muY;  muY = (muY > 100)? 100 : muY;
        mouseDownCan = false;
        console.log("Canvas Unclick:",muX,muY)
    }
}

onmousemove = (e) => {
    mcX = e.clientX; mcY = e.clientY;
    const cW = (brect.right-brect.left);
    const cH = (brect.bottom-brect.top);
    mX = 100*(mcX - brect.left)/cW; mY = 100*(mcY - brect.top)/cH;
    mX = (mX < 0)? 0 : mX;  mX = (mX > 100)? 100 : mX;
    mY = (mY < 0)? 0 : mY;  mY = (mY > 100)? 100 : mY;
}

const readWindowSize = function(){
    wWidth = window.innerWidth; wHeight = window.innerHeight;
}

const setStyles = function(){
    //default (normal horizontal)
    const menuMin = 0.3;
    var marg, canH, canW, canT, menH, menW, menL
    marg = (wHeight*0.01);
    canH = (wHeight-marg*2); canW = canH;
    canT = marg; canL = marg;
    menW = (wWidth - canW - marg*3); menH = wHeight - marg*2;
    menL = canW + marg*2;

    if(orien == "horizontal"){
        if(wWidth < (wHeight + marg + menuMin*wWidth)){
            // horizontal squeeze
            menW = wWidth*menuMin; canW = wWidth - menW - marg*3;
            canH = canW; menL = canW + marg*2;
            canT = wHeight/2 - canH/2;
        }
    }else{
        //vertical
        if(wHeight > (wWidth + marg + menuMin*wHeight)){
            //normal
            canW = (wWidth-marg*2); canH = canW;
            menH = (wHeight - canH - marg*3);
            menW = wWidth - marg*2;  menL = marg;
            canT = menH + marg*2;
        }else{
            //squeeze
            menH = wHeight*menuMin;
            menW = wWidth - marg*2;  menL = marg;
            canH = wHeight - menH - marg*3;
            canW = canH;  canT = menH + marg*2;
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
    const prevorien = orien;
    if(wWidth >= wHeight) {orien = "horizontal"} else {orien = "vertical"}; setStyles()
}

const sizeCanvas = function(){
    readWindowSize(); checkorien(); 
    brect = canvas.getBoundingClientRect();
    dvp = window.devicePixelRatio || 1;
    cWidth = (brect.right - brect.left) * dvp;
    cHeight = (brect.bottom - brect.top) * dvp; 
    canvas.width = cWidth; canvas.height = cHeight;
    cAR = cWidth/cHeight
}

const fillRectRel = function(rect,c){
    ctx.fillStyle = c;
    ctx.fillRect(rect[0]/100*cWidth,rect[1]/100*cHeight,rect[2]/100*cWidth,rect[3]/100*cHeight);
}

const fillCirRel = function (x,y,r,c){
    ctx.beginPath();
    ctx.arc(x/100*cWidth, y/100*cHeight, r/100*cHeight, 0, 2 * Math.PI, false);
    ctx.fillStyle = c;  ctx.fill(); ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0,0,0,0)';  ctx.stroke();
}


////////////////
//globals
////////////////

const maindiv = document.getElementsByTagName('main')[0];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");
const menudiv = document.getElementById('theMenu')
var brect, dvp, cAR, wWidth, wHeight, cWidth, cHeight, mcX, mcY, mX, mY, mcdX, mcdY, mdX, mdY, mcuX, mcuY, muX, muY;
var mouseDownCan = false; var orien = "horizontal";


////////////////
//initialization
///////////////////

readWindowSize();
maindiv.appendChild(canvas);
canvas.id = "theCanvas"; canvas.oncontextmenu = () => {return false;}
checkorien(); setStyles(); sizeCanvas();
window.addEventListener('resize', sizeCanvas, true);
window.requestAnimationFrame(mainLoop);
