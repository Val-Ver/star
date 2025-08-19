window.addEventListener("load", starTailDraw);

let canvas;
let rectCanvas
let ctx;

let kordStar = [];
let rotateAngleStar = 0;

let fillStyleStar = "rgba(255,215,00,1)"; 
let strokeStyleStar = "rgba(155,100,55,1)";

let sizeStar = 60;
let sidesStar = 5;
let xStar //= 400;
let yStar //= 300;


let needRotate = false;
let rotationPerSecond = 0.5; //поворотов в cек
let lastTime = 0;

let positionTail = [];
let maxTailLength = 100;

let colorStar = -1;
let colorFillAndStroke = [];
	

function starTailDraw() {
	canvas = document.getElementById("myCanvas");
	rectCanvas = canvas.getBoundingClientRect();
	ctx = canvas.getContext('2d');
	//xStar = rectCanvas.width / 2
	//yStar = rectCanvas.height / 2
	//kordStar = coordinatesStar(sizeStar, rotateAngleStar);
	//drawStar(xStar, yStar, fillStyleStar, strokeStyleStar, kordStar);
};

function drawStarTail(colorStar, fillStyleStar, strokeStyleStar, kordArr, size, rotateAngle) {
	let alpha = 0;
	let sizeS = 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height); 
	drawCircles(ctx, parametersBackground, fillStyle, strokeStyle)
	drawStar(xStar, yStar, fillStyleStar, strokeStyleStar, kordStar);

	for (let i = 0; i < positionTail.length; i++) {
		alpha = alpha + 1/positionTail.length;
		sizeS = sizeS + size/positionTail.length;
		if(colorStar > -1) {
			colorFillAndStroke = [
			{fill:`rgba(180,140,040,${alpha})`, stroke:`rgba(080,040,000,${alpha})`}, // темный коричневый
			{fill:`rgba(212,175,055,${alpha})`, stroke:`rgba(112,075,000,${alpha})`}, // коричневый
			{fill:`rgba(237,218,116,${alpha})`, stroke:`rgba(137,118,016,${alpha})`}, //бледня
			{fill:`rgba(255,165,000,${alpha})`, stroke:`rgba(155,105,000,${alpha})`}, //оранжевый
			{fill:`rgba(255,230,000,${alpha})`, stroke:`rgba(155,130,000,${alpha})`}, //лимон
			{fill:`rgba(255,230,100,${alpha})`, stroke:`rgba(155,130,050,${alpha})`}, //светлее лимон				
			{fill:`rgba(255,241,181,${alpha})`, stroke:`rgba(155,141,081,${alpha})`}, //совсем белый	
			];
			let colorStarArr = colorFillAndStroke[colorStar]
			fillStyleStar = colorStarArr.fill;
			strokeStyleStar = colorStarArr.stroke;
		} else { 			
			fillStyleStar = `rgba(255,215,00,${alpha})`;
			strokeStyleStar = `rgba(155,100,55,${alpha})`;
		};
		kordStar = coordinatesStar(sizeS, rotateAngle);
		xStar = positionTail[i].x; 
		yStar = positionTail[i].y;
		drawStar(xStar, yStar, fillStyleStar, strokeStyleStar, kordStar);
	};
};

function drawStarTailClear(fillStyleStar, strokeStyleStar, kordArr, size, rotateAngle) {
	if(positionTail.length <= 1) { 
		needRotate = false;
		return;
	};	
	positionTail.shift();
	requestAnimationFrame(drawStarTailClear);
};
	
function drawStar(x, y, fillStyleStar, strokeStyleStar, kordArr) {		
	ctx.save();
	ctx.translate(x, y);
	ctx.lineWidth = 3;		
	ctx.fillStyle = fillStyleStar;
	ctx.strokeStyle = strokeStyleStar;
	ctx.beginPath(); //новый путь
	
	for (let i = 0; i < kordArr.length; i++) {
		ctx.lineTo(kordArr[i].x, kordArr[i].y);
	};

	ctx.closePath(); // объединяем углы
	ctx.stroke(); //русуем контур
	ctx.fill(); // заполняем цвет
	ctx.restore();
};

function coordinatesStar(size, rotateAngle) {
	const kordArr = [];
	const radius = size;	
	const centerX = 0;
	const centerY = 0;
	let angle;
	let kordX;
	let kordY;
	for (let i = 0; i < sidesStar; i++) {
		angle = i * 2 * Math.PI / sidesStar - Math.PI / 2 + rotateAngle;
		kordX = centerX + radius * Math.cos(angle);
		kordY = centerY + radius * Math.sin(angle);
		kordArr.push({x: kordX, y:kordY});
	
		angle = i * 2 * Math.PI / sidesStar - Math.PI / 3.3 + rotateAngle;
		kordX = centerX + radius/2 * Math.cos(angle);
		kordY = centerY + radius/2 * Math.sin(angle);
		kordArr.push({x: kordX, y: kordY});
	};
	return kordArr;
};

function animationRotate(timeStamp) {
	if(!needRotate) { return };
	requestAnimationFrame((timeStamp) => {
		if(!lastTime) { lastTime = timeStamp };
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		const anglePerSecond = (rotationPerSecond * 2 * Math.PI)/1000;
		rotateAngleStar = rotateAngleStar + (anglePerSecond * (deltaTime));
	});
	kordStar = coordinatesStar(sizeStar, rotateAngleStar);
	drawStarTail(colorStar, fillStyleStar, strokeStyleStar, kordStar, sizeStar, rotateAngleStar)
	requestAnimationFrame(animationRotate);
};





