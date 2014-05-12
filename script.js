$(document).ready(function(){

	// builds grid of numRows x numCols <div> elements
	var buildEtch = function(sz){
		var numRows =  sz;
		var numCols =  sz;

		for (var i = 0; i < numRows; i++){
			$(".container").append("<div class='row'></div>");
		};

		//This function was necessary to run the script in Firefox 29.  Otherwise boxMargin and other vars return NaN

		var checkBrowser = function(str){
			if (navigator.userAgent.search("Firefox") >= 0){str += "-top" } ;
			console.log(str);
			return str;
		};

		var rowHeight = $('.container').height()/numRows;
		var rowWidth = $(".container").width() - parseFloat($(".container").css(checkBrowser("padding")));
		$(".row").css("height", rowHeight);
		$(".row").css("width", rowWidth);
	

		for (var i = 0; i < numCols; i++){
			$(".container").children().append('<div class="box"></div>');
		};

		var boxMargin = $('.box').css(checkBrowser('margin'));
		var boxPadding = $('.box').css(checkBrowser('padding'));
		var boxBorder = $('.box').css(checkBrowser('border')+"-width");
		var spacing = 2*(parseInt(boxMargin) + parseInt(boxPadding) + parseInt(boxBorder));
		var boxWidth = rowWidth/numCols - spacing;
		var boxHeight = rowHeight - spacing;
		console.log(boxMargin)


		$(".box").css("width", boxWidth.toString());
		$(".box").css("height", boxHeight.toString());

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
		haveSize = false;
		while (haveSize === false){
			oldSize = size;
			size = prompt("Please enter a grid size from 1-128");
			if (size > 0 && size <= 128){haveSize = true}
			else if(size === null){
				size = oldSize;
				haveSize = true  }
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

	$('#advanced').click(function(){
		buildEtch(size);
		$('.box').css('opacity',0);
		$('.box').hover(function(){
			console.log($(this).css('opacity'));
			$(this).css('opacity', function(){
				return parseFloat($(this).css('opacity')) + 0.2;
			});
		});
	});
	

	$('#crazy').click(function(){
		buildEtch(size);
		$('.box').hover(function(){
			$(this).css('background-color', randColor());
		}, function(){
			$(this).css('background-color', randColor());
		});
	});

});