



//Main Animation Loop
const mainLoop = function(timeStamp){
    
    //clearframe
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw
    fillRectRel(25, 25, 25, 25, "rgba(100,150,200,0.5)");

    //cursor
    fillCirRel(mX, mY, 0.5, 'rgba(255,255,255,0.5)')

    //next frame
    window.requestAnimationFrame(mainLoop);
}


//////////////////
//functions
///////////////////


onmousemove = (e) => {
    mcX = e.clientX; mcY = e.clientY;
    const cW = (brect.right-brect.left);
    const cH = (brect.bottom-brect.top);
    mX = 100*(mcX - brect.left)/cW; mY = 100*(mcY - brect.top)/cH;
    mX = (mX < 0)? 0 : mX;  mX = (mX > 100)? 100 : mX;
    mY = (mY < 0)? 0 : mY;  mY = (mY > 100)? 100 : mY;
    console.log(mX,mY)
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
            canH = canW; menL = canW + marg*2
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
    if(wWidth >= wHeight) {orien = "horizontal"}
    else {orien = "vertical"}
    setStyles()
}

const sizeCanvas = function(){
    readWindowSize(); checkorien(); 
    brect = canvas.getBoundingClientRect();
    dvp = window.devicePixelRatio || 1;
    canvas.width = (brect.right - brect.left) * dvp;
    canvas.height = (brect.bottom - brect.top) * dvp; 
    cAR = canvas.width/canvas.height
}

const fillRectRel = function(x,y,w,h,c){
    ctx.fillStyle = c;
    ctx.fillRect(x/100*canvas.width,y/100*canvas.height,w/100*canvas.width,h/100*canvas.height);
}

const fillCirRel = function (x,y,r,c){
    ctx.beginPath();
    ctx.arc(x/100*canvas.width, y/100*canvas.height, r/100*canvas.height, 0, 2 * Math.PI, false);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    ctx.stroke();
}


////////////////
//globals
////////////////

const maindiv = document.getElementsByTagName('main')[0];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");
const menudiv = document.createElement('div');
var brect, dvp, cAR, wWidth, wHeight, mcX, mcY, mX, mY;
var orien = "horizontal";


////////////////
//initialization
///////////////////

readWindowSize();
maindiv.appendChild(canvas);
maindiv.appendChild(menudiv);
canvas.id = "theCanvas";
menudiv.id = "theMenu";
menudiv.style.position = "absolute";
checkorien(); setStyles(); sizeCanvas();
window.addEventListener('resize', sizeCanvas, true);
window.requestAnimationFrame(mainLoop);
