window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded() {
    canvasApp();
}

function canvasApp() {
    var C_RESTITUTION = 0.8;
    C_RESTITUTION = 1;

    var Vector = function Vector(x, y, move_x, move_y) {
        this.x = x;
        this.y = y;
        var c = Math.sqrt(move_x*move_x + move_y*move_y);
        this.move_x = move_x / c;  // should be stored as a regularized x value
        this.move_y = move_y / c;  // should be stored as a regularized y value
        this.next_x = move_x;  // used when update is called on the vector, so move_x = next_x
        this.next_y = move_y;  // used when update is called on the vector, so move_y = next_y
    };
    Vector.prototype.nextPosition = function(velocity) {
        this.x += velocity * this.move_x;
        this.y += velocity * this.move_y;
    };
    Vector.prototype.reflect = function(run, rise) {  // reflects the slope of the particle over the slope given
        var theta = Math.atan(rise / run);
        var phi = Math.atan(rise / run);
        var alpha = phi - theta;
        this.next_y = Math.sin(phi + alpha);
        this.next_x = Math.cos(phi + alpha);
    };
    Vector.prototype.update = function() {
        this.move_x = this.next_x;
        this.move_y = this.next_y;
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
        //var this_velocity = ((this.velocity * (this.mass - other.mass)) +
        //                    (2 * other.mass * other.velocity)) /
        //                    (this.mass + other.mass);
        //var other_velocity = ((other.velocity * (other.mass - this.mass)) +
        //                     (2 * this.mass * this.velocity)) /
        //                     (this.mass + other.mass);
        var this_velocity = ((this.velocity * (this.mass - (C_RESTITUTION * other.mass))) +
                            ((C_RESTITUTION + 1) * other.mass * other.velocity)) /
                            (this.mass + other.mass);
        var other_velocity = ((other.velocity * (other.mass - (C_RESTITUTION * this.mass))) +
                             ((C_RESTITUTION + 1) * this.mass * this.velocity)) /
                             (this.mass + other.mass);
        this.velocity = this_velocity;
        other.velocity = other_velocity;
    };
    Particle.prototype.move = function() {
        this.vector.update();
        this.vector.nextPosition();
    };

    //var Clump = function() {
    //    this.particles = [];
    //};
    //Clump.prototype.addParticle = function(particle) {};
    //Clump.prototype.order = function() {};



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
