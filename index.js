
//app constants
var foodRate = 1; // how many new foods per second, limited by frame rate
var foodTime = 1/foodRate;
var startFood = 100;
var startCreatures = 6;
var creatureStartRad = 1.5;
var creatureMaxRad = 4;
const foodSize = 1;
var creatureGrowth = 1.07;
var creatureStarve = 0.9999;
var creatureBreedReq = 10;

var mutPerc = 0.4;
const accelMut = mutPerc;
const topSpeedMut = mutPerc;
const rotTopSpeedMut = mutPerc;
const rotAccelMut = mutPerc;

//app variables
var time = 0;

//Main Animation Loop
const mainLoop = function(){
    const currTime = new Date();
    const lapse = currTime - startTime
    const frameLapse = lapse - dlastLapse
    
    //dfps calc
    dfps = ceil(1000/frameLapse)

    //clearframe
    ctx.fillStyle = "rgb(0, 0, 0)"; ctx.fillRect(0, 0, cWidth, cHeight);

    //draw
    food.forEach((val, key)=>{ if(!isNaN(key)){ food.get(key).get("draw")(); } });
    creatures.get('draw')()
    

    /////////////////////////////////////////necessary
    //cursor
    fillCirRel([mX, mY, 0.5], 'rgba(255,255,255,0.5)')


    //FPS display update
    cfpsframe++;
    if(cfpsframe > 10){
        cfpsframe = 0;
        cfpsdiv.textContent = cfps.toString()
    }
    dfpsframe++;
    if(dfpsframe > 10){
        dfpsframe = 0;
        dfpsdiv.textContent = dfps.toString()
    }

    //stats update
    for(var i=familiesStats.rows.length-1; i>0; i--){
        familiesStats.deleteRow(i)
    }
    const numFams = creatures.get('numFams')
    const memCounts = new Array(numFams).fill(0);
    const maxGen = new Array(numFams).fill(0);

    creatures.forEach((val, key5)=>{
        if(!isNaN(key5)){
            const cr = creatures.get(key5)
            const fam = cr.get('fam')
            memCounts[fam]++
            const gen = cr.get('gen')
            if(gen > maxGen[fam]){maxGen[fam] = gen}
        }
    })

    for(var i = 0; i < numFams; i++){
        const row = familiesStats.insertRow(i+1)
        const h = 360/startCreatures*i+5;
        row.style.backgroundColor = 'hsl('+ h.toString() +',100%,25%)';
        row.insertCell(0).innerHTML = maxGen[i]
        row.insertCell(1).innerHTML = memCounts[i]
        
    }

    //next frame
    window.requestAnimationFrame(mainLoop);
    dlastLapse = lapse;
}


const timeLoop = function(){
    const currTime = new Date();
    const lapse = currTime - startTime
    const frameLapse = lapse - clastLapse
    
    //cfps calc
    cfps = ceil(1000/frameLapse)

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
    clastLapse = lapse;
}

const reset = function(){
    food.set('last',0);
    food.forEach((val,key6)=>{
        if(!isNaN(key6)){
            food.delete(key6)
        }
    })
    creatures.set('last',0)
    creatures.set('highScore',0)
    creatures.set('numFams',0)
    creatures.forEach((val,key7)=>{
        if(!isNaN(key7)){
            creatures.delete(key7)
        }
    })

    foodRate = foodRateSlider.value;
    foodTime = 1/foodRate;

    creatureBreedReq = foodBreedSlider.value;

    firstFrame = true;
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
creatures.set('highScore', 0);
creatures.set('numFams',0);
creatures.set('new', ()=>{
    //build first creature of new family
    var num = creatures.get('last');
    var fam = creatures.get('numFams');
    const newCreature = new Map();
    creatures.set(num, newCreature);
    newCreature.set('num',num)
    newCreature.set('breedCount',0);
    newCreature.set('score', 0);
    newCreature.set('target', -1);
    newCreature.set('targetPos', [0,0])
    newCreature.set('pos', [random()*(80)+10,random()*(80)+10]);
    newCreature.set('rad', creatureStartRad);
    newCreature.set('dir', random()*360); //degrees from East clockwise
    newCreature.set('speed', 0);
    newCreature.set('topSpeed', 0.1)
    newCreature.set('accel', 0.001);
    newCreature.set('rotSpeed', 0);
    newCreature.set('rotTopSpeed', 1);
    newCreature.set('rotAccel', 0.01);
    newCreature.set('gen', 0);
    newCreature.set('fam', fam);
    const h = 360/startCreatures*fam+5
    newCreature.set('C', ['hsl('+ h +',100%,80%, 0.5)', 'hsl('+ h +',100%,50%, 0.5)', 'hsl('+ h +',100%,70%, 0.5)']);
    creatures.get('mutate')(newCreature)
    creatures.set('numFams', fam+1);
    creatures.set('last', num+1)
})
creatures.set('draw',()=>{
    creatures.forEach((val,key)=>{
        if(!isNaN(key)){
            const theCreat = creatures.get(key)
            const C = theCreat.get('C');
            const pos = theCreat.get('pos');
            const rad = theCreat.get('rad');
            const cir1 = [pos[0], pos[1], rad];
            const dir = theCreat.get('dir');
            const radDir = degToRad(dir);
            var cirC = mouseDownCan? mouseOverCir(cir1)? C[0] : C[1] : mouseOverCir(cir1)? C[2] : C[1]
            fillCirRel(cir1, cirC);
            const rad2 = 0.8*rad;
            const pos2 = [pos[0]+rad2*cos(radDir), pos[1]+rad2*sin(radDir)]
            cir2 = [pos2[0], pos2[1], 0.2*rad];
            fillCirRel(cir2, 'rgba(255,255,255,0.5)')

            const fsize = (rad*4)
            ctx.font = 'bold '+ ceil((fsize).toString()) + 'px serif'
            ctx.fillStyle = 'black'

            const score = theCreat.get('score')
            const txs = pos[0]/100*cWidth - fsize/4*score.toString().length
            const tys = pos[1]/100*cHeight + fsize/2*1.5
            ctx.fillText(score, txs, tys)
            
            const gen = theCreat.get('gen')
            const txg = pos[0]/100*cWidth - fsize/4*gen.toString().length
            const tyg = pos[1]/100*cHeight - fsize/8*1.5
            ctx.fillText(gen, txg, tyg)

            //TODO highscore highlight
            if(score >= creatures.get('highScore')){
                const cir3 = [pos[0], pos[1], rad*1.2];
                strokeCirRel(cir3,'rgba(255,255,255,0.5)',3)
            }
        }
    })
})
creatures.set('calc', ()=>{
    
    creatures.forEach((val,key)=>{
        if(!isNaN(key)){
            //move
            const theCreature = creatures.get(key)
            const targetNum = theCreature.get('target')
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
            

            //TODO eat target if close enough
            if(targetNum > -1){
                const theTarget = food.get(targetNum)
                const fpos1 = theTarget.get('pos')
                const fpos = [fpos1[0]+foodSize/2, fpos1[1]+foodSize/2]
                const eatDist = dist(fpos, pos)
                const creRad = theCreature.get('rad')
                if(eatDist < creRad){
                    const prevScore = theCreature.get('score')
                    theCreature.set('score',prevScore+1)
                    if((prevScore+1)>creatures.get('highScore')){
                        creatures.set('highScore',prevScore+1)
                    }

                    var newRad = creRad*creatureGrowth;
                    if(newRad > creatureMaxRad){
                        newRad = creatureMaxRad
                        theCreature.set('breedCount', theCreature.get('breedCount')+1)
                        if(theCreature.get('breedCount') >= creatureBreedReq){
                            theCreature.set('breedCount',0)
                            creatures.get('clone')(theCreature)

                        }
                        
                    }
                    theCreature.set('rad', newRad)
                    food.delete(targetNum)
                    creatures.forEach((val,key3)=>{
                        if(!isNaN(key3)){
                            const clearCreature = creatures.get(key3)
                            const cctarg = clearCreature.get('target')
                            if(cctarg === targetNum){
                                clearCreature.set('target',-1)
                            }
                        }
                    })
                }
            }

            //find next target
            var closest = -1;
            var closestD = 99999999;
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
                const rotSpeed = theCreature.get('rotSpeed')
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

                const absdiff = abs(diffAngle)
                const direct = sign(diffAngle)
                var newDir = dir;

                if(absdiff >= rotSpeed){
                    newDir =  dir + direct*rotSpeed
                }else if ( absdiff > 0.0001 ){
                    newDir = dir + diffAngle
                }

                if(newDir != dir){
                    if(newDir < 0){newDir+=360}
                    if(newDir >=360){newDir-=360}
                    theCreature.set('dir',newDir)
                }

                //apply rotAccel
                if(absdiff > rotSpeed){
                    const rotAccel = theCreature.get('rotAccel')
                    const rotTopSpeed = theCreature.get('rotTopSpeed')
                    var newRotSpeed = rotSpeed
                    newRotSpeed+=rotAccel;
                    if(newRotSpeed<0){newRotSpeed = 0}
                    if(newRotSpeed>rotTopSpeed){newRotSpeed = rotTopSpeed}
                    theCreature.set('rotSpeed',newRotSpeed)
                }
            }

            //linear accelerate
            var newSpeed = theCreature.get('speed')+theCreature.get('accel')
            newSpeed = (newSpeed > theCreature.get('topSpeed'))? theCreature.get('topSpeed') : newSpeed
            theCreature.set('speed', newSpeed)

            //Starve creature
            theCreature.set('rad',theCreature.get('rad')*creatureStarve);
            if(theCreature.get('rad') < 1){
                console.log('creature', key, 'STARVED TO DEATH');
                const deadScore = theCreature.get('score');
                creatures.delete(key)
                if(deadScore >= creatures.get('highScore')){
                    //TODO find new highscore from remaining creatures
                    creatures.set('highScore',0)
                    var newHighScore = 0;
                    creatures.forEach((val,key4)=>{
                        if(!isNaN(key4)){
                            const cre = creatures.get(key4);
                            if(cre.get('score') > newHighScore){ newHighScore = cre.get('score')}
                        }
                    })
                    creatures.set('highScore', newHighScore)
                }
            }
        }
    })
})

creatures.set('clone',(which)=>{ //which is actual creature Map
    const num = creatures.get('last')
    const newCreature = new Map(which)
    newCreature.set('num', num)
    newCreature.set('target', -1)
    newCreature.set('targetPos', [0,0])
    newCreature.set('speed', 0)
    newCreature.set('rotSpeed',0)
    newCreature.set('score', 0)
    newCreature.set('breedCount',0)
    const oldpos = which.get('pos')
    const olddir = which.get('dir')
    const olddirrad = degToRad(olddir)
    newCreature.set('pos', [ oldpos[0]-5*cos(olddirrad), oldpos[1]-5*sin(olddirrad)])
    newCreature.set('dir', olddir +90 + random()*180)
    newCreature.set('gen', newCreature.get('gen')+1)
    newCreature.set('rad', creatureStartRad)
    creatures.get('mutate')(newCreature)
    creatures.set(num, newCreature)
    creatures.set('last', num+1)
})

creatures.set('mutate', (which)=>{ //which is actual creature Map
    var newTopSpeed = which.get('topSpeed')
    var newAccel = which.get('accel');
    var newRotTopSpeed = which.get('rotTopSpeed');
    var newRotAccel = which.get('rotAccel');

    newTopSpeed*=(1+randUpDown(topSpeedMut))
    newAccel*=(1+randUpDown(accelMut))
    newRotTopSpeed*=(1+randUpDown(rotTopSpeedMut))
    newRotAccel*=(1+randUpDown(rotAccelMut))

    which.set('topSpeed', newTopSpeed)
    which.set('accel', newAccel)
    which.set('rotTopSpeed', newRotTopSpeed)
    which.set('rotAccel', newRotAccel)
    console.log('creature',which.get('num'), 'mutated')
})

