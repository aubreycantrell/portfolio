class Player extends Blob {
    //global variable for player 
    //thePlayer;
    winningRadius = window.innerHeight / 4; // Bigger than this wins
    losingRadius = 5; // Smaller than this loses
    growRadius = 10;
    shrinkRadius = 2.5;
    //variables for stop game
    win = "You Win! You've Defeated the EVIL BLOBS!";
    lose = "Boo You Lost :/";

    constructor(color, diameter) {
        super(color, diameter); // super from blob class
        //this.setDOM()
    }

    move(x, y) {
        this.setX(x);
        this.setY(y);
    }

    grow() {
        if (this.getRadius() < this.winningRadius) {
            this.setRadius(this.getRadius() + this.growRadius);
        }
    }

    shrink() {
        if (this.getRadius() > this.losingRadius) {
            this.setRadius(this.getRadius() - this.shrinkRadius);
        }
    }

    collide(enemy) { 
        if (enemy.getRadius() > this.getRadius()) {
            this.shrink();
            if (this.getRadius() <= this.losingRadius) { //checks radius immediately after shrinking - kw
                stopGame("lose"); //invokes stop game
            } 
        } else {
            this.grow();
            enemy.remove(); // removes enemy when eaten - kw
            if(this.getRadius() > this.winningRadius){ //checks radius immediately after growing - kw
                stopGame("win");
            }
        }

        
    }
}

//moved stopGame(result) to player class - kw 12/04
//gotta edit to fit guidlines but her is some pseudocode - kw
function stopGame(result) {                                                                   
    clearInterval(intervalID); //stops new enemies

    //stops all circles
    $(".circle").stop();

    //conditional to show result based on whether player won or lost. inputs result in the winOrLose dive
    if (result === "lose") {
        $("#winOrLose").text("You lose!"); // Set the text content for losing
    }

    if (result === "win") {
        $("#winOrLose").text("You win!"); // Set the text content for winning
    }

}