window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded() {
    canvasApp();
}

function canvasApp() {
    var MOMENTUM_TRANSFER_RATE = 0.8;  // the rate only applies to the momentum difference, not the full momentum

    var Vector = function Vector(x, y, move_x, move_y) {
        this.x = x;
        this.y = y;
        this.move_x = move_x;
        this.move_y = move_y;
    };
    Vector.prototype.nextPosition = function(momentum) {
        var c = math.sqrt((move_x * move_x) + (move_y * move_y));
        var new_x = momentum * ((x * c) / c);
        var new_y = momentum * ((y * c) / c);
    };
    Vector.prototype.reflect = function(run, rise) {

    };

    var Particle = function Particle(vector, momentum, mass, radius) {
        this.vector = vector;
        this.momentum = momentum;
        this.mass = mass;
        this.radius = radius;
    };
    Particle.prototype.collide = function(other) {

    };



    drawScreen();

    function drawScreen() {
        var space = document.getElementById("space");
        if(!space || !space.getContext) {
            return;
        }
        var context = space.getContext("2d");
        context.fillStyle = "#ff0000";
        context.fillRect(0, 0, 500, 300)
    }
}
