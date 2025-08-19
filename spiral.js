global();
function global() {

	window.addEventListener("load", main);

	let coordWay = [];
	let needWay = false;
	let way = false;
	let value
	let waySpiral = false;
	let wayRandom= false;

	let RandomCoordWay;
	let durationWay = 4000;
	let startTimeWay;
	let progress;
	let borderRandomCoordWay;
	let centerWayX;
	let centerWayY;

	let countWay = 0;

	const a = 5; //коэф расятжения
	let coils = 10; // количество витков
	let maxRadius = 60;
	let radius = 0;
	let startX 
	let startY 


	function main() {
		xStar = rectCanvas.width / 2
		yStar = rectCanvas.height / 2
		kordStar = coordinatesStar(sizeStar, rotateAngleStar);
		drawStar(xStar, yStar, fillStyleStar, strokeStyleStar, kordStar);
		setupCanvas();
		startPage();
	};

	function startPage() {
		let startPage = document.getElementById("startPage");
		if(needRotate) {
			startPage.textContent = 'Остановить';
		} else {
			startPage.textContent = 'Запустить';
		}

		startPage.onclick = () => {
			if(needRotate) {
				startPage.textContent = 'Запустить';
				//animationFlash = false;
				waySpiral = false;
				wayRandom= false;
				drawStarTailClear(fillStyleStar, strokeStyleStar, kordStar, sizeStar, rotateAngleStar);
		
				} else {
				startPage.textContent = 'Остановить';
				needRotate = true;
				animationRotate();
				value = getRandomInt(1, 2);
				generateRandomMoveWay()
				needWay = false;
			};
		};
	};

	function setupCanvas() {
		// флаг для перемещения - сейчас перемещения нет
		let isDragging = false;
		// для отсчета смещения курсора относительно центра фигуры
		let offsetX = 0
		let offsetY = 0
		// для положения курсора
		let mouseX;
		let mouseY;
		// положение курсора (фигуры) после перемещения
		let newX;
		let newY;
		canvas.addEventListener('mousedown', function(e) {

			// положение курсора на канвасе начало
			mouseX = e.clientX - rectCanvas.left;
			mouseY = e.clientY - rectCanvas.top;

			// здесь должна быть проверка
			if (mouseX <= xStar + sizeStar/2 &&
			    mouseX >= xStar - sizeStar/2 &&
			    mouseY <= yStar + sizeStar/2 &&
			    mouseY >= yStar - sizeStar/2) {
				isDragging = true;// флаг для перемещения - сейчас перемещение есть
				offsetX = mouseX - xStar;
				offsetY = mouseY - yStar;
				needWay = true;
				waySpiral = false;
				wayRandom= false;
				needRotate = true;
				startPage();
				colorStar = -1;
				animationRotate();
			};
		});
	
		canvas.addEventListener('mousemove', function(e) {
			if (!isDragging) { return }; 
			// положение курсора (фигуры) конец
			newX = e.clientX - offsetX - rectCanvas.left;
			newY = e.clientY - offsetY - rectCanvas.top;
			// тут должны быть корды фигуры
			let newCoord = {x:newX, y:newY} //borderFigure(newX, newY, rectCanvas);
			xStar = newCoord.x;
			yStar = newCoord.y; 
			positionTail.push({x:newCoord.x, y:newCoord.y});
			if (positionTail.length > maxTailLength) {
				positionTail.shift();
			};
		});

		document.addEventListener('mouseup', function(e) {
			isDragging = false;// флаг для перемещения - сейчас перемещения нет
			//needRotate = false;
			if (needWay) {
				value = getRandomInt(1, 2);
				generateRandomMoveWay()
				needWay = false;
			};
		});
	};

	function generateRandomMoveWay() {
		if (value == 1) {
			waySpiral = true;
			startX = xStar
			startY = yStar;
			countWay = 0;
			durationWay = 4000;
			callSpiralCoordWay();
			coordinatesWaySpiral();
		} else {
			wayRandom = true;
			centerWayX = xStar;
			centerWayY = yStar;
			countWay = 0;
			durationWay = 1000;
			callRandomCoordWay();
			coordinatesWayRandom();
		};
	};

	function borderFigure(coordX, coordY, rectCanvas) {
		const x = getBorders(coordX, sizeStar+1.5, rectCanvas.width - sizeStar);
		const y = getBorders(coordY, sizeStar+1.5, rectCanvas.height - sizeStar);
		return {x, y};	
	};

	function getBorders(size, min, max) {
		return Math.min(Math.max(size, min), max);
	};

	function callRandomCoordWay() {
		startTimeWay = null;
		progress = 0;
		if(countWay == 0) {
			RandomCoordWay = getRandomCoordWay();
		} else {
			RandomCoordWay = getRandomCoordWayBorders();
		};
	};

	function callSpiralCoordWay() {
		startTimeWay = null;
		radius = 0;
		progress = 0;
		RandomCoordWay = getSpiralCoordWay();
	};

	function getSpiralCoordWay() {
		return {x:getRandomInt(0, rectCanvas.width), y:getRandomInt(0, rectCanvas.height)}
	}

	function getRandomCoordWay() {
		const positionGetRandomCoordWay = [
			{x:getRandomInt(0, rectCanvas.width), y:0},
			{x:getRandomInt(0, rectCanvas.width), y:rectCanvas.height},
			{x:0, y:getRandomInt(0, rectCanvas.height)},
			{x:rectCanvas.width, y:getRandomInt(0, rectCanvas.height)},
			];
		let tochka = getRandomInt(0, positionGetRandomCoordWay.length-1);
		return positionGetRandomCoordWay[tochka];
	};

	function coordinatesWaySpiral() {
		if (!waySpiral) { return };
		requestAnimationFrame((timeStamp) => {
			if(!startTimeWay) { startTimeWay = timeStamp };
			const deltaTime = timeStamp - startTimeWay;
			progress = Math.min(deltaTime/durationWay, 1)

			let angle = progress * Math.PI * coils;
			let xWay = RandomCoordWay.x + radius * Math.cos(angle);
			let yWay = RandomCoordWay.y + radius * Math.sin(angle);
			radius = a * maxRadius * (1 - progress);
//линейная интерполяция
			positionTail.push({x:startX + (xWay - startX) * progress, y:startY + (yWay - startY) * progress});
			if (positionTail.length > maxTailLength) {
				positionTail.shift();
			}
		})

		requestAnimationFrame(coordinatesWaySpiral);
		if(positionTail.length >= 100) {
			let coordWayR = positionTail[99];
			if(coordWayR.x == RandomCoordWay.x && coordWayR.y == RandomCoordWay.y) {
				countWay += 1;
				startX = coordWayR.x;
				startY = coordWayR.y;
				//colorStar = getRandomInt(0, colorFillAndStroke.length - 1);
				callSpiralCoordWay();
			};
		};
		if(countWay >= 1) {
			waySpiral = false;
			value = 2;
			//colorStar = getRandomInt(0, colorFillAndStroke.length - 1);
			generateRandomMoveWay();
		};
	}

	function coordinatesWayRandom() {
		if (!wayRandom) { return };
		requestAnimationFrame((timeStamp) => {
			if(!startTimeWay) { startTimeWay = timeStamp };
			const deltaTime = timeStamp - startTimeWay;
			progress = Math.min(deltaTime/durationWay, 1)
			let xWay = centerWayX + (RandomCoordWay.x - centerWayX) * progress;
			let yWay = centerWayY + (RandomCoordWay.y - centerWayY) * progress;
			positionTail.push({x:xWay, y:yWay});
			if (positionTail.length > maxTailLength) {
				positionTail.shift();
			};
		});
		requestAnimationFrame(coordinatesWayRandom);
		if(positionTail.length >= 100) {
			let coordWayR = positionTail[99];
			if(coordWayR.x == RandomCoordWay.x && coordWayR.y == RandomCoordWay.y) {
				countWay += 1;
				centerWayX = coordWayR.x;
				centerWayY = coordWayR.y;
				colorStar = getRandomInt(0, colorFillAndStroke.length - 1);
				callRandomCoordWay();
			};
		};	
		if(countWay >= 2) {
			wayRandom = false;
			value = 1;
			//colorStar = getRandomInt(0, colorFillAndStroke.length - 1);
			generateRandomMoveWay();
		};
	};


	function getRandomCoordWayBorders() {
		if(RandomCoordWay.x == 0) {
			const positionGetRandomCoordWay = [
				{x:getRandomInt(0, rectCanvas.width), y:0},
				{x:getRandomInt(0, rectCanvas.width), y:rectCanvas.height},
				//{x:0, y:getRandomInt(0, rectCanvas.height)},
				{x:rectCanvas.width, y:getRandomInt(0, rectCanvas.height)},
				];
			let tochka = getRandomInt(0, positionGetRandomCoordWay.length-1);
			return positionGetRandomCoordWay[tochka];
		};
		if(RandomCoordWay.x == rectCanvas.width) {
			const positionGetRandomCoordWay = [
				{x:getRandomInt(0, rectCanvas.width), y:0},
				{x:getRandomInt(0, rectCanvas.width), y:rectCanvas.height},
				{x:0, y:getRandomInt(0, rectCanvas.height)},
				//{x:rectCanvas.width, y:getRandomInt(0, rectCanvas.height)},
				];
			let tochka = getRandomInt(0, positionGetRandomCoordWay.length-1);
			return positionGetRandomCoordWay[tochka];
		};
		if(RandomCoordWay.y == 0) {
			const positionGetRandomCoordWay = [
				//{x:getRandomInt(0, rectCanvas.width), y:0},
				{x:getRandomInt(0, rectCanvas.width), y:rectCanvas.height},
				{x:0, y:getRandomInt(0, rectCanvas.height)},
				{x:rectCanvas.width, y:getRandomInt(0, rectCanvas.height)},
				];
			let tochka = getRandomInt(0, positionGetRandomCoordWay.length-1);
			return positionGetRandomCoordWay[tochka];
		};
		if(RandomCoordWay.y == rectCanvas.height) {
			const positionGetRandomCoordWay = [
				{x:getRandomInt(0, rectCanvas.width), y:0},
				//{x:getRandomInt(0, rectCanvas.width), y:rectCanvas.height},
				{x:0, y:getRandomInt(0, rectCanvas.height)},
				{x:rectCanvas.width, y:getRandomInt(0, rectCanvas.height)},
				];
			let tochka = getRandomInt(0, positionGetRandomCoordWay.length-1);
			return positionGetRandomCoordWay[tochka];
		};
	};
};



