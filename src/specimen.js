// Setup fonts
Ptypo.createFont('grotesk-light-italic', 'venus').then( function() {
	Ptypo.changeParam(10, 'thickness', 'grotesk-light-italic');
	Ptypo.changeParam(5, 'slant', 'grotesk-light-italic');
});

Ptypo.createFont('elzevir-book', 'elzevir').then( function() {
	Ptypo.changeParam(80, 'thickness', 'elzevir-book');
});

Ptypo.createFont('elzevir-body', 'elzevir').then( function() {
	Ptypo.changeParam(90, 'thickness', 'elzevir-body');
	Ptypo.changeParam(5, 'slant', 'elzevir-body');
});

Ptypo.createFont('elzevir-normal', 'elzevir').then( function() {
	Ptypo.changeParam(70, 'thickness', 'elzevir-normal');
});

Ptypo.createFont('fell-normal', 'fell').then( function() {
	Ptypo.changeParam(3, 'width', 'fell-normal');
});

$( document ).ready(function() {
	$( window ).scroll(function() {
		var viewableOffset = Math.sqrt( $(window).scrollTop() ) * 2;
		Ptypo.changeParam(viewableOffset, 'thickness', 'elzevir-normal');
	});
});

$( window ).resize(function() {
	getPx();
	ratioHW();
});

function getPx() {
	var width = $(window).width() / 500;
	$('.getPx').css('font-size', width + 'em');
	var newParam = Math.max(
		15,
		1 / parseInt($('.getPx').css('font-size'), 10) * 10000
	);
	Ptypo.changeParam(newParam, 'thickness', 'grotesk-light-italic');
}

function ratioHW() {
	var newParam = $(window).width() / $(window).height() * 50;
	Ptypo.changeParam(85, 'serifHeight', 'elzevir-body');
	Ptypo.changeParam(newParam, 'serifWidth', 'elzevir-body');
	Ptypo.changeParam(newParam / 50 * 1.2, 'width', 'elzevir-body');
	Ptypo.changeParam(newParam / 50 * 1.2, 'spacing', 'elzevir-body');
}


$(document.body).on('keyup','.stringLength', function() {
	var length = $(this).contents().text().length;
	if (length < 0) { length = 1 };
	console.log(length);
	Ptypo.changeParam(6 / length, 'width', 'fell-normal');
	Ptypo.changeParam(Math.min(75, 75 * (6 / length)), 'serifWidth', 'fell-normal');
});

$('.bg-img-switch > div').on('click', function() {
	var color = $(this).attr('id');
	// console.log(color);
	$('.bg-img').removeClass();
	$('#bg-img').addClass('bg-img center-hv bg-' + color);
	brightness( $('#bg-img').css('background-color') );
});

function brightness( el ) {

	var rgb = el.match(/rgb\(([0-9]*), ([0-9]*), ([0-9]*)/);
	rgb.shift();
    var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);
    console.log(o);

    if(o < 50) {
        Ptypo.changeParam(90, 'thickness', 'elzevir-book');
    }
	else if( 50 < o && o < 100 ) {
        Ptypo.changeParam(80, 'thickness', 'elzevir-book');
    }
	else {
		Ptypo.changeParam(70, 'thickness', 'elzevir-book');
	}
	return false;
}
