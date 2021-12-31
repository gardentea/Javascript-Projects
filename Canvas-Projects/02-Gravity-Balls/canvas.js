// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth - 6;
canvas.height = innerHeight - 6;

// Variables
var mouse = {
    xLat: innerWidth / 2,
    yLong: innerHeight / 2
}

var colorArray = [
    '#002433',
    '#205266',
    '#618999',
    '#BDC7CC',
    '#FFD7AE'
];

var gravity = 0.2;

// Event Listeners
addEventListener('mousemove', function(event)
{
    mouse.xLat = event.clientX;
    mouse.yLong = event.clientY;
});

addEventListener('resize', function()
{
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener('click', function(event)
{
    init();
});

// Utility Functions

function randomIntFromRange(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors)
{
    return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
function Circle(xLat, yLong, xVel, yVel, radius, kineticLoss, color)
{
    this.xLat = xLat;
    this.yLong = yLong;
    this.xVel = xVel;
    this.yVel = yVel;
    this.radius = radius;
    //this.minRadius = radius;
    this.kineticLoss = kineticLoss;
    this.color = color;

    this.update = function()
    {
        if (this.yLong + this.radius + this.yVel > canvas.height)
        {
            this.yVel = -this.yVel;
            this.yVel = this.yVel * this.kineticLoss;
            this.xVel = this.xVel * this.kineticLoss;
        } else {
            this.yVel += gravity;
        }

        if (this.xLat + this.radius >= canvas.width || this.xLat - this.radius <= 0)
        {
            this.xVel = -this.xVel * this.kineticLoss;
        }

        this.xLat += this.xVel;
        this.yLong += this.yVel;

        this.draw();

        /*if ((mouse.xLat - this.xLat < 25) && (mouse.xLat - this.xLat > -25) && (mouse.yLong - this.yLong < 25) && (mouse.yLong - this.yLong > -25))
        {
            if (this.radius < maxRadius)
            {
                this.radius += 0.1;
            }
        }
        else if (this.radius > this.minRadius)
        {
            this.radius -= 0.1;
        }*/
    };

    this.draw = function()
    {
        c.beginPath();
        c.arc(this.xLat, this.yLong, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    };
}

// Implementation
var ballArray = [];

function init()
{
    ballArray = [];
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 100; i++)
    {
        var radius = randomIntFromRange(10, 20);
        var xLat = randomIntFromRange(radius, canvas.width - radius);
        var yLong = randomIntFromRange(radius, canvas.height - radius);
        var xVel = randomIntFromRange(-3, 3);
        var yVel =  randomIntFromRange(-2, 2);
        var kineticLoss = randomIntFromRange(92, 94) / 100;

        ballArray.push(new Circle(xLat, yLong, xVel, yVel, radius, kineticLoss, randomColor(colorArray)));
        ballArray[i].draw();
    }
}

// Animation Loop
function animate()
{
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

/*function attract()
{

    for (var i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}*/

init();
animate();
