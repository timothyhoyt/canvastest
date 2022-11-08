////////////////
//globals
////////////////

//primary elements
const maindiv = document.getElementsByTagName('main')[0]; const canvas = document.createElement('canvas');

const selectPage = document.getElementById('select')
const setupPage = document.getElementById('setup')
const familiesPage = document.getElementById('families')
const membersPage = document.getElementById('members')
const creaturePage = document.getElementById('creature')

var selectedPage = selectPage
selectedPage.style.display = "flex"


const ctx = canvas.getContext("2d"); const menudiv = document.getElementById('theMenu')
const cfpsdiv = document.getElementById('cfps')
const dfpsdiv = document.getElementById('dfps')
const familiesStats = document.getElementById('familiesStats')

const hideButton = document.getElementById('hideButton');
const menuButton = document.getElementById('menuButton')

const setupButton = document.getElementById('setupButton');
const familiesButton = document.getElementById('familiesButton');
const membersButton = document.getElementById('membersButton');
const creatureButton = document.getElementById('creatureButton');

const startButton = document.getElementById('startButton');

const familySlider = document.getElementById('familyCountSlider')
const familyNumDiv = document.getElementById('familyCountNumber')
const foodStartSlider = document.getElementById('foodStartCountSlider')
const foodStartNumDiv = document.getElementById('foodStartCountNumber')
const starveRateSlider = document.getElementById('starveRateSlider')
const starveRateNumDiv = document.getElementById('starveRateNumber')


const foodRateSlider = document.getElementById('foodRateSlider')
const foodRateNumDiv = document.getElementById('foodRateNumber')
const foodBreedSlider = document.getElementById('foodBreedCountSlider')
const foodBreedNumDiv = document.getElementById('foodBreedCountNumber')
const mutationRateSlider = document.getElementById('mutationRateSlider')
const mutationRateNumDiv = document.getElementById('mutationRateNumber')



//universal constants
const CC = [ 'rgba(100,200,255,0.50)', 'rgba(100,100,255,0.50)', 'rgba(100,50,200,0.50)', 'rgba(50,100,255,0.50)'
    ,'rgba(100,200,255,0.25)', 'rgba(100,100,255,0.25)', 'rgba(100,50,200,0.25)', 'rgba(50,100,255,0.25)']
const startTime = new Date();

//universal variables
var marg, brect, dvp, cAR, wWidth, wHeight, cWidth, cHeight, mcX, mcY, mX, mY, mcdX, mcdY, mdX, mdY, mcuX, mcuY, muX, muY;
var mouseDownCan = false; var orien = "horizontal"; var menuHidden = false;
var firstFrame = true; 
var cfps = 0; var dfps = 0; var cfpsframe = 0; var dfpsframe = 0;
var clastLapse = 0; var dlastLapse = 0;

