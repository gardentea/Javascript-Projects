var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var mouse = {
    xLat: undefined,
    yLong: undefined
}

var maxRadius = 60;

window.addEventListener('mousemove', function(event)
{
    mouse.xLat = event.x;
    mouse.yLong = event.y;
})

window.addEventListener('resize', function(event)
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

var colorArray = [
    '#59535E',
    '#FAEEFF',
    '#F1BAF3',
    '#5D4970',
    '#372049'
];

function Circle(xLat, yLong, xVel, yVel, radius)
{
    this.xLat = xLat;
    this.yLong = yLong;
    this.xVel = xVel;
    this.yVel = yVel;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor((Math.random() * colorArray.length) + 1)];

    this.draw = function()
    {
        c.beginPath();
        c.arc(this.xLat, this.yLong, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function()
    {
        if (this.xLat + this.radius > canvas.width || this.xLat - this.radius < 0)
        {
            this.xVel = -this.xVel;
        }
        if (this.yLong + this.radius > canvas.height || this.yLong - this.radius < 0)
        {
            this.yVel = -this.yVel;
        }

        this.xLat += this.xVel;
        this.yLong += this.yVel;

        if ((mouse.xLat - this.xLat < 25) && (mouse.xLat - this.xLat > -25) && (mouse.yLong - this.yLong < 25) && (mouse.yLong - this.yLong > -25))
        {
            if (this.radius < maxRadius)
            {
                this.radius += 1;
            }
        }
        else if (this.radius > this.minRadius)
        {
            this.radius -= 0.5;
        }

        this.draw();
    }
}

var circleArray = [];

function init()
{
    circleArray = [];

    for (var i = 0; i < 40; i++)
    {
        randomizeAllValues();
        circleArray[i].draw();
    }
}

function animate()
{
    c.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

function randomizeAllValues()
{
    var radius = Math.floor((Math.random() * 15) + 1);
    var xLat = Math.random() * (canvas.width - radius * 2) + radius;
    var yLong = Math.random() * (canvas.height - radius * 2) +radius;
    var xVel = Math.random() * 2.5;
    var yVel = Math.random() * 2.5;

    circleArray.push(new Circle(xLat, yLong, xVel, yVel, radius));
}

init();
animate();
