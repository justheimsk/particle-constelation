export default class Ball {
  public canvas: HTMLCanvasElement | OffscreenCanvas;
  public ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  public x: number;
  public y: number;
  public r: number;
  public speedX: number;
  public speedY: number;
  public id: number;
  public alpha: number;
  public lineAlpha: number;
  public fillStyle: string;

  public constructor(canvas: HTMLCanvasElement | OffscreenCanvas, ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, x: number, y: number, r: number, speedX: number, speedY: number) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.r = r;

    this.x = x;
    if (this.x >= canvas.width - this.r) this.x = canvas.width - this.r;
    if (this.x <= this.r) this.x = this.r + 1;

    this.y = y;
    if (this.y >= canvas.height - this.r) this.y = canvas.height - this.r;
    if (this.y <= this.r) this.y = this.r + 1;

    this.speedX = speedX;
    this.speedY = speedY;
    this.id = Math.floor(Math.random() * 9999999);
    this.alpha = 1;
    this.lineAlpha = 0.2;

    this.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
  }

  public draw() {
    this.ctx.beginPath();
    if (this.ctx.fillStyle != this.fillStyle) this.ctx.fillStyle = this.fillStyle;
    this.ctx.arc(this.x, this.y, this.r, 0, 360);
    this.ctx.fill();
    this.ctx.closePath();
  }

  public drawLine(x: number, y: number, distance: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - (distance / 100)) / 1.5})`;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  public update(balls: Ball[], mouse: { x: number, y: number, pressed: boolean }) {
    if ((this.x >= this.canvas.width - this.r && this.speedX > 0) || (this.x <= this.r && this.speedX < 0)) this.speedX *= -1;
    if ((this.y > + this.canvas.height - this.r && this.speedY > 0) || (this.y <= this.r && this.speedY < 0)) this.speedY *= -1;

    balls.forEach((ball) => {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const dist = Math.sqrt(dx ** 2 + dy ** 2);

      if (dist <= 100) this.drawLine(ball.x, ball.y, dist);
    });
    let rep = false;

    if (mouse.pressed) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx ** 2 + dy ** 2);

      if (dist < 100) {
        const angle = Math.atan2(dx, dy);
        this.x += Math.cos(angle);
        this.y += Math.sin(angle);
        rep = true;
      }
    }

    if (rep) return;
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
