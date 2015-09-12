var movingDivs = (function() {
	
	function animateDivCircle(angle, currentDiv) {
				var	radius = 100;
				currentDiv.css("left", Math.cos(angle + 2 * Math.PI/5)/radius * 10000 + 'px');
				currentDiv.css("top", Math.sin(angle + 2 * Math.PI/5)/radius * 10000 + 'px');
				angle = angle + 0.05;
				setTimeout(function () {
					animateDivCircle(angle, currentDiv);
				}, 20);
	}
	
	function animateDivRect(currentDiv) {
				if (currentDiv.css("margin-left") == "450px" && 
					currentDiv.css("margin-top") <= "300px") {
						currentDiv.css("margin-top", "-=10px");
				}
				
				else if (currentDiv.css("margin-top") == "300px") {
						currentDiv.css("margin-left", "-=10px");
				}

				else if (currentDiv.css("margin-left") == "700px") {
					currentDiv.css("margin-top", "+=10px");
				}
				
				else {
					currentDiv.css("margin-left", "+=10px");
				}
				setTimeout(function() {
							animateDivRect(currentDiv)
							}, 100);
			}

	function add(shape) {			
	
			var currentDiv = $("<div>Hello world!</div>");
			currentDiv.css({
				"height": "50px",
				"width": "50px",
				"background-color": getRandomColor(),
				"border": "3px solid",
				"border-color": getRandomColor(),
				"color": getRandomColor(),
				"font-weight": "600",
				"text-align": "center",
				"position": "absolute"
			});
			$("#circle").append(currentDiv);
			if (shape === "ellipse") {
				currentDiv.css({
					"border-radius": "25px",
					"margin": "150px 0 0 150px"
				});
				animateDivCircle(0, currentDiv)
			}
			else if (shape === "rect") {
				currentDiv.css("margin", "100px 0 0 450px");
				animateDivRect(currentDiv);
			}
	}
	function getRandomValue(min, max) {
		return Math.floor(Math.random()*(max-min)+min);
	}

	function getRandomColor() {
		var red = getRandomValue(0, 255),
			green = getRandomValue(0, 255),
			blue = getRandomValue(0, 255);
		return "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	return {
		add: add
	}
}());