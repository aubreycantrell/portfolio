// game.js


var colors = ["AliceBlue","Aqua","Aquamarine","Bisque","Black","BlanchedAlmond",
//                  "Blue",
                  "BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","ForestGreen","Fuchsia","Gainsboro","Gold","GoldenRod","Green","GreenYellow","HotPink","IndianRed","Indigo","Khaki","Lavender","LawnGreen","LemonChiffon","LightBlue","Lime","LimeGreen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MistyRose","Moccasin","Navy","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna","Silver","SkyBlue","SlateBlue","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","Yellow","YellowGreen"];
    
    function intBelow(max) {
        return Math.floor(Math.random() * max);
    }

    function intBetween(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function arrayElt(array) {
        var index = intBelow(array.length);
        return array[index];
    }

    function color() {
        return arrayElt(colors);
    }



let thePlayer;
let intervalID;

var minRadius = 4;                   
var maxRadius = window.innerWidth/4; 
var enemyDuration = 5000;            

function launchEnemy() {
    // made const to hold the random color for the enemy blob
    const enemyColor = color()
    const randomRadius = intBetween(minRadius, maxRadius);
    const enemy = new Enemy(enemyColor,randomRadius);
    //testing if color and radius updates
    console.log(`New Enemy Alert! It's color is ${enemyColor} and it's radius is ${randomRadius}`)
    // Set random starting point
    const randomX = intBetween(0, window.innerWidth);
    const randomY = intBetween(0, window.innerHeight);
    enemy.setX(randomX);
    enemy.setY(randomY);

    // Start the enemy's animation
    enemy.start();
}

//starts all blobs and distribution of enemy objects
function startGame() {
    $(".circle").remove();
    $("#winOrLose").empty();
    $("#intro").remove();

    intervalID = setInterval(launchEnemy, 1000); //changed duration from enemyDuartion to 1500 so enemies come every 0.5 secs - kw

    thePlayer = new Player('blue', 15);
    thePlayer.addToGame();

    $(document).on('mousemove', function (evt) {
        const mouseX = evt.clientX;
        const mouseY = evt.clientY;
    
        if (thePlayer) {
            thePlayer.move(mouseX, mouseY);
        }
    });
}

//moved stopGame() to player class - kw 12/04/23


$(document).on('click', '#start', startGame);