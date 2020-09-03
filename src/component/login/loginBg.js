//from codepen.io/ZevanRosser/pen/bde8e879b344202cf06379e44f9e80b2

const blobBg = () => {
  //const TWO_PI = Math.PI * 2;
  const HALF_PI = Math.PI / 2;
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const c = canvas.getContext("2d");

  document.querySelector(".login").appendChild(canvas);

  class Blob {
    constructor() {
      this.wobbleIncrement = 0;
      // use this to change the size of the blob
      this.radius = 700;
      // think of this as detail level
      // number of conections in the `bezierSkin`
      this.segments = 12;
      this.step = HALF_PI / this.segments;
      this.anchors = [];
      this.radii = [];
      this.thetaOff = [];

      const bumpRadius = 100;
      const halfBumpRadius = bumpRadius / 2;

      for (let i = 0; i < this.segments + 2; i++) {
        this.anchors.push(0, 0);
        this.radii.push(Math.random() * bumpRadius - halfBumpRadius);
        this.thetaOff.push(Math.random() * 2 * Math.PI);
      }

      this.theta = 0;
      this.thetaRamp = 0;
      this.thetaRampDest = 12;
      this.rampDamp = 25;
    }
    update() {
      this.thetaRamp += (this.thetaRampDest - this.thetaRamp) / this.rampDamp;
      this.theta += 0.03;

      this.anchors = [0, this.radius];
      for (let i = 0; i <= this.segments + 2; i++) {
        const sine = Math.sin(this.thetaOff[i] + this.theta + this.thetaRamp);
        const rad = this.radius + this.radii[i] * sine;
        const x = rad * Math.sin(this.step * i);
        const y = rad * Math.cos(this.step * i);
        this.anchors.push(x, y);
      }

      c.save();
      c.translate(-10, -10);
      c.scale(1, 1);
      c.fillStyle = "#2f3136";
      c.beginPath();
      c.moveTo(0, 0);
      bezierSkin(this.anchors, false);

      c.lineTo(0, 0);
      c.fill();
      c.restore();
    }
  }

  const blob = new Blob();

  function loop() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    blob.update();
    window.requestAnimationFrame(loop);
  }
  loop();

  // array of xy coords, closed boolean
  function bezierSkin(bez, closed = true) {
    const avg = calcAvgs(bez);
    const leng = bez.length;

    if (closed) {
      c.moveTo(avg[0], avg[1]);
      for (let i = 2; i < leng; i += 2) {
        let n = i + 1;
        c.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
      }
      c.quadraticCurveTo(bez[0], bez[1], avg[0], avg[1]);
    } else {
      c.moveTo(bez[0], bez[1]);
      c.lineTo(avg[0], avg[1]);
      for (let i = 2; i < leng - 2; i += 2) {
        let n = i + 1;
        c.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
      }
      c.lineTo(bez[leng - 2], bez[leng - 1]);
    }
  }

  // create anchor points by averaging the control points
  function calcAvgs(p) {
    const avg = [];
    const leng = p.length;
    let prev;

    for (let i = 2; i < leng; i++) {
      prev = i - 2;
      avg.push((p[prev] + p[i]) / 2);
    }
    // close
    avg.push((p[0] + p[leng - 2]) / 2, (p[1] + p[leng - 1]) / 2);
    return avg;
  }

  //todo bubbles effect
  const colourArray = ["#17468A", "#4C8DCA", "#78E5EB", "#F5F0F2", "#E12D53"];

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
  });

  function Circle(x, y, dx, dy, radius, colorFill) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

      c.fillStyle = colorFill;
      c.fill();
    };

    this.update = function () {
      if (
        this.x + this.radius > window.innerWidth ||
        this.x - this.radius < 0
      ) {
        this.dx = -this.dx;
      }
      if (
        this.y + this.radius > window.innerHeight ||
        this.y - this.radius < 0
      ) {
        this.dy = -this.dy;
      }
      this.y = this.y + this.dy;
      this.x = this.x + this.dx;
      //interactivaity

      this.draw();
    };
  }

  let circleArray = [];

  function init() {
    circleArray = [];
    //red dots
    for (let i = 0; i < 100; i++) {
      const radius = Math.random() * 4 + 1;
      const x = Math.random() * (window.innerWidth - radius * 2) + radius;
      const dx = (Math.random() - 0.5) * 2;
      const y = Math.random() * (window.innerHeight - radius * 2) + radius;
      const dy = (Math.random() - 0.5) * 2;
      circleArray.push(
        new Circle(
          x,
          y,
          dx,
          dy,
          radius,
          colourArray[Math.floor(Math.random() * colourArray.length)]
        )
      );
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  }
  //  init();
  //  animate();
};

export default blobBg;
