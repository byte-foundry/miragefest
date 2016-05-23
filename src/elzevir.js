// Setup fonts
Ptypo.createFont('elzevir-regular', 'elzevir').then( function() {
	Ptypo.changeParam(90, 'thickness', 'elzevir-regular');
});
Ptypo.createFont('elzevir-light', 'elzevir').then( function() {
	Ptypo.changeParam(65, 'thickness', 'elzevir-light');
});
Ptypo.createFont('elzevir-bold', 'elzevir').then( function() {
	Ptypo.changeParam(115, 'thickness', 'elzevir-bold');
});
Ptypo.createFont('elzevir-caption', 'elzevir').then( function() {
	Ptypo.changeParam(90, 'thickness', 'elzevir-caption');
});
Ptypo.createFont('elzevir-sans', 'elzevir').then( function() {
	Ptypo.changeParam(90, 'thickness', 'elzevir-sans');
});


// brightness( $('.bg').css('background-color') );
// var slider = 250;
//
// $('#brightness').on('change', function(){
//     $('body').css( 'background-color', 'rgb(' + $('#brightness').val() + ', ' + $('#brightness').val() + ', ' + $('#brightness').val() + ')' );
// 	brightness( $('body').css('background-color') );
// 	slider = $('#brightness').val();
// });
//
// function brightness( el ) {
//
// 	var rgb = el.match(/rgb\(([0-9]*), ([0-9]*), ([0-9]*)/);
// 	rgb.shift();
//     var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);
//     console.log(o);
//
// 	$('#show-brightness').html(o);
//
//     if(o < 50) {
//         Ptypo.changeParam(100, 'thickness', 'optical-elzevir');
// 		$('#show-thickness').html('100');
//     }
// 	else if( 50 < o && o < 200 ) {
//         Ptypo.changeParam( 100 - ( $('#brightness').val() - 50 ) * (20/150), 'thickness', 'optical-elzevir');
// 		$('#show-thickness').html( (100 - ( $('#brightness').val() - 50 ) * (20/150) ).toFixed(2));
//     }
// 	else {
// 		Ptypo.changeParam(80, 'thickness', 'optical-elzevir');
// 		$('#show-thickness').html('80');
// 	}
//
// 	return false;
// }
