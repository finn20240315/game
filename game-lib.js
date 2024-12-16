class Missile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -4;
    this.size = 15;
  }
  update() {
    this.y += this.vy;
    // 偵測飛彈是否有撞到任何一個UFO
    let targets = ufos1.ufos;
    for (let i = 0; i < objs.length; i++) {
      let distance = Math.sqrt(
        Math.pow(this.x - targets[i].x, 2) + Math.pow(this.y - targets[i].y, 2)
      );
      let threshold = (this.size + targets[i].size) / 2;
      if (distance < threshold) {
        objs.push(new ExplosionEffect(targets[i].x,targets[i].y));
        console.log("Conflict");
        targets.splice(i, 1);
        i--;
        return true;
      }
    }

    if (this.y < -50) {
      return true;
    }
  }
  draw() {
    ctx.drawImage(
      imgs.missile,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }
}

class UFOSystem {
  constructor() {
    this.maxY = 200;
    this.maxCount = 20;
    this.ufos = [];
  }
  update() {
    if (this.ufos.length < this.maxCount) {
      this.ufos.push(
        new UFO(Math.random() * cvs.width, Math.random() * this.maxY)
      );
    }
    for (let i = 0; i < this.ufos.length; i++) {
      let dead = this.ufos[i].update();
      if (dead) {
        this.ufos.splice(i, 1);
        i--;
      }
    }
  }
  draw() {
    for (let i = 0; i < this.ufos.length; i++) {
      this.ufos[i].draw();
    }
  }
}

class UFO {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // X 座標的移動速度
    this.vx = Math.random() * 2 - 1;
    this.size = 30;
  }
  update() {
    this.x += this.vx;
    if (this.x <= 0 || this.x >= cvs.width) {
      this.vx *= -1;
    }
  }
  draw() {
    ctx.drawImage(
      imgs.ufo,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }
}

class ExplosionEffect {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size=60;
    this.life = 10;
  }
  update() {
    this.life--;
    return this.life<=0;
  }
  draw() {
    ctx.drawImage(
      imgs.explosion,
      this.x-(this.size/2),this.y-(this.size/2),
      this.size, this.size
    )
  }
}

class Plane {
  constructor() {
    this.x = cvs.width / 2;
    this.y = cvs.height - 100;
    this.size = 40;
  }
  update() {
    let speed = 2;
    if (keys["ArrowUp"]) {
      this.y -= speed;
    }
    if (keys["ArrowDown"]) {
      this.y += speed;
    }
    if (keys["ArrowLeft"]) {
      this.x -= speed;
    }
    if (keys["ArrowRight"]) {
      this.x += speed;
    }
    if (keys["Enter"]) {
      if (circle % 20 === 0) {
        objs.push(new Missile(this.x, this.y - this.size / 2));
      }
    }
    return false;
  }
  draw() {
    ctx.drawImage(
      imgs.plane,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }
}
