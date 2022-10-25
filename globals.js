////////////////
//globals
////////////////

//primary elements
const maindiv = document.getElementsByTagName('main')[0]; const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d"); const menudiv = document.getElementById('theMenu')
const cfpsdiv = document.getElementsByClassName('cfps')[0]
const dfpsdiv = document.getElementsByClassName('dfps')[0]

//universal constants
const CC = [ 'rgba(100,200,255,0.50)', 'rgba(100,100,255,0.50)', 'rgba(100,50,200,0.50)', 'rgba(50,100,255,0.50)'
    ,'rgba(100,200,255,0.25)', 'rgba(100,100,255,0.25)', 'rgba(100,50,200,0.25)', 'rgba(50,100,255,0.25)']
const startTime = new Date();

//universal variables
var  brect, dvp, cAR, wWidth, wHeight, cWidth, cHeight, mcX, mcY, mX, mY, mcdX, mcdY, mdX, mdY, mcuX, mcuY, muX, muY;
var mouseDownCan = false; var orien = "horizontal"; var firstFrame = true; 
var cfps = 0; var dfps = 0; var cfpsframe = 0; var dfpsframe = 0;
var clastLapse = 0; var dlastLapse = 0;

