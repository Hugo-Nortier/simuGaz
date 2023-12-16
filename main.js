//canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var molecules = [];

function drawMolecule() {
    for (let i = 0; i < molecules.length; i++) {
        molecules[i].draw(ctx);
    }
}

function collisionBord() {
    for (let i = 0; i < molecules.length; i++) {
        molecules[i].wallCollision(canvas);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkCollisions();
    drawMolecule();
    collisionBord();
    //slider();
}

setInterval(draw, 10); //définition de la taille de balle 

function nveauM() {
    molecules = [];
    let n = document.getElementById("setM").value;
    if (n == 0) return;
    if (isNaN(n)) return;

    for (var i = 0; i < n; i++) {
        var ok = false;
        while (!ok) {
            x = Math.floor(Math.random() * (canvas.width-30)) + 15; //position aléatoire de la molécule en X
            y = Math.floor(Math.random() * (canvas.height-30)) + 15; //position aléatoire de la molécule en Y
            if (i == 0) {
                molecules.push(new Molecule(x, y, 10, Math.floor(getRandom(1, 6))));
                ok=true;
            } else {
                ok=true;
                for (j = 0; j < i; j++) {
                    if (Math.abs(x - molecules[j].x) < 20 && Math.abs(y - molecules[j].y) < 20) {
                        ok = false;
                    }
                }
                if (ok) {
                    molecules.push(new Molecule(x, y, 10, Math.floor(getRandom(1, 6))));
                }
            }
        }
    }
    draw();
}


function slider() {
    var x = document.getElementById("slider").value;
    document.getElementById("test").innerHTML = x;
    molecules = [];
    for (let i = 0; i < x; i++) {
        let x = Math.floor(Math.random() * canvas.width -13) + 26; //position aléatoire de la molécule en X
        let y = Math.floor(Math.random() * canvas.height -13) + 26; //position aléatoire de la molécule en Y
        molecules.push(new Molecule(x, y, 10, Math.floor(getRandom(1, 10))));
    }
}

function checkCollisions() {
    let xcors = [];
    let ycors = [];
    let radius = [];
    molecules.forEach(element => {
        xcors.push(element.x);
        ycors.push(element.y);
        radius.push(element.rayon);
    });
    for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
            if (!molecules[i].stateCollision) {
                molecules[i].stateCollision = checkDist(molecules[i].x, xcors[j], molecules[i].y, ycors[j], molecules[i].rayon, radius[j]);
                if (molecules[i].stateCollision) molecules[j].stateCollision = molecules[i].stateCollision;
            } else {
                if (!molecules[j].stateCollision) {
                    molecules[j].stateCollision = checkDist(molecules[i].x, xcors[j], molecules[i].y, ycors[j], molecules[i].rayon, radius[j]);
                }
            }
        }
    }
    applyOnCollision();
}

function applyOnCollision() {
    for (let i = 0; i < molecules.length; i++) {
        molecules[i].onCollision();
    }
}

function checkDist(x1, x2, y1, y2, r1, r2) {
    if (Math.abs(x1 - x2) <= r1 + r2 && Math.abs(y1 - y2) <= r1 + r2) {
        return true;
    } else {
        return false;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
