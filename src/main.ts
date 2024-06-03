import Ball from "./classes/ball";

const mouse = {
  x: 0,
  y: 0,
  pressed: false
};

async function start(count: number, speed = 1) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (!canvas || !ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - canvas.getBoundingClientRect().x;
    mouse.y = e.clientY - canvas.getBoundingClientRect().y;
  });

  window.addEventListener('mousedown', () => mouse.pressed = true);
  window.addEventListener('mouseup', () => mouse.pressed = false);
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const balls: Ball[] = [];
  for (let i = 0; i < count; i++) {
    balls.push(new Ball(canvas, ctx,
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 4 + 2,
      (Math.random() * 2 - 1) * speed,
      (Math.random() * 2 - 1) * speed
    ));
  }

  function animate() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => {
      ball.update(balls, mouse);
      ball.draw();
    });

    requestAnimationFrame(animate);
  }


  animate();
}

start(200, 1);
