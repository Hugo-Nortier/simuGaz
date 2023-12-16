class Molecule {
    constructor(x, y, rayon, vitesse) {
        //coordinates
        this.x = x;
        this.y = y;


        //parametters
        this.rayon = rayon;
        this.vitesse = vitesse;
        this.stateCollision = false;

        switch (vitesse) {
            case 1: //RED - oxygen
                this.color = "rgb(255, 0, 0)";
                this.rayon = 13;
                break;
            case 2: //GREEN - chlore
                this.color = "rgb(0, 255, 0)";
                this.rayon = 11;
                break;
            case 3: //BLUE - Nitrogen
                this.color = "rgb(0, 0, 255)";
                this.rayon = 9;
                break;
            case 4: //YELLOW - Souffre
                this.color = "rgb(255, 255, 102)";
                this.rayon = 7;
                break;
            case 5: //WHITE (grey to see them) - Hydrogen
                this.color = "rgb(143, 136, 136)";
                this.rayon = 5;
                break;
            case 6: //PURPLE - Phosphore
                this.color = "rgb(142, 69, 133)";
                this.rayon = 3;
                break;
            default:
                this.color = "rgb(0, 0, 0)";
        }


        //cap = {dirX ; dirY} //
        this.cap = [getRandom(-1, 1) * vitesse, getRandom(-1, 1) * vitesse];
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rayon, 0, Math.PI * 2);
        //couleur balle
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    wallCollision(canvas) {
        //collision mur gauche droite 
        if (this.x + this.cap[0] > canvas.width - this.rayon || this.x + this.cap[0] < this.rayon) {
            this.cap[0] = -this.cap[0];
        }
        //collision mur haut bas 
        if (this.y + this.cap[1] > canvas.height - this.rayon || this.y + this.cap[1] < this.rayon) {
            this.cap[1] = -this.cap[1];
        }
        this.x += this.cap[0];
        this.y += this.cap[1];
    }

    onCollision() {
        if (this.stateCollision) {
            this.stateCollision = !this.stateCollision;
            this.cap[0] = this.cap[0] * -1;
            this.cap[1] = this.cap[1] * -1;
        }
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
