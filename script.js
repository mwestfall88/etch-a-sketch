$(document).ready(function(){

	// builds grid of numRows x numCols <div> elements
	var buildEtch = function(sz){
		var numRows =  sz;
		var numCols =  sz;

		for (var i = 0; i < numRows; i++){
			$(".container").append("<div class='row'></div>");
		};

		var rowHeight = $('.container').height()/numRows;
		var rowWidth = $(".container").width() - parseInt($(".container").css("padding"));
		$(".row").css("height", rowHeight);
		$(".row").css("width", rowWidth);
	

		for (var i = 0; i < numCols; i++){
			$(".container").children().append("<div class='box'></div>");
		};

		var boxMargin = $('.box').css('margin');
		var boxPadding = $('.box').css('padding');
		var boxBorder = $('.box').css('border-width');
		var spacing = 2*(parseInt(boxMargin) + parseInt(boxPadding) + parseInt(boxBorder));
		var boxWidth = rowWidth/numCols - spacing;
		var boxHeight = rowHeight - spacing;

		$(".box").css("width", boxWidth);
		$(".box").css("height", boxHeight);

		//add hover effects
		$('.box').hover(function(){
			$(this).css('background-color', 'blue');
		}, function(){
			$(this).css('background-color', '#191E19');
		});
	};

	//the page initializes with a 40 x 40 grid
	size = 40;
	buildEtch(size);

	//Reset game using "Shake!" button

	$('button').click(function(){
		console.log("click!");
		$('.game').addClass("shake shake-constant shake-slow");
		setTimeout(function(){
			$('.game').removeClass("shake shake-constant shake-slow");
		}, 1200);
		$('.container').empty();
	});

	$('#shake').click(function(){
		buildEtch(size);
	});

	$('#resChange').click(function(){
		/*console.log("click!");
		$('.container').empty();*/
		haveSize = false;
		while (haveSize === false){
			size = prompt("Please enter a grid size from 1-128");
			if (size > 0 && size <= 128){haveSize = true}
			else {alert("The number you entered is outside the range!")};
		};	
		buildEtch(size);
	});

	//creates a random hex color

	var randColor = function(){
		colorOut = "#";
		colArr = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F']
		for (var i = 0; i < 6; i++){
			colorOut += colArr[Math.floor(Math.random()*15)];
		}
		return colorOut;
	};
	

	$('#crazy').click(function(){
		console.log(randColor());
		buildEtch(size);
		$('.box').hover(function(){
			$(this).css('background-color', randColor());
		}, function(){
			$(this).css('background-color', randColor());
		});
	});

});