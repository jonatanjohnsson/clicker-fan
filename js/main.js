/*========= VARIABLES ======*/
var tf = 0;         //total fans
var fans = 0;       //current fans
var fpc = 0.1;        //fans per click
var fps = 0;        //fans per second

/*========== Upgrades constructor and Upgrades ==============*/

function Upgrade(name, id, textId, flavor, fps, fpsId, cost, costId, appears, owned, ownedId, image, built) {
    this.name = name;           //name of the upgrade
    this.id = id;               //id of the upgrade
    this.textId = textId;       //id of the upgrade's textbox
    this.flavor = flavor;       //flavor text of the upgrade
    this.fps = fps;             //how much fps the upgrade gives
    this.fpsId = fpsId;         //id of the upgrade's fps-text
    this.cost = cost;           //cost of the upgrade
    this.costId = costId;       //id of the upgrade's cost-text
    this.appears = appears;     //when the upgrade becomes available
    this.owned = owned;         //how many owned
    this.ownedId = ownedId;     //id of the owned number
    this.image = image;         //location of the upgrade's image
    this.built = built;         //check if element has been built and drawn to the screen

}

var Chord = new Upgrade("Learn a new chord", "chord-upg", "chord-upg-txt", "Expand your guitar skills by learning a new chord!", 0.1, "chord-fpsId", 1, "chord-costId", 4, 0, "chord-ownedId", "img/upg-chord.png", false);
var Song = new Upgrade("Write a new song", "song-upg", "song-upg-txt", "Increase your repertoire with a new song!", 0.5, "song-fpsId", 40, "song-costId", 30, 0, "song-ownedId" ,"img/upg-song.png", false);
var Charisma = new Upgrade("Work on your charisma", "char-upg", "char-upg-txt", "Become more charming!", 2, "char-fpsId", 150, "char-costId", 200, 0, "char-ownedId", "img/upg-charisma.png", false);
var Cassette = new Upgrade("Release a compact cassette", "cassette-upg", "cassette-upg-txt", "Gather your music on an old school cassette for your fans to buy.", 5, "cassette-fpsID", 500, "cassette-costId", 500, 0, "cassette-ownedId", "img/upg-cassette.png", false);
var Interview = new Upgrade("Do an interview", "interview-upg", "interview-upg-txt", "Be interviewed by a journalist about your music.", 10, "interview-fpsID", 1600, "interview-costId", 1000, 0, "interview-ownedId", "img/upg-interview.png", false);

var upgrades = [Chord, Song, Charisma, Cassette, Interview];

/*========== Powerups constructor and Powerups ==============*/

function Powerup(name, id, img, flavor, cost, costId, appears, fpc, built) {
    this.name = name;           //name of the powerup
    this.id = id;               //id of the powerup
    this.img = img;             //img link of the powerup
    this.flavor = flavor;       //flavor text of the powerup
    this.cost = cost;           //cost of the powerup
    this.costId = costId;       //id of the powerup's cost text
    this.appears = appears;     //when the powerup appears
    this.fpc = fpc;             //how much fpc the powerup gives
    this.bought = 0;            //if powerup is bought already
}

var CoolHat = new Powerup("Cool hat", "coolHat-pwrup", "img/pwrup-hat.png", "A cool hat for a more rocky appearance", 50, "coolHat-pwrup-costId", 10, 0.1, false);
var Fender = new Powerup("A Fender guitar", "fender-pwrup", "img/pwrup-fender.png", "A fancy guitar", 100, "fender-pwrup-costId", 100, 0.2, false);


var powerups = [CoolHat, Fender];


/*=================== Tweep constructor and tweeps ===================*/

function Tweep(name, id, username, img, text, appears) {
    this.name = name;           //name of the tweeper
    this.id = id;               //id of the tweep
    this.username = username;   //@username of the tweeper
    this.img = img;             //if the user has a picture
    this.text = text;           //the tweep's text
    this.appears = appears;     //when the tweep appears in the feed
    this.written = false;     //has the tweep already been shown?
}

var FirstTweep = new Tweep("Kelly McFallon", "kellyMcFallonTweep", "@Kfallcon", "#", "So I saw this guy playing guitar on my way to work, god he sucked #getgood", 1);
var SecondTweep = new Tweep("Arthur Grimridge", "arthurGrimridgeTweep", "@thatoldsod48", "#", "What the hell is that racket on the street??", 4);
var ThirdTweep = new Tweep("Tanya Dickinson", "tanyaDickinsonTweep", "@tanyaflower_92", "#", "Passed a really #cute guy playing #guitar on the street. Gave him a dollar and a #wink!", 20);
var FourthTweep = new Tweep("Ulrich Strauss", "ulrichStraussTweep", "@immerblau", "#", "USA is amazing! Loving it here. But - these street musicians really need to step it up #awful", 50);


var tweeps = [FirstTweep, SecondTweep, ThirdTweep, FourthTweep];

/*=========== TIMER with update functions ======================*/

var timer = setInterval(updateGame, 100);     //Updates the number of fans continuously, and checks for available upgrades etc.
var fpsTimer = setInterval(addFps, 1000);     //each second adds fans according to fps

function updateGame(){                         //Updates the number of fans continuously, and checks for available upgrades etc.
    $("#counter").text(Math.round( fans * 10 ) / 10);
    $("#fpsCounter").text("fps: " + Math.round( fps * 10 ) / 10);
    $("#tfCounter").text("tf: " + Math.round( tf * 10 ) / 10);

    for(var i = 0; i < upgrades.length; i++) {
        if(tf >= upgrades[i].appears && upgrades[i].built === false){
            buildUpgrade(upgrades[i]);
        }
    }
    for(var j = 0; j < powerups.length; j++){
        if(tf >= powerups[j].appears && powerups[j].built === false){
            buildPowerup(powerups[j]);
        }

        if(fans >= powerups[j].cost){
            $("#" + powerups[j].costId).css("color", "#54BE68");
        }
        else {
            $("#" + powerups[j].costId).css("color", "red");
        }
    }
    for(var k = 0; k < upgrades.length; k++) {
        if(fans >= upgrades[k].cost && upgrades[k].owned != "none"){
            $("." + upgrades[k].textId).css("color", "#54BE68");
        }
        else {
            $("." + upgrades[k].textId).css("color", "red");
        }
    }

    for(var l = 0; l < tweeps.length; l++){
        if(tf >= tweeps[l].appears && tweeps[l].written === false){
            buildTweep(tweeps[l]);
        }
    }
}

function buildUpgrade(upgrade){                 //Adds the upgrade to the DOM
    // upgrade.owned = 0;
    $(".upgrade").append(
        '<a href="#" id=' + upgrade.id + ' class="list-group-item tooltipx">' +
            '<img class="bubble-speech" src="' + upgrade.image + '" style="display: inline-block; float: left; background-color: lightblue; width: 60px; height:60px; margin-right: 10px;"> </img>' +
            '<h5 class="list-group-item-heading" style="margin-top: 10px;">' + upgrade.name + '</h5>' +
            '<p class="list-group-item-text ' + upgrade.textId + '">' + 'Cost: ' + upgrade.cost + '</span> fans </p>' +
            '<h6 id=' + upgrade.ownedId + ' style="float: right; top: -16px; position: relative; margin-right: 10px;">' + upgrade.owned + '</h6>' +
            '<span>' +
            '<p style="font-family: Helvetica, Arial, sans-serif; font-style: italic; font-size: 14px; margin-bottom: 4px; margin-right: 10px;">' + upgrade.flavor + '</p>' +
            '<hr>' +
            '<p class="list-group-item-text ' + upgrade.textId + '" style="font-size: 9px">' + 'Cost: ' + upgrade.cost + '</span> fans, </p>' +
            '<p id=' + upgrade.fpsId + ' class="list-group-item-text" style="font-size: 9px"> Fans per second: +' + upgrade.fps + '</p>' +
            '</span>' +
        '</a>');

    upgrade.built = true;
    clickUpgrade(upgrade);
}

function buildPowerup(powerup){                 //Adds a powerup to the DOM
    //powerup.bought = 1;
    powerup.built = true;
    $("#powerUps").append(
      '<div id="' + powerup.id + '" class="powerUp-item bubble-speech" style="cursor: pointer;">' +
          '<a href="#" class="tooltipz">' +
          '<img src="' + powerup.img + '" style="display: inline-block; width: 60px; height: 60px;">' +
          '<span>' +
          '<p style="font-family: Helvetica, Arial, sans-serif; font-style: italic; font-size: 14px; margin-bottom: 4px; margin-right: 10px;">' + powerup.flavor + '</p>' +
          '<hr>' +
          '<p id="' + powerup.costId + '" class="list-group-item-text" style="font-size: 9px">Cost: ' + powerup.cost + ' fans</p>' +
          '<p class="list-group-item-text" style="font-size: 9px">Fans per click: +' + powerup.fpc + '</p>' +
          '</span>' +
          '</a>' +
      '</div>'
    );

    clickPowerup(powerup);
}


function buildTweep(tweep){
    tweep.written = true;
    $(".sidebar-nav").prepend(
        '<div class="tweep" id="' + tweep.id + '">' +
            '<img class="tweepImg" src="' + tweep.img + '"> </img>' +
            '<h6 class="tweepName">' + tweep.name + '<span class="username"> ' + tweep.username + '</span></h6>' +
            '<p>' + tweep.text + '</p>' +
        '<div>'
    );
}

function addFps(){
    fans = fans + fps;
    tf = tf + fps;
}

/*================= CLICK THE ARTIST CANVAS ==============================*/

$("#canvas").on("click", function(){       //each click adds fans according to fpc
    fans = fans + fpc;
    tf = tf + fpc;

    $("#counter").text(Math.round( fans * 10 ) / 10);

});

/*==================== CLICK an upgrade =====================*/


function clickUpgrade(upgrade) {
    $(".list-group").on("click", ("#" + upgrade.id) , function () {
        if(fans >= upgrade.cost) {
            fans = fans - upgrade.cost;
            fps = fps + upgrade.fps;
            upgrade.owned += 1;
            upgrade.cost = Math.ceil(upgrade.cost * 1.5);
            $("." + upgrade.textId).text("cost: " + upgrade.cost + "fans");
            $("#" + upgrade.ownedId).text(upgrade.owned);
        }

    });

}

/*==================== CLICK a powerup =====================*/

function clickPowerup(powerup) {
    $("#powerUps").on("click", ("#" + powerup.id) , function() {
        if(fans >= powerup.cost) {
            fans = fans - powerup.cost;
            fpc = fpc + powerup.fpc;
            $("#" + powerup.id).remove();
            powerup.bought = 1;
        }
    })
}


/*=================== CANVAS ANIMATIONS AND SHIT ===================*/

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


var imageObj1 = new Image();
var imageObj2 = new Image();
var imageObj3 = new Image();
var imageObj4 = new Image();

imageObj1.onload = function(){
        context.drawImage(imageObj1, 0, 0);
        context.drawImage(imageObj2, 0, 0);
        context.drawImage(imageObj3, 0, 0);
        context.drawImage(imageObj4, 0, 0);
};

imageObj1.src = "img/fan1.png";
imageObj2.src = "img/fan2.png";
imageObj3.src = "img/fan3.png";
imageObj4.src = "img/fan4.png";

var reqAnimFrame = window.requestAnimationFrame;

//Array for the +1's

var plusFpcArr = [];
var canvasFanArr = [];

//Constructor for the +1's
function PlusFpc(x, y, height, width) {
    this.x = x + Math.random() * 50;
    this.y = y;
    this.height = height;
    this.width = width;
    this.alpha = 1.0;
    this.font = "20pt Fipps-Regular";
    this.text = "+ " + (Math.round( fpc * 10 ) / 10);

}

PlusFpc.prototype.update = function(){        //how to animate each +1

    context.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
    context.font = this.font;
    context.fillText(this.text, this.x, this.y);
    this.alpha = this.alpha - 0.008;
    this.y += -2;

};

function CanvasFan(x, y, height, width, image, appears, animation) {    //Constructor for each fan on the canvas
    this.x = x + (getRandomInt(20, 380));
    this.y = (y + 200) + (getRandomInt(1, 140));
    this.height = height;
    this.width = width;
    this.image = getRandomInt(1,5);
    this.appears = appears;
    this.animation = animation;
    this.shown = false;
}

function canvasFanAppearances () {
    var canvasFanAppears = 1;
    for(i = 1; i < 50; i++) {
        var canvasFan = new CanvasFan(0, 0, 40, 40, "#", canvasFanAppears, "none");
        canvasFanArr.push(canvasFan);

        canvasFanAppears = canvasFanAppears * 1.6;
    }
}

canvasFanAppearances();

CanvasFan.prototype.createFan = function() {        //how to animate each fan
    //context.fillStyle = "red";
    //context.fillRect(this.x, this.y, this.width, this.height);

    if(this.image == 1){
        context.drawImage(imageObj1, this.x, this.y);
    }
    else if(this.image == 2){
        context.drawImage(imageObj2, this.x, this.y);
    }
    else if(this.image == 3){
        context.drawImage(imageObj3, this.x, this.y);
    }
    else {
        context.drawImage(imageObj4, this.x, this.y);
    }
};

reqAnimFrame(update);

function update(){
    context.clearRect(0, 0, 400, 400);

    for(var j = 0; j < canvasFanArr.length; j++){
        if (tf >= canvasFanArr[j].appears) {
            var canvasFan = canvasFanArr[j];
            canvasFan.createFan();
        }
    }

    for(var i = 0; i < plusFpcArr.length; i++){

        var onePlusFpc = plusFpcArr[i];
        onePlusFpc.update();
        if(plusFpcArr.length > 15){
            plusFpcArr.shift();
        }
    }

    reqAnimFrame(update);
}

canvas.addEventListener("click", function(e) {

    createFpcAnimation(e.offsetX, e.offsetY);
});

function createFpcAnimation(x, y){

    var plusFpc = new PlusFpc(x, y, 40, 40);
    plusFpcArr.push(plusFpc);
}


/*=================== RRRRANDOM ===================*/

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/*=================== BUTTON =======================*/

$("#welcomeButton").click(function(){
    $("#welcomeBox").fadeOut("slow");
});

/*========== Set up variables and persistance stuff ==============*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function isCookieSet(cname) {
    return (getCookie(cname).length > 0) ? true : false;
}

function saveGame() {
    // Persist data for a maximum of 100 days
    setCookie("clickerfan-tf", tf, 100);
    setCookie("clickerfan-fans", fans, 100);
    setCookie("clickerfan-fpc", fpc, 100);
    setCookie("clickerfan-fps", fps, 100);
    setCookie("clickerfan-upgrades", JSON.stringify(upgrades), 100);
    setCookie("clickerfan-powerups", JSON.stringify(powerups), 100);

    /*
    console.log("saving tf = " + tf);
    console.log("saving fans = " + fans);
    console.log("saving fpc = " + fpc);
    console.log("saving fps = " + fps);
    console.log("saving upgrades = " + JSON.stringify(upgrades));
    */
}

function loadGame() {
    // The vars are already set to 0; only load if there are cookies present
    // Load total fans
    if(isCookieSet("clickerfan-tf")) {
        tf = parseFloat(getCookie("clickerfan-tf"));
        // console.log("tf = " + tf);
    }
    
    // Load current fans
    if(isCookieSet("clickerfan-fans")) {
        fans = parseFloat(getCookie("clickerfan-fans"));
        // console.log("fans = " + fans);
    }

    // Load fans per click
    if(isCookieSet("clickerfan-fpc")) {
        fpc = parseFloat(getCookie("clickerfan-fpc")); 
        // console.log("fpc = " + fpc);
    }

    // Load fans per second
    if(isCookieSet("clickerfan-fps")) {
        fps = parseFloat(getCookie("clickerfan-fps")); 
        // console.log("fps = " + fps);
    }

    // Load bought upgrades
    if(isCookieSet("clickerfan-upgrades")) {
        upgrades = JSON.parse(getCookie("clickerfan-upgrades"));
        // console.log(upgrades);
    }

    if(isCookieSet("clickerfan-powerups")) {
        powerups = JSON.parse(getCookie("clickerfan-powerups"));
        console.log(powerups);
    }
}

function resetGame() {
    // Persist data for 0 days 
    setCookie("clickerfan-tf", tf, -1);
    setCookie("clickerfan-fans", fans, -1);
    setCookie("clickerfan-fpc", fpc, -1);
    setCookie("clickerfan-fps", fps, -1);
    setCookie("clickerfan-upgrades", upgrades, -1);
    setCookie("clickerfan-powerups", powerups, -1);
}

$(document).ready(function() {
    // console.log("Loading game state now!");
    //resetGame();
    loadGame();
    
    for(var i = 0; i < upgrades.length; i++) {
        upgrades[i].built = false;
        //console.log(upgrades[i].name + ": " + upgrades[i].owned);
    }

    for(var i = 0; i < powerups.length; i++)
    {
	if (powerups[i].bought !== 1)
	    powerups[i].built = false;
    }
    
    $(window).on('beforeunload', function() {
        // console.log("Saving game state now!");
        saveGame();
    });
});
