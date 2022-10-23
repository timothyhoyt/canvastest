
//app constants
const foodRate = 2; // how many new foods per second, limited by frame rate
const foodTime = 1/foodRate;
const startFood = 2;

//app variables
var time = 0;

//Main Animation Loop
const mainLoop = function(timeStamp){

    //per frame constants
    const seconds = (timeStamp)/1000
    
    //clearframe
    ctx.fillStyle = "rgb(0, 0, 0)"; ctx.fillRect(0, 0, cWidth, cHeight);

    //first frame (app initialization)
    if(firstFrame){
        //make food
        for(var i=0; i<startFood; i++){food.get('new')(); }
        firstFrame = false;
    }

    //food trickle    
    if((seconds-time) > foodTime){  food.get('new')(); time+=foodTime;}

    //draw
    food.forEach((val, key)=>{ if(!isNaN(key)){ food.get(key).get("draw")(); } });
    someCir.get('draw')();

    //calcs
    someCir.get('calc')();


    /////////////////////////////////////////necessary
    //cursor
    fillCirRel([mX, mY, 0.5], 'rgba(255,255,255,0.5)')

    //next frame
    window.requestAnimationFrame(mainLoop);
}






//app maps (fast objects)
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



const creatures = new Map();
creatures.set('last', 1);
const newCreature = new Map();
//build first creature
creatures.set(0, newCreature )
creatures.set('clone',(num)=>{
    //build new creature based on existing
})


const someCir = new Map();
someCir.set('name', 'someName');
someCir.set('pos', [50,50]);
someCir.set('rad', 5);
someCir.set('dir', 0); //degrees from East clockwise
someCir.set('dest', [100,10]);
someCir.set('speed', 0.2);
someCir.set('topSpeed', 2)
someCir.set('accel', 0.01);
someCir.set('gen', 0);
someCir.set('fam', 0);
someCir.set('C', [CC[4], CC[5], CC[6]]);
someCir.set('draw',()=>{
    const C = someCir.get('C');
    const pos = someCir.get('pos');
    const rad = someCir.get('rad');
    const cir1 = [pos[0], pos[1], rad];
    const dir = someCir.get('dir');
    const radDir = degToRad(dir);
    var cirC = mouseDownCan? mouseOverCir(cir1)? C[0] : C[1] : mouseOverCir(cir1)? C[2] : C[1]
    fillCirRel(cir1, cirC);
    const rad2 = 0.8*rad;
    const pos2 = [pos[0]+rad2*cos(radDir), pos[1]+rad2*sin(radDir)]
    cir2 = [pos2[0], pos2[1], 1];
    fillCirRel(cir2, 'rgba(255,255,255,0.5)')
})
someCir.set('calc', ()=>{
    //stepShapeToDest(someCir)
    const speed = someCir.get('speed')
    const dir = someCir.get('dir');
    const radDir = degToRad(dir);
    const dirVec = [speed*cos(radDir), speed*sin(radDir)]
    const pos = someCir.get('pos');
    if(pos[0]<0) pos[0]+=100;
    if(pos[0]>100) pos[0]-=100;
    if(pos[1]<0) pos[1]+=100;
    if(pos[1]>100) pos[1]-=100;
    someCir.set('pos',pos)
    moveShapeByVec(someCir, dirVec)
    var newSpeed = someCir.get('speed')+someCir.get('accel')
    newSpeed = (newSpeed > someCir.get('topSpeed'))? someCir.get('topSpeed') : newSpeed
    someCir.set('speed', newSpeed)
})



