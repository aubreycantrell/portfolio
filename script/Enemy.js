class Enemy extends Blob {
    side; // top, right, bottom, or left
    collided = false; 
    dom; 

    constructor() { 
        super();        
        this.color = random.color();  // Use the random color function
        this.diameter = random.intBetween(minRadius, maxRadius);  // Use the random size function
        this.setDOM();
        this.updateStyle();
    
}
    //which is invoked when a collision happens and it records that the enemy has collided with the player and informs the player of the fact. That is, it invokes the player's collide method (see above). Remember that the player object is stored in a global variable that is declared and initialized in Player.js.
    collide() {
        if (!this.collided) {
            this.collided = true;
            thePlayer.collide(this);
        }
    }

    // which updates the X and Y location of the center from the top/left CSS values. This is helpful when the animation moves the enemy and you need to update the location before testing for intersection with the player.
    updateLocation() {
        let left = parseInt(this.dom.css('left'), 10);
        let top = parseInt(this.dom.css('top'), 10);
        this.setX(left + this.getRadius());
        this.setY(top + this.getRadius());
    }

    //which checks for a collision. It's invoked during the animation of the movement of the enemy. The method first updates its location. Next it checks to see if this enemy has collided with the Player in the past and if so, skips any further processing. If it hasn't collided in the past, it checks to see if there is an intersection (using the intersects method above) and if so, invokes the collide method that we just discussed.
    maybeCollide() {
        this.updateLocation();

        if (!this.collided) {
            
            if (this.intersects(thePlayer)) {
                this.collide();
            }
        }
    }

    //which takes one argument, a string indicating which side of the screen the enemy is entering from. The argument is one of "top", "right", "bottom", and "left". The method sets the initial X,Y coordinates of the enemy, based on the side it enters from. It also records the side, as that makes the start method easier
    setSide(side) {
        this.side = side;
    
        const diameter = this.getDiameter();
        
        switch (side) {
            case 'top':
                this.setX(Math.random() * window.innerWidth);
                this.setY(-diameter);
                break;
            case 'right':
                this.setX(window.innerWidth + diameter);
                this.setY(Math.random() * window.innerHeight);
                break;
            case 'bottom':
                this.setX(Math.random() * window.innerWidth);
                this.setY(window.innerHeight + diameter);
                break;
            case 'left':
                this.setX(-diameter);
                this.setY(Math.random() * window.innerHeight);
                break;
            default:
                // Handle other cases or provide a default behavior
                break;
        }
    }

    //which starts the jQuery animation of this enemy moving across the board to its final X/Y value.
    start() {
        this.setSide(arrayElt(['left', 'right', 'top', 'bottom']));
        
        const fixedEndX = this.getEndX();
        const fixedEndY = this.getEndY();
        let animationProps = {};
        switch (this.side) {
            case 'left':
                animationProps = { left: window.innerWidth };
                break;
            case 'right':
                animationProps = { left: -this.getDiameter() };
                break;
            case 'top':
                animationProps = { top: window.innerHeight };
                break;
            case 'bottom':
                animationProps = { top: -this.getDiameter() };
                break;
            default:
                break;
        }


        this.dom.animate ( animationProps, { 
                duration: enemyDuration,
                step: () => this.maybeCollide(),
                complete: () => this.remove()
            }
        );
    
        console.log(`New Enemy! Side: ${this.side}, Initial: (${this.getX()}, ${this.getY()}), Destination: (${fixedEndX}, ${fixedEndY})`);
    }

    // stops the animation and removes this enemy from the board
    remove() {
        this.dom.stop();
        this.dom.remove();
    }

    setDOM() {
        this.dom = $("<div>").attr("class", "circle enemy");
        $("body").append(this.dom);
    }

    getEndX() {
        // Calculate the end X coordinate based on the side
        switch (this.side) {
            case 'top':
            case 'bottom':
                return this.getX();
            case 'right':
                return window.innerWidth;
            case 'left':
                return 0;
        }
    }

    getEndY() {
        // Calculate the end Y coordinate based on the side
        switch (this.side) {
            case 'top':
                return 0;
            case 'right':
            case 'left':
                return this.getY();
            case 'bottom':
                return window.innerHeight;
        }
    }

    intersects(other) {
        // Implementation of the intersects method (you may need to adjust this based on your Blob class implementation)
        var dx = this.getX() - other.getX();
        var dy = this.getY() - other.getY();
        var r1 = this.getRadius();
        var r2 = other.getRadius();
        var distance_squared = dx * dx + dy * dy;
        var rsum = r1 + r2;
        return distance_squared <= rsum * rsum;
    }

    getX() {
        return parseInt(this.dom.css('left'), 10) + this.getRadius();
    }

    getY() {
        return parseInt(this.dom.css('top'), 10) + this.getRadius();
    }

    setX(point) {
        this.dom.css("left", point - this.getRadius());
    }

    setY(point) {
        this.dom.css("top", point - this.getRadius());
    }

    getRadius() {
        return this.getDiameter() / 2;
    }

    getDOM() {
        return this.dom;
    }
}

/**
 * added Scott's test function to see how blobs supposed to move on screen
 * will be deleted @ final version
 * KW 12/04/23
 */

function testProgress() {
    $(".circle").remove();      // remove any prior blobs
    testBlob = new Enemy();
    testBlob.setX(100);
    testBlob.setY(100);
    $(testBlob.getDOM())
        .animate({ left: window.innerWidth },
                 { duration: 4000,
                   progress: function () {
                       testBlob.updateLocation();
                       console.log("x is now ",testBlob.getX());
                 }}
                 );                                  
}


//entry point (-diameter)
//diagonals
//