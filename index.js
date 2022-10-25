
//app constants
const foodRate = 0; // how many new foods per second, limited by frame rate
const foodTime = 1/foodRate;
const startFood = 1;
const startCreatures = 1;
const creatureStartRad = 3;
const foodSize = 3;

//app variables
var time = 0;

//Main Animation Loop
const mainLoop = function(){

    //clearframe
    ctx.fillStyle = "rgb(0, 0, 0)"; ctx.fillRect(0, 0, cWidth, cHeight);

    //draw
    food.forEach((val, key)=>{ if(!isNaN(key)){ food.get(key).get("draw")(); } });
    creatures.get('draw')()

    // const theCreature = creatures.get(0)
    // var cposx = theCreature.get('pos')[0]
    // var cposy = theCreature.get('pos')[1]
    // var fposx = theCreature.get('targetPos')[0]
    // var fposy = theCreature.get('targetPos')[1]
    // cposx = cposx/100*cWidth
    // cposy = cposy/100*cHeight
    // fposx = fposx/100*cWidth
    // fposy = fposy/100*cHeight
    // ctx.strokeStyle = "blue";
    // ctx.beginPath();
    // ctx.moveTo(cposx,cposy);
    // ctx.lineTo(fposx, fposy);
    // ctx.stroke();
    

    /////////////////////////////////////////necessary
    //cursor
    fillCirRel([mX, mY, 0.5], 'rgba(255,255,255,0.5)')

    //TODO FPS display

    //next frame
    window.requestAnimationFrame(mainLoop);
}

var lastLapse = 0;
const timeLoop = function(){
    const currTime = new Date();
    const lapse = currTime - startTime
    //TODO fps calc

    //per frame constants
    const seconds = (lapse)/1000

    //first frame (app initialization)
    if(firstFrame){
        //make start maps items
        for(var i=0; i<startFood; i++){food.get('new')(); }
        for(var i=0; i<startCreatures; i++){creatures.get('new')()}
        firstFrame = false;
    }

    //food trickle    
    if((seconds-time) > foodTime){ food.get('new')(); time+=foodTime;}

    //calcs
    creatures.get('calc')()

    //next frame
    setTimeout(timeLoop, 0)
    lastLapse = lapse;
}



//app maps (fast objects)
const food = new Map();
food.set("last", 0);
food.set("new", ()=>{
    
    var num = food.get('last');
    const newFood = new Map();
    newFood.set('num', num);
    newFood.set('pos',[random()*(80)+10,random()*(80)+10]);
    newFood.set('size', [foodSize,foodSize]);
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
    //build first creature of new family
    var num = creatures.get('last');
    var fam = creatures.get('numFams');
    const newCreature = new Map();
    creatures.set(num, newCreature);
    newCreature.set('num',num)
    newCreature.set('score', 0);
    newCreature.set('target', -1);
    newCreature.set('targetPos', [0,0])
    newCreature.set('pos', [random()*(80)+10,random()*(80)+10]);
    newCreature.set('rad', creatureStartRad);
    newCreature.set('dir', random()*360); //degrees from East clockwise
    newCreature.set('speed', 0);
    newCreature.set('topSpeed', 0.1)
    newCreature.set('accel', 0.001);
    newCreature.set('rotSpeed', 2);
    newCreature.set('rotTopSpeed', 1);
    newCreature.set('rotAccel', 0.02);
    newCreature.set('gen', 0);
    newCreature.set('fam', fam);
    const h = 360/startCreatures*fam+5
    newCreature.set('C', ['hsl('+ h +',100%,80%, 0.5)', 'hsl('+ h +',100%,50%, 0.5)', 'hsl('+ h +',100%,70%, 0.5)']);
    creatures.set('numFams', fam+1);
    creatures.set('last', num+1)
})
creatures.set('draw',()=>{
    creatures.forEach((val,key)=>{
        if(!isNaN(key)){
            const C = creatures.get(key).get('C');
            const pos = creatures.get(key).get('pos');
            const rad = creatures.get(key).get('rad');
            const cir1 = [pos[0], pos[1], rad];
            const dir = creatures.get(key).get('dir');
            const radDir = degToRad(dir);
            var cirC = mouseDownCan? mouseOverCir(cir1)? C[0] : C[1] : mouseOverCir(cir1)? C[2] : C[1]
            fillCirRel(cir1, cirC);
            const rad2 = 0.8*rad;
            const pos2 = [pos[0]+rad2*cos(radDir), pos[1]+rad2*sin(radDir)]
            cir2 = [pos2[0], pos2[1], 0.2*rad];
            fillCirRel(cir2, 'rgba(255,255,255,0.5)')
        }
    })
})
creatures.set('calc', ()=>{
    creatures.forEach((val,key)=>{
        if(!isNaN(key)){
            //move
            const theCreature = creatures.get(key)
            const speed = theCreature.get('speed')
            const dir = theCreature.get('dir');
            const radDir = degToRad(dir);
            const dirVec = [speed*cos(radDir), speed*sin(radDir)]
            const pos = theCreature.get('pos');
            if(pos[0]<0) pos[0]+=100;
            if(pos[0]>100) pos[0]-=100;
            if(pos[1]<0) pos[1]+=100;
            if(pos[1]>100) pos[1]-=100;
            theCreature.set('pos',pos)
            moveShapeByVec(theCreature, dirVec)
            var closest = -1;
            var closestD = 99999999;

            //TODO eat target if close enough

            //find next target
            //TODO fix for finding targets across canvas border
            food.forEach((val, key2)=>{
                if(!isNaN(key2)){
                    const fpos1 = food.get(key2).get('pos')
                    const fpos = [fpos1[0]+foodSize/2, fpos1[1]+foodSize/2]
                    const diff = [fpos[0]-pos[0], fpos[1]-pos[1]]
                    if(diff[0]>=50){diff[0]-=100}
                    if(diff[0]<-50){diff[0]+=100}
                    if(diff[1]>=50){diff[1]-=100}
                    if(diff[1]<-50){diff[1]+=100}
                    const dis = dist([0,0], diff)
                    if(dis<closestD){
                        closestD = dis
                        closest = key2
                    }
                }
            })

            theCreature.set('target', closest);

            //rotate toward target
            if(closest > -1){
                const fpos1 = food.get(closest).get('pos')
                const fpos = [fpos1[0]+foodSize/2, fpos1[1]+foodSize/2]
                const diff = [fpos[0]-pos[0], fpos[1]-pos[1]]
                if(diff[0]>=50){diff[0]-=100}
                if(diff[0]<-50){diff[0]+=100}
                if(diff[1]>=50){diff[1]-=100}
                if(diff[1]<-50){diff[1]+=100}
                theCreature.set('targetPos', [pos[0]+diff[0],pos[1]+diff[1]])
                const angleTo = degAtan2([0,0],diff)
                var diffAngle = angleTo - dir
                
                if(diffAngle<-180){diffAngle+=360}
                if(diffAngle >= 180){diffAngle-=360}
                // console.log(diffAngle)

                const rotSpeed = theCreature.get('rotSpeed')
                // console.log('rotSpeed', rotSpeed)
                if(abs(diffAngle) >= rotSpeed){
                    // console.log('correcting angle by', sign(diffAngle)*rotSpeed)
                    theCreature.set('dir', dir + sign(diffAngle)*rotSpeed)
                }else if ( abs(diffAngle) > 0.01 ){
                    // console.log('correcting angle by', diffAngle)
                    theCreature.set('dir', dir + diffAngle)
                }


                //TODO apply rotation acceleration according to sign of diff angle
            }

            
            //accelerate
            var newSpeed = theCreature.get('speed')+theCreature.get('accel')
            newSpeed = (newSpeed > theCreature.get('topSpeed'))? theCreature.get('topSpeed') : newSpeed
            theCreature.set('speed', newSpeed)

            

        }
    })
})

creatures.set('clone',(which)=>{
    const num = creatures.get('last')
    const newCreature = new Map(creatures.get(which))
    newCreature.set('num', num)
    newCreature.set('target', -1)
    newCreature.set('speed', 0)
    newCreature.set('rotSpeed',0)
    newCreature.set('score', 0)
    const oldpos = newCreature.get('pos')
    const olddir = newCreature.get('dir')
    const olddirrad = degToRad(olddir)
    newCreature.set('pos', [ oldpos[0]-5*cos(olddirrad), oldpos[1]-5*sin(olddirrad)])
    newCreature.set('dir', olddir +90 + random()*180)
    newCreature.set('gen', newCreature.get('gen')+1)
    newCreature.set('rad', creatureStartRad)
    creatures.set(num, newCreature)
    creatures.set('last', num+1)
})

