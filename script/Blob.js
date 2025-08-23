class Blob { 
    dom; // Instance variable for the DOM element
    color; // Color of the blob
    diameter; // Diameter of the blob
    x; // X coordinate of the center
    y; // Y coordinate of the center

    constructor(color, diameter) {
        this.color = color; // Default color is gray
        this.diameter = (diameter * 2); // Default diameter is 200px
        this.setDOM();
        this.setX(0);
        this.setY(0);
    }
    
    //adds the blob to some container
    addToGame(container){
        //jquery ot append dom to container (probably body)
        $(container).append(this.getDOM())
    }

    //creates a DOM element and stores it in an instance variable
    setDOM() {
        this.dom = $("<div>").attr("class", "circle");
        $("body").append(this.dom);
        this.updateStyle();
    }
    // updates all style components of the blob, called in setDom()
    updateStyle() {
        this.dom.css({
            "background-color": this.color,
            "width": this.diameter + "px",
            "height": this.diameter + "px",
            "top": (this.y - this.getRadius()) + "px",
            "left": (this.x - this.getRadius()) + "px",
            
        });
    }
    //sets the appropriate instance variable(s) and also updates the DOM element's width, height, left and top properties
    setDiameter(diameter) {
        this.diameter = diameter;
        this.updateStyle();
    }

    //sets the radius instance variable(s)
    setRadius(radius) {
        this.setDiameter(2 * radius);
    }

    //returns the current color
    getColor() {
        return this.color;
    }

    //returns the DOM element stored in the instance variable
    getDOM() {
        return this.dom;
    }

    //returns the diameter
    getDiameter() {
        return this.diameter;
    }

    //returns the radius
    getRadius() {
        return this.diameter / 2;
    }

    //return the x coordinate of the center
    getX() {
        return this.x;
    }

    //return the y coordinates of the center
    getY() {
        return this.y;
    }

    //change the x coordinate of the center and also update the position of the DOM element by setting left or top.
    setX(point) {
        this.x = point;
        this.updateStyle();
    }
    //change the y coordinates of the center and also update the position of the DOM element by setting left or top.
    setY(point) {
        this.y = point;
        this.updateStyle();
    }
    
    //checks location of the blob
    location(){
        let x = this.getX();
        let y = this.getY();
        let left = parseInt(this.getDOM().css('left'),10);
        let top = parseInt(this.getDOM().css('top'),10);
        let r = this.getRadius();
        let xok = (left+r==x) ? "X OK" : "X WRONG";
        let yok = (top+r==y) ? "Y OK" : "Y WRONG";
        return `radius ${r} center (${x},${y}) w/ DOM elt (${left},${top}): ${xok}, ${yok}`;
    }

    //checks for interscetion
    intersects (other) {
    // six uses of the 'isNum' function to make sure all values are defined
        const dx = isNum(this.getX()) - isNum(other.getX());
        const dy = isNum(this.getY()) - isNum(other.getY());
        const r1 = isNum(this.getRadius());
        const r2 = isNum(other.getRadius());

        // finally, some real computation
        const distance_squared = (dx * dx + dy * dy);

        const rsum = r1+r2;
        const isCloser = (distance_squared <= rsum*rsum);
        return isCloser;
    }

    // uses inputs to set new x and y coordinates of blob
    move(x, y) {
        this.setX(x);
        this.setY(y);
    }

    //grows the radius of the blob by the parameter amount of pixels
    grow(growRadius){
        //use diameter to make radius
        const k = this.getDiameter()
        const newDiameter = k + (2* growRadius) // adds new diameter to current one
        this.setDiameter(newDiameter)
    }

    //shrinks the radius of the blob by the parameter amount of pixels
    shrink(shrinkRadius){
        const k = this.getDiameter()
        const newDiameter = k - (2 * shrinkRadius)
        this.setDiameter(newDiameter)
    }
    //invoked when a collision happens: that is, when an enemy says "I got you". It takes the enemy blob as an argument and either grows or shrinks the player as appropriate
    collide(enemy){
        const playerRad = this.getRadius()
        const enemyRad = enemy.getRadius()

        if (playerRad > enemyRad ){ //if player defeats enemy
            this.grow(enemyRad)
        }else{
            this.shrink(enemyRad)
        }
    }

}

//determine intersection
function isNum(val) {
    if( typeof val === 'number' ) {
        return val;
    } else {
        throw new Error('value is not a number');
    }
}


