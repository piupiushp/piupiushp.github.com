function drawLoading($canvas, width, height, radius, maxVelo, rVelo, num) {
	//return draw

	var context = $canvas[0].getContext('2d'),
		PI = Math.PI,
		balls = [],
		createBall = ballClass(balls, width, height, maxVelo, rVelo, context),
		core = createBall(true, width / 2, height / 2, radius);

	setBalls();
	
	function setBalls() {

		var i;

		for (i = 0; i < num; i++) {

			balls.push(createBall(false));
		};
	};

	function draw() {

		var i;

		context.clearRect(0, 0, width, height);
		core.draw(core.posX, core.posY, core.r);

		for (i = 0; i < num; i++) {

			balls[i].draw();
		};
	};

	return draw;
};

function ballClass(balls, height, width, maxVelo, rVelo, context) {

	var PI = Math.PI,
		corePosX = 0,
		corePosY = 0;

	function createBall(isCore, posX, posY, r) {
		
		var ball = {};

		if (isCore) {

			ball.posX = posX;
			ball.posY = posY;
			ball.r = r;
			corePosX = posX;
			corePosY = posY;
			ball.draw = addColor;
		}else {

			ball.posX = Math.random() * width;
			ball.posY = Math.random() * height;
			ball.r = 0;
			calVelo(ball);
			ball.draw = drawBall;
		};

		return ball;
	};

	function calVelo(ball) {
		
		var velo = maxVelo / 2 + Math.random() * maxVelo / 2,
			w = ball.posX - corePosX,
			h = ball.posY - corePosY,
			l = Math.sqrt(w * w + h * h);
		
		ball.veloX = velo * w / l;
		ball.veloY = velo * h / l;
	};
	
	function drawBall() {
		
		var posX = this.posX,
			posY = this.posY,
			r = this.r,
			vX = this.veloX,
			vY = this.veloY,
			dPosX = posX - corePosX,
			dPosY = posY - corePosY,
			index = 0;

		if (Math.abs(dPosX) < Math.abs(vX) || Math.abs(dPosY) < Math.abs(vY)) {
	
			index = balls.indexOf(this);
			balls.splice(index, 1, createBall(false));
			return;
		};

		addColor(posX, posY, r);
		
		this.posX = posX - vX;
		this.posY = posY - vY;
		this.r = r + rVelo;
	};

	function addColor(x, y, r) {

		var gradient = context.createRadialGradient(x, y, 0, x, y, r);

		gradient.addColorStop(0, 'rgba(151, 255, 255, 1)');
		gradient.addColorStop(1, 'rgba(151, 255, 255, 0)');
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(x, y, r, 0, PI * 2);
		context.fill();
		context.closePath();
	};

	return createBall;
};