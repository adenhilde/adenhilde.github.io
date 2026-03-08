// Matrix effect canvas
const canvas = document.createElement('canvas');
document.getElementById('matrix-bg').appendChild(canvas);
const ctx = canvas.getContext('2d');
let width, height;
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-'.split('');
let fontSize = 14;
let columns;
let drops = [];
let frameCount = 0;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  columns = Math.floor(width / fontSize);
  drops = [];
  for (let x = 0; x < columns; x++) drops[x] = Math.random() * height;
}

resize();
window.addEventListener('resize', resize);

function draw() {
  frameCount++;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#39ff14';
  ctx.font = fontSize + 'px Orbitron, monospace';
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
    if (frameCount % 4 == 0) drops[i]++;
  }
  requestAnimationFrame(draw);
}

draw();

// Smooth scroll and active nav link highlight
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const targetID = link.getAttribute('href').substring(1);
    document.getElementById(targetID).scrollIntoView({ behavior: 'smooth' });
  });
});

window.addEventListener('scroll', () => {
  const fromTop = window.scrollY + 70;
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});
