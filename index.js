

const sqrt = Math.sqrt; const random = Math.random; const sin = Math.sin; const cos = Math.cos;

//Main Animation Loop
const mainLoop = function(timeStamp){

    //clearframe
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, cWidth, cHeight);

    //first frame
    if(firstFrame){
        for(var i=0; i<50; i++){
            food.get('new')();
        }
        firstFrame = false;
    }


    //draw
    food.forEach((val, key)=>{
        if(!isNaN(key)){
            food.get(key).get("draw")();
        }
    })
    someCir.get('draw')();

    //calcs
    someCir.get('calc')();





    /////////////////////////////////////////necessary
    //cursor
    fillCirRel([mX, mY, 0.5], 'rgba(255,255,255,0.5)')

    //next frame
    window.requestAnimationFrame(mainLoop);
}


//////////////////
//functions
///////////////////

const moveShape = function(theShape, dir, howmuch){
    const pos = theShape.get('pos')
    if(dir === 'x'|| dir === 'X'){ pos[0]+=howmuch;}
    else if(dir === 'y' || dir === 'Y'){ pos[1]+=howmuch;}
    theShape.set('pos', pos)
}

const moveShapeByVec = function(theShape, theVec){
    const pos = theShape.get('pos')
    pos[0]+=theVec[0];  pos[1]+=theVec[1]
    theShape.set('pos', pos)
}

const stepShapeToDest = function(theShape){
    const diffVec = vecDiff(theShape.get('dest'), theShape.get('pos'))
    const len = vecLen(diffVec);  const speed = theShape.get('speed')
    const ratio = speed/len
    if(len>0){
        if(len >= speed){  moveShapeByVec(theShape, [ratio*diffVec[0], ratio*diffVec[1] ])}
        else{ moveShapeByVec(theShape, diffVec)}
    }
}

const vecDiff = function(vecTo, vecFrom){return [ vecTo[0]-vecFrom[0] , vecTo[1]-vecFrom[1] ]}

onkeydown = (e) =>{
    // console.log(e.key)
}

const mouseOverRect = function(rect){
    return mX >= rect[0] && mX <= (rect[0]+rect[2]) && mY >= rect[1] && mY <= (rect[1]+rect[3])
}

const mouseOverCir = function(cir){ return dist([mX,mY], cir) < cir[2];}

const dist = function(P1, P2){ return sqrt((P2[0]-P1[0])**2 + (P2[1]-P1[1])**2);}

const vecLen = function(theVec){return dist(theVec, [0,0])}

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

const onMouseDownCanvas = function(){ console.log("Canvas Clicked:",mdX, mdY); mouseDownCan = true;}

onmouseup = (e) => {
    if(mouseDownCan){
        mcuX = e.clientX; mcuY = e.clientY;
        const cW = (brect.right-brect.left); const cH = (brect.bottom-brect.top);
        muX = 100*(mcuX - brect.left)/cW; muY = 100*(mcuY - brect.top)/cH;
        muX = (muX < 0)? 0 : muX;  muX = (muX > 100)? 100 : muX;
        muY = (muY < 0)? 0 : muY;  muY = (muY > 100)? 100 : muY;
        mouseDownCan = false;  console.log("Canvas Unclick:",muX,muY)
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

const readWindowSize = function(){ wWidth = window.innerWidth; wHeight = window.innerHeight;}

const setStyles = function(){
    //default (normal horizontal)
    const menuMin = 0.3;
    var marg, canH, canW, canT, menH, menW, menL
    marg = (wHeight*0.01); canH = (wHeight-marg*2); canW = canH;
    canT = marg; canL = marg; menW = (wWidth - canW - marg*3); 
    menH = wHeight - marg*2; menL = canW + marg*2;

    if(orien == "horizontal"){
        if(wWidth < (wHeight + marg + menuMin*wWidth)){
            // horizontal squeeze
            menW = wWidth*menuMin; canW = wWidth - menW - marg*3;
            canH = canW; menL = canW + marg*2; canT = wHeight/2 - canH/2;
        }
    }else{
        //vertical
        if(wHeight > (wWidth + marg + menuMin*wHeight)){
            //normal
            canW = (wWidth-marg*2); canH = canW;  menH = (wHeight - canH - marg*3);
            menW = wWidth - marg*2;  menL = marg; canT = menH + marg*2;
        }else{
            //squeeze
            menH = wHeight*menuMin; menW = wWidth - marg*2;  menL = marg;
            canH = wHeight - menH - marg*3; canW = canH;  
            canT = menH + marg*2; canL = wWidth/2 - canW/2;
        }
    }

    canvas.style.width = canW.toString()+"px";  canvas.style.height = canH.toString()+"px";
    canvas.style.marginLeft = canL.toString()+"px"; canvas.style.marginTop = canT.toString()+"px";
    canvas.style.marginRight = marg.toString()+"px";  
    menudiv.style.left = menL.toString()+"px"; menudiv.style.width = menW.toString()+"px";  
    menudiv.style.height = menH.toString()+"px"; menudiv.style.marginTop = marg.toString()+"px";
}

const checkorien = function(){
    if(wWidth >= wHeight) {orien = "horizontal"} else {orien = "vertical"}; setStyles()
}

const sizeCanvas = function(){
    readWindowSize(); checkorien(); 
    brect = canvas.getBoundingClientRect(); dvp = window.devicePixelRatio || 1;
    cWidth = (brect.right - brect.left) * dvp; cHeight = (brect.bottom - brect.top) * dvp; 
    canvas.width = cWidth; canvas.height = cHeight; cAR = cWidth/cHeight
}

const fillRectRel = function(rect,c){
    ctx.fillStyle = c; ctx.fillRect(rect[0]/100*cWidth,rect[1]/100*cHeight,rect[2]/100*cWidth,rect[3]/100*cHeight);
}

const fillCirRel = function (cir,c){
    ctx.beginPath();
    ctx.arc(cir[0]/100*cWidth, cir[1]/100*cHeight, cir[2]/100*cHeight, 0, 2 * Math.PI, false);
    ctx.fillStyle = c;  ctx.fill(); ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(0,0,0,0)';  ctx.stroke();
}


////////////////
//globals
////////////////

//elements
const maindiv = document.getElementsByTagName('main')[0]; const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d"); const menudiv = document.getElementById('theMenu')

//constants
const CC = [ 'rgba(100,200,255,0.50)', 'rgba(100,100,255,0.50)', 'rgba(100,50,200,0.50)', 'rgba(50,100,255,0.50)'
    ,'rgba(100,200,255,0.25)', 'rgba(100,100,255,0.25)', 'rgba(100,50,200,0.25)', 'rgba(50,100,255,0.25)']

//variables
var brect, dvp, cAR, wWidth, wHeight, cWidth, cHeight, mcX, mcY, mX, mY, mcdX, mcdY, mdX, mdY, mcuX, mcuY, muX, muY;
var mouseDownCan = false; var orien = "horizontal"; var firstFrame = true;



const food = new Map();
food.set("last", 0);
food.set("new", ()=>{
    
    var num = food.get('last');
    const newFood = new Map();
    newFood.set('num', num);
    newFood.set('pos',[random()*(80)+10,random()*(80)+10]);
    newFood.set('size', [3,3]);
    newFood.set('C', [CC[0], CC[1], CC[2]]);
    newFood.set('draw', ()=>{
        const C = newFood.get('C');
        const rec1 = [newFood.get('pos')[0], newFood.get('pos')[1], newFood.get('size')[0], newFood.get('size')[1]];
        var rectC = mouseDownCan? mouseOverRect(rec1)? C[0] : C[1] : mouseOverRect(rec1)? C[2] : C[1];
        fillRectRel(rec1, rectC);
        
    })
    food.set(num, newFood);
    food.set('last', num+1);
})



const someCir = new Map();
someCir.set('pos', [30,30])
someCir.set('rad', 10)
someCir.set('dest', [100,10])
someCir.set('speed', 0.2)
someCir.set('name', 'someCir')
someCir.set('C', [CC[4], CC[5], CC[6]])
someCir.set('draw',()=>{
    const C = someCir.get('C')
    const cir1 = [someCir.get('pos')[0], someCir.get('pos')[1], someCir.get('rad')]
    // console.log(cir1)
    var cirC = mouseDownCan? mouseOverCir(cir1)? C[0] : C[1] : mouseOverCir(cir1)? C[2] : C[1]
    fillCirRel(cir1, cirC);
})
someCir.set('calc', ()=>{
    stepShapeToDest(someCir)
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
