window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded() {
    canvasApp();
}

function canvasApp() {
    var MOMENTUM_TRANSFER_RATE = 0.8;  // the rate only applies to the momentum difference, not the full momentum

    var Vector = function Vector(x, y, move_x, move_y) {
        this.x = x;
        this.y = y;
        var c = Math.sqrt(move_x*move_x + move_y*move_y);
        this.move_x = move_x / c;  // should be stored as a regularized x value
        this.move_y = move_y / c;  // should be stored as a regularized y123123 value
    };
    Vector.prototype.nextPosition = function(momentum) {
        this.x += momentum * this.move_x;
        this.y += momentum * this.move_y;
    };
    Vector.prototype.reflect = function(run, rise) {  // reflects the slope of the particle over the slope given
        var theta = Math.atan(rise / run);
        var phi = Math. atan(rise / run);
        var alpha = Math.abs(theta - phi);
        this.move_y = Math.sin(theta - alpha);
        this.move_x = Math.cos(theta - alpha);
    };

    var Particle = function Particle(vector, velocity, mass, radius) {
        this.vector = vector;
        this.velocity = velocity;
        this.mass = mass;
        this.radius = radius;
    };
    Particle.prototype.collide = function(other) {
        var rise = -(other.x - this.x);
        var run = other.y - this.y;
        this.reflect(run, rise);
        other.reflect(run, rise);
        
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
