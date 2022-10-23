
//app constants
const foodRate = 0.5; // how many new foods per second, limited by frame rate
const foodTime = 1/foodRate;
const startFood = 2;
const startCreatures = 10;

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
        for(var i=0; i<startCreatures; i++){creatures.get('new')()}
        firstFrame = false;
    }

    //food trickle    
    if((seconds-time) > foodTime){  food.get('new')(); time+=foodTime;}

    //draw
    food.forEach((val, key)=>{ if(!isNaN(key)){ food.get(key).get("draw")(); } });
    creatures.forEach((val, key)=>{ if(!isNaN(key)){ creatures.get(key).get('draw')();}})

    //calcs
    creatures.forEach((val, key)=>{ if(!isNaN(key)){ creatures.get(key).get('calc')();}})


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
creatures.set('last', 0);
creatures.set('numFams',0);
creatures.set('new', ()=>{
    var num = creatures.get('last');
    var fam = creatures.get('numFams');

    const newCreature = new Map();
    //build first creature
    newCreature.set('num',num)
    newCreature.set('name', 'someName');
    newCreature.set('pos', [random()*(80)+10,random()*(80)+10]);
    newCreature.set('rad', 3);
    newCreature.set('dir', random()*360); //degrees from East clockwise
    // newCreature.set('dest', [100,10]);
    newCreature.set('speed', 0);
    newCreature.set('topSpeed', 1)
    newCreature.set('accel', 0);//0.001);
    newCreature.set('gen', 0);
    newCreature.set('fam', fam);
    const h = 360/startCreatures*fam+5
    newCreature.set('C', ['hsl('+ h +',100%,80%, 0.5)', 'hsl('+ h +',100%,50%, 0.5)', 'hsl('+ h +',100%,70%, 0.5)']);
    newCreature.set('draw',()=>{
        const C = newCreature.get('C');
        const pos = newCreature.get('pos');
        const rad = newCreature.get('rad');
        const cir1 = [pos[0], pos[1], rad];
        const dir = newCreature.get('dir');
        const radDir = degToRad(dir);
        var cirC = mouseDownCan? mouseOverCir(cir1)? C[0] : C[1] : mouseOverCir(cir1)? C[2] : C[1]
        fillCirRel(cir1, cirC);
        const rad2 = 0.8*rad;
        const pos2 = [pos[0]+rad2*cos(radDir), pos[1]+rad2*sin(radDir)]
        cir2 = [pos2[0], pos2[1], 0.25];
        fillCirRel(cir2, 'rgba(255,255,255,0.5)')
    })
    newCreature.set('calc', ()=>{
        //stepShapeToDest(newCreature)
        const speed = newCreature.get('speed')
        const dir = newCreature.get('dir');
        const radDir = degToRad(dir);
        const dirVec = [speed*cos(radDir), speed*sin(radDir)]
        const pos = newCreature.get('pos');
        if(pos[0]<0) pos[0]+=100;
        if(pos[0]>100) pos[0]-=100;
        if(pos[1]<0) pos[1]+=100;
        if(pos[1]>100) pos[1]-=100;
        newCreature.set('pos',pos)
        moveShapeByVec(newCreature, dirVec)
        var newSpeed = newCreature.get('speed')+newCreature.get('accel')
        newSpeed = (newSpeed > newCreature.get('topSpeed'))? newCreature.get('topSpeed') : newSpeed
        newCreature.set('speed', newSpeed)
    })
    creatures.set(num, newCreature);
    creatures.set('numFams', fam+1);
    creatures.set('last', num+1)
})


