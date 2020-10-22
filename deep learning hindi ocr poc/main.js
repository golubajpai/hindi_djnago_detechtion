const ValueMouseX = document.getElementById("value-mouse-x");
const ValueMouseY = document.getElementById("value-mouse-y");
const ValuePountAX = document.getElementById("value-point-a-x");
const ValuePountAY = document.getElementById("value-point-a-y");
const ValuePountBX = document.getElementById("value-point-b-x");
const ValuePountBY = document.getElementById("value-point-b-y");
const ValuePountCX = document.getElementById("value-point-c-x");
const ValuePountCY = document.getElementById("value-point-c-y");
const ValuePountDX = document.getElementById("value-point-d-x");
const ValuePountDY = document.getElementById("value-point-d-y");
const instructionElement = document.getElementById("instruction");

const canvasOverlay = document.getElementById("overlay-canvas");
var WIDTH = document.getElementById("image").offsetWidth;
var HEIGHT = document.getElementById("image").offsetHeight;

setTimeout(() => {
  WIDTH = document.getElementById("image").offsetWidth;
  HEIGHT = document.getElementById("image").offsetHeight;
  canvasOverlay.width = WIDTH;
  canvasOverlay.height = HEIGHT;
  canvasOverlay.style.width = WIDTH;
  canvasOverlay.style.height = HEIGHT;
}, 500);
const ctx = canvasOverlay.getContext("2d");
const DEFAULT_OFFSET = 25;
const DEFAULT_RADIUS = 6;
const ACTIVE_RADIUS = 9;
var isInitialPointSet = false;
var mouse = {
  x: -1,
  y: -1,
};
var p1 = {
  x: -1,
  y: -1,
  radius: 0,
};
var p2 = {
  x: -1,
  y: -1,
  radius: 0,
};
var p3 = {
  x: -1,
  y: -1,
  radius: 0,
};
var p4 = {
  x: -1,
  y: -1,
  radius: 0,
};
var activePoint = null;
var draggingPoint = null;

function setInitialPoints() {
  p1 = {
    x: mouse.x - DEFAULT_OFFSET,
    y: mouse.y - DEFAULT_OFFSET,
    radius: DEFAULT_RADIUS,
  };
  p2 = {
    x: mouse.x + DEFAULT_OFFSET,
    y: mouse.y - DEFAULT_OFFSET,
    radius: DEFAULT_RADIUS,
  };
  p3 = {
    x: mouse.x + DEFAULT_OFFSET,
    y: mouse.y + DEFAULT_OFFSET,
    radius: DEFAULT_RADIUS,
  };
  p4 = {
    x: mouse.x - DEFAULT_OFFSET,
    y: mouse.y + DEFAULT_OFFSET,
    radius: DEFAULT_RADIUS,
  };
}

function resetPoints() {
  p1 = {
    x: -1,
    y: -1,
    radius: 0,
  };
  p2 = {
    x: -1,
    y: -1,
    radius: 0,
  };
  p3 = {
    x: -1,
    y: -1,
    radius: 0,
  };
  p4 = {
    x: -1,
    y: -1,
    radius: 0,
  };
  isInitialPointSet = false;
  instructionElement.textContent = "Click anywhere on image to add select area";
}

resetPoints();

function handleImageSelect() {
  const imgElement = document.getElementById("image");
  const imgContainerElement = document.getElementById("image-selector");
  imgElement.src = window.URL.createObjectURL(imgContainerElement.files[0]);
  imgElement.classList.remove("default-img");

  setTimeout(() => {
    WIDTH = document.getElementById("image").offsetWidth;
    HEIGHT = document.getElementById("image").offsetHeight;
    canvasOverlay.width = WIDTH;
    canvasOverlay.height = HEIGHT;
    canvasOverlay.style.width = WIDTH;
    canvasOverlay.style.height = HEIGHT;

    resetPoints();
  }, 500);
}

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log("Coordinate x: " + x, "Coordinate y: " + y);
}

function isPointInCircle(circle_x, circle_y, r, x, y) {
  d = (circle_x - x) * (circle_x - x) + (circle_y - y) * (circle_y - y);
  return d <= r * r;
}

canvasOverlay.addEventListener("mousedown", function (e) {
  draggingPoint = activePoint;
  if (!isInitialPointSet) {
    setInitialPoints();
    isInitialPointSet = true;
    instructionElement.textContent =
      "Points are draggable. Click Reset Points to remove points";
  }
});

canvasOverlay.addEventListener("mouseup", function (e) {
  activePoint = null;
  draggingPoint = null;
});

canvasOverlay.addEventListener("mousemove", (e) => {
  var cRect = canvasOverlay.getBoundingClientRect();
  var x = Math.round(e.clientX - cRect.left);
  var y = Math.round(e.clientY - cRect.top);
  mouse = { x, y };
  ValueMouseX.textContent = x;
  ValueMouseY.textContent = y;

  if (!draggingPoint && isInitialPointSet) {
    if (isPointInCircle(p1.x, p1.y, 6, x, y)) {
      activePoint = 1;
    } else if (isPointInCircle(p2.x, p2.y, 6, x, y)) {
      activePoint = 2;
    } else if (isPointInCircle(p3.x, p3.y, 6, x, y)) {
      activePoint = 3;
    } else if (isPointInCircle(p4.x, p4.y, 6, x, y)) {
      activePoint = 4;
    } else {
      activePoint = null;
    }

    if (activePoint === 1) {
      p1.radius = ACTIVE_RADIUS;
    } else {
      p1.radius = DEFAULT_RADIUS;
    }
    if (activePoint === 2) {
      p2.radius = ACTIVE_RADIUS;
    } else {
      p2.radius = DEFAULT_RADIUS;
    }
    if (activePoint === 3) {
      p3.radius = ACTIVE_RADIUS;
    } else {
      p3.radius = DEFAULT_RADIUS;
    }
    if (activePoint === 4) {
      p4.radius = ACTIVE_RADIUS;
    } else {
      p4.radius = DEFAULT_RADIUS;
    }
  }

  if (draggingPoint) {
    if (draggingPoint === 1) {
      p1.radius = ACTIVE_RADIUS;
        p1.x = mouse.x;
        p1.y = mouse.y;
    } else {
      p1.radius = DEFAULT_RADIUS;
    }
    if (draggingPoint === 2) {
      p2.radius = ACTIVE_RADIUS;
        p2.x = mouse.x;
        p2.y = mouse.y;
    } else {
      p2.radius = DEFAULT_RADIUS;
    }
    if (draggingPoint === 3) {
      p3.radius = ACTIVE_RADIUS;
        p3.x = mouse.x;
        p3.y = mouse.y;
    } else {
      p3.radius = DEFAULT_RADIUS;
    }
    if (draggingPoint === 4) {
      p4.radius = ACTIVE_RADIUS;
        p4.x = mouse.x;
        p4.y = mouse.y;
    } else {
      p4.radius = DEFAULT_RADIUS;
    }
  }
});

setInterval(() => {
  draw();
  ValuePountAX.textContent = p1.x;
  ValuePountAY.textContent = p1.y;
  ValuePountBX.textContent = p2.x;
  ValuePountBY.textContent = p2.y;
  ValuePountCX.textContent = p3.x;
  ValuePountCY.textContent = p3.y;
  ValuePountDX.textContent = p4.x;
  ValuePountDY.textContent = p4.y;
}, 10);

function drawPoint(x, y, r) {
  if (r <= 0) return;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, r - 2, 0, 2 * Math.PI, true);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.lineWidth = 2;
}

function draw(x, y) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.setLineDash([5, 15]);
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.lineTo(p4.x, p4.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.strokeStyle = "red";
  ctx.stroke();

  drawPoint(p1.x, p1.y, p1.radius);
  drawPoint(p2.x, p2.y, p2.radius);
  drawPoint(p3.x, p3.y, p3.radius);
  drawPoint(p4.x, p4.y, p4.radius);
}
