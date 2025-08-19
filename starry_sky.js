window.addEventListener("load", starrySky);

// для исп. в другом файле
let parametersBackground = []; 
let fillStyle = "rgba(255,215,00,1)"; 
let strokeStyle = "rgba(155,100,55,1)";


function starrySky() {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext('2d');;
	const sizeCanvas = canvas.getBoundingClientRect();
//let fillStyle = "rgba(255,215,00,1)"; 
//let strokeStyle = "rgba(155,100,55,1)";
	parametersBackground = generateParametersBackground(sizeCanvas);
	drawCircles(ctx, parametersBackground, fillStyle, strokeStyle)
		
}


function drawCircles(ctx, parametersCircles, fillStyle, strokeStyle) {
	for (let i = 0; i < parametersCircles.length; i++) {
		let radiusCircle = getRandomInt(parametersCircles[i].radius-1, parametersCircles[i].radius)
		drawCircle(ctx, parametersCircles[i].x, parametersCircles[i].y, radiusCircle, fillStyle, strokeStyle);
	};
};


function drawCircle(ctx, x, y, radius, fillStyle, strokeStyle) {
	let pi = Math.PI;
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.fillStyle = fillStyle;
	ctx.strokeStyle = strokeStyle;
	ctx.arc(x, y, radius, 0, 2*pi, true);
	ctx.stroke();
	ctx.fill();
};

function generateParametersBackground(sizeCanvas) {
	let nanoCircles = generateParametersCircles(350, 0, sizeCanvas.width, 0, sizeCanvas.height, 1, 2,sizeCanvas);
	let miniCircles = generateParametersCircles(350, 0, sizeCanvas.width, 0, sizeCanvas.height, 3, 5,sizeCanvas);
	let mediumCircles = generateParametersCircles(120, 0, sizeCanvas.width, 0, sizeCanvas.height, 10, 15,sizeCanvas);
	let bigCircles = generateParametersCircles(50, 0, sizeCanvas.width, 0, sizeCanvas.height, 25, 30,sizeCanvas);

	return nanoCircles.concat(miniCircles, mediumCircles, bigCircles);
}

function generateParametersCircles(count, xMin, xMax, yMin, yMax, rMin, rMax, sizeCanvas) {
	const parametersCircles = [];

	let xCenter = sizeCanvas.width / 2
	let yCenter = sizeCanvas.height / 2
	let maxRadiusFromCenter = Math.sqrt((sizeCanvas.width/2)**2 + (sizeCanvas.height/2)**2);

	for (let i = 0; i < count; i++) {
		let circle = generateParametersCircle(xMin, xMax, yMin, yMax, rMin, rMax);

		if(circle.radius <= 5) {
			parametersCircles.push(circle);
		}

		if(circle.radius >= 10 && circle.radius <= 15) {
			const distanceX = Math.abs(xCenter - circle.x)
			const distanceY = Math.abs(yCenter - circle.y)
			const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
			
			if (distance >= maxRadiusFromCenter * 0.45) {
				parametersCircles.push(circle);
			}
		}
		
		if(circle.radius >= 25) {
			const distanceX = Math.abs(xCenter - circle.x)
			const distanceY = Math.abs(yCenter - circle.y)
			const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

			if (distance >= maxRadiusFromCenter * 0.75) {
				parametersCircles.push(circle);
			}
		}
	};
	return parametersCircles;
};

function generateParametersCircle(xMin, xMax, yMin, yMax, rMin, rMax) {
	return {x:getRandomInt(xMin, xMax), y:getRandomInt(yMin, yMax), radius:getRandomInt(rMin, rMax)};
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

