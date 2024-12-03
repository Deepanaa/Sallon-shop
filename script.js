const container = document.getElementById('container');
const numShapes = 55;
const Height = 45;
const offset = 100; // Offset from the top of the page

for (let i = 0; i < numShapes; i++) {
  const shapeType = Math.random() < 0.4 ? 'box' : 'circle';
  const shape = document.createElement('div');
  shape.classList.add('shape', shapeType);

  let top, left;
  do {
    top = `${offset + Math.random() * (100 - Height - offset)}vh`;
    left = `${Math.random() * 100}vw`;
  } while (isCollidingWithNavbar(top, Height));

  shape.style.top = top;
  shape.style.left = left;
  container.appendChild(shape);

  const shapes = container.querySelectorAll('.shape');
  shapes.forEach((s) => {
    if (s !== shape && isColliding(shape, s)) {
      container.removeChild(shape);
    }
  });
}

function isColliding(shape1, shape2) {
  const rect1 = shape1.getBoundingClientRect();
  const rect2 = shape2.getBoundingClientRect();
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function isCollidingWithNavbar(top, navbarHeight) {
  return (
    parseFloat(top) < navbarHeight ||
    parseFloat(top) + 30 > window.innerHeight - navbarHeight
  );
}
