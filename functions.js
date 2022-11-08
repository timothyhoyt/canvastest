

//imported functions
const abs = Math.abs; const sign = Math.sign; const atan2  = Math.atan2; 
const PI  = Math.PI;  const sqrt = Math.sqrt; const random = Math.random; 
const sin = Math.sin; const cos  = Math.cos;  const ceil   = Math.ceil;

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



const fillRectRel = function(rect,c){ ctx.fillStyle = c; ctx.fillRect(rect[0]/100*cWidth,rect[1]/100*cHeight,rect[2]/100*cWidth,rect[3]/100*cHeight);}
const fillCirRel = function (cir,c){ctx.beginPath(); ctx.arc(cir[0]/100*cWidth, cir[1]/100*cHeight, cir[2]/100*cHeight, 0, 2 * Math.PI, false);ctx.fillStyle = c;  ctx.fill(); ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(0,0,0,0)';  ctx.stroke();}
const strokeCirRel = function (cir,c,w){ //w is line width
    ctx.beginPath(); 
    ctx.arc(cir[0]/100*cWidth, cir[1]/100*cHeight, cir[2]/100*cHeight, 0, 2 * Math.PI, false);
    ctx.lineWidth = w; ctx.strokeStyle = c;  ctx.stroke();
}

const checkorien = function(){if(wWidth >= wHeight) {orien = "horizontal"} else {orien = "vertical"}; setStyles()}
const readWindowSize = function(){ wWidth = window.innerWidth; wHeight = window.innerHeight;}
const vecDiff = function(vecTo, vecFrom){return [ vecTo[0]-vecFrom[0] , vecTo[1]-vecFrom[1] ]}
onkeydown = (e) =>{ /* console.log(e.key) */}
const mouseOverRect = function(rect){return mX >= rect[0] && mX <= (rect[0]+rect[2]) && mY >= rect[1] && mY <= (rect[1]+rect[3])}
const mouseOverCir = function(cir){ return dist([mX,mY], cir) < cir[2];}
const dist = function(P1, P2){ return sqrt((P2[0]-P1[0])**2 + (P2[1]-P1[1])**2);}
const vecLen = function(theVec){return dist(theVec, [0,0])}
const degToRad = function(deg){return (deg/180*PI)%(2*PI)};
const radToDeg = function(rad){return (rad/PI*180)%(360)};
const randUpDown = function(perc){return (random()*perc*2-perc)} //given decimal (0.1 etc) returns random between neg and pos extremens (-0.1 ... 0.1)

//P1 is the creature, P2 is the food
const degAtan2 = function(P1, P2){ 
    var ang = radToDeg(atan2(P2[1]-P1[1], P2[0]-P1[0]))
    if (ang < 0){ang+=360}
    if (ang >=360){ang-=360}
    return ang
}


familySlider.oninput = function(){
    familyNumDiv.innerHTML = this.value;
    startCreatures = this.value;
}

foodStartSlider.oninput = function(){
    foodStartNumDiv.innerHTML = this.value;
    startFood = this.value;
}

starveRateSlider.oninput = function(){
    starveRateNumDiv.innerHTML = this.value;
}



foodRateSlider.oninput = function(){
    foodRateNumDiv.innerHTML = this.value;
}

foodBreedSlider.oninput = function(){
    foodBreedNumDiv.innerHTML = this.value;
}

mutationRateSlider.oninput = function(){
    mutationRateNumDiv.innerHTML = this.value + '%';
}


startButton.onclick = function(){
    reset();
}


hideButton.onclick = function(){
    menuHidden = !menuHidden
    setStyles();
}

menuButton.onclick = function(){
    selectedPage.style.display = "none"
    selectedPage = selectPage 
    selectedPage.style.display = "flex"
}

setupButton.onclick = function(){
    selectedPage.style.display = "none"
    selectedPage = setupPage;
    selectedPage.style.display = "flex"
}

familiesButton.onclick = function(){
    selectedPage.style.display = "none"
    selectedPage = familiesPage;
    selectedPage.style.display = "flex"
}

membersButton.onclick = function(){
    selectedPage.style.display = "none"
    selectedPage = membersPage;
    selectedPage.style.display = "block"
}

creatureButton.onclick = function(){
    selectedPage.style.display = "none"
    selectedPage = creaturePage;
    selectedPage.style.display = "block"
}

const onMouseDownCanvas = function(){ 
    console.log("Canvas Clicked:",mdX, mdY);
    creatures.get('clone')(2);
    mouseDownCan = true;
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


const setStyles = function(){
    //default (normal horizontal)
    const menuMin = 0.3;
    var  canH, canW, canT, menH, menW, menL, hBH, hBW
    marg = (wHeight*0.01); 
    
    canH = (wHeight-marg*2); canW = canH;
    canT = marg; canL = marg; menW = (wWidth - canW - marg*3); 
    menH = wHeight - marg*2; menL = canW + marg*2;

    hBH = menH*0.05;
    hBW = menH*0.5/2;
    

    if(orien == "horizontal"){
        if(wWidth < (wHeight + marg + menuMin*wWidth)){
            // horizontal squeeze
            menW = wWidth*menuMin; canW = wWidth - menW - marg*3;
            canH = canW; menL = canW + marg*2; canT = wHeight/2 - canH/2;
        }

        hBH = menH*0.05;
        hBW = menH*0.2/2;

        if(menuHidden){
            menudiv.style.display = "none";
            maindiv.appendChild(hideButton);
            hideButton.style.top = null
            hideButton.style.bottom = marg+"px";
            hideButton.style.left = "calc(100% - "+hBW.toString()+"px - "+marg.toString()+"px)";
            hideButton.style.right = null;
            hideButton.textContent = "Show"
            canL = wWidth/2-canW/2
        }else{
            menudiv.style.display = "block";
            menudiv.appendChild(hideButton);
            hideButton.style.top = null
            hideButton.style.bottom = 0;
            hideButton.style.right = null;
            hideButton.style.left = 0;
            hideButton.textContent = "Hide"
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

        hBH = menH*0.15;
        hBW = menH*0.5/2;

        if(menuHidden){
            menudiv.style.display = "none";
            maindiv.appendChild(hideButton);
            hideButton.style.top = marg+"px"
            hideButton.style.bottom = null;
            hideButton.style.left = marg+"px";
            hideButton.style.right = null;
            hideButton.textContent = "Show"
            canT = (wHeight-hBH)/2+hBH-canH/2
        }else{
            menudiv.style.display = "block";
            menudiv.appendChild(hideButton);
            hideButton.style.top = null
            hideButton.style.bottom = 0;
            hideButton.style.left = 0;
            hideButton.style.right = null;
            hideButton.textContent = "Hide"
        }
    }

    canvas.style.width = canW.toString()+"px";  canvas.style.height = canH.toString()+"px";
    canvas.style.marginLeft = canL.toString()+"px"; canvas.style.marginTop = canT.toString()+"px";
    canvas.style.marginRight = marg.toString()+"px";  
    menudiv.style.left = menL.toString()+"px"; menudiv.style.width = menW.toString()+"px";  
    menudiv.style.height = menH.toString()+"px"; menudiv.style.marginTop = marg.toString()+"px";
    
    hideButton.style.height = hBH.toString()+ "px"; hideButton.style.width = hBW.toString() + 'px'
    hideButton.style.fontSize = (hBH*0.5).toString()+'px';

    menuButton.style.height = hBH.toString()+ "px"; menuButton.style.width = hBW.toString() + 'px'
    menuButton.style.fontSize = (hBH*0.5).toString()+'px';
    menuButton.style.left = (menW/2 - hBW/2).toString() + 'px';

    selectPage.style.height = (menH - hBH).toString() + 'px'
    setupPage.style.height = (menH - hBH).toString() + 'px'
    familiesPage.style.height = (menH - hBH).toString() + 'px'
    membersPage.style.height = (menH - hBH).toString() + 'px'
    creaturePage.style.height = (menH - hBH).toString() + 'px'


    
    setupButton.style.height = hBH.toString()+ "px"; setupButton.style.width = (hBW*2).toString() + 'px'
    setupButton.style.fontSize = (hBH*0.5).toString()+'px';
    setupButton.style.marginBottom = (hBH/10).toString() + "px"
    
    familiesButton.style.height = hBH.toString()+ "px"; familiesButton.style.width = (hBW*2).toString() + 'px'
    familiesButton.style.fontSize = (hBH*0.5).toString()+'px';
    familiesButton.style.marginBottom = (hBH/10).toString() + "px"

    membersButton.style.height = hBH.toString()+ "px"; membersButton.style.width = (hBW*2).toString() + 'px'
    membersButton.style.fontSize = (hBH*0.5).toString()+'px';
    membersButton.style.marginBottom = (hBH/10).toString() + "px"

    creatureButton.style.height = hBH.toString()+ "px"; creatureButton.style.width = (hBW*2).toString() + 'px'
    creatureButton.style.fontSize = (hBH*0.5).toString()+'px';




    startButton.style.height = hBH.toString()+ "px"; startButton.style.width = (hBW*2).toString() + 'px'
    startButton.style.fontSize = (hBH*0.5).toString()+'px';

}


const sizeCanvas = function(){
    readWindowSize(); checkorien(); 
    brect = canvas.getBoundingClientRect(); dvp = window.devicePixelRatio || 1;
    cWidth = (brect.right - brect.left) * dvp; cHeight = (brect.bottom - brect.top) * dvp; 
    canvas.width = cWidth; canvas.height = cHeight; cAR = cWidth/cHeight
}


