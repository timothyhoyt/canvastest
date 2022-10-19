

const sqrt = Math.sqrt;

//Main Animation Loop
const mainLoop = function(timeStamp){

    //clearframe
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, cWidth, cHeight);

    //draw
    someRect.get('draw')();
    someCir.get('draw')();

    //move if not in location
    if(someRect.get('rect')[0]>0){
        someRect.get('move')( 'x', -0.1)
    }
    if(someCir.get('cir')[0]>0){
        someCir.get('move')( 'x', -0.1)
    }

    //cursor
    fillCirRel([mX, mY, 0.5], 'rgba(255,255,255,0.5)')

    //next frame
    window.requestAnimationFrame(mainLoop);
}


//////////////////
//functions
///////////////////

onkeydown = (e) =>{
    // console.log(e.key)
}

const mouseOverRect = function(rect){
    return mX >= rect[0] && mX <= (rect[0]+rect[2]) && mY >= rect[1] && mY <= (rect[1]+rect[3])
}

const mouseOverCir = function(cir){
    const ret = sqrt((mX-cir[0])**2 + (mY-cir[1])**2) < cir[2];
    return ret;
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

const fillCirRel = function (cir,c){
    ctx.beginPath();
    ctx.arc(cir[0]/100*cWidth, cir[1]/100*cHeight, cir[2]/100*cHeight, 0, 2 * Math.PI, false);
    ctx.fillStyle = c;  ctx.fill(); ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0,0,0,0)';  ctx.stroke();
}


////////////////
//globals
////////////////

//elements
const maindiv = document.getElementsByTagName('main')[0];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");
const menudiv = document.getElementById('theMenu')

//constants
const CC = [ 'rgba(100,200,255,0.50)', 'rgba(100,100,255,0.50)', 'rgba(100,50,200,0.50)', 'rgba(50,100,255,0.50)'
    ,'rgba(100,200,255,0.25)', 'rgba(100,100,255,0.25)', 'rgba(100,50,200,0.25)', 'rgba(50,100,255,0.25)']


//variables
var brect, dvp, cAR, wWidth, wHeight, cWidth, cHeight, mcX, mcY, mX, mY, mcdX, mcdY, mdX, mdY, mcuX, mcuY, muX, muY;
var mouseDownCan = false; var orien = "horizontal";

//maps
const someRect = new Map();
someRect.set('rect', [50,50,50,50])
someRect.set('name', 'someRect')
someRect.set('C', [CC[0], CC[1], CC[2], CC[3]])
someRect.set('draw', ()=>{
    const C = someRect.get('C')
    const rec1 = someRect.get('rect')
    var rectC = mouseDownCan? mouseOverRect(rec1)? C[0] : C[1] : mouseOverRect(rec1)? C[2] : C[3]
    fillRectRel(rec1, rectC);
})
someRect.set('move',(dir, howmuch) => {
    const pos = someRect.get('rect')
    if(dir === 'x'|| dir === 'X'){ pos[0]+=howmuch; }
    else if(dir === 'y' || dir === 'Y'){ pos[1]+=howmuch; }
    someRect.set('rect', pos)
})


const someCir = new Map();
someCir.set('cir', [25,25,10])
someCir.set('name', 'someCir')
someCir.set('C', [CC[4], CC[5], CC[6], CC[7]])
someCir.set('draw',()=>{
    const C = someCir.get('C')
    const cir1 = someCir.get('cir')
    console.log(cir1)
    var cirC = mouseDownCan? mouseOverCir(cir1)? C[0] : C[1] : mouseOverCir(cir1)? C[2] : C[3]
    fillCirRel(cir1, cirC);
})
someCir.set('move',(dir, howmuch) => {
    const pos = someCir.get('cir')
    if(dir === 'x'|| dir === 'X'){ pos[0]+=howmuch;}
    else if(dir === 'y' || dir === 'Y'){ pos[1]+=howmuch;}
    someCir.set('cir', pos)
})


////////////////
//initialization
///////////////////

readWindowSize();
maindiv.appendChild(canvas);
canvas.id = "theCanvas"; canvas.oncontextmenu = () => {return false;}
checkorien(); setStyles(); sizeCanvas();
window.addEventListener('resize', sizeCanvas, true);
window.requestAnimationFrame(mainLoop);
