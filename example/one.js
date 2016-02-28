Ptypo.createFont('typo');

Ptypo.createFont('typo2');

document.getElementById('plus').addEventListener('click', function() {
	var newParam = Ptypo.getParam('thickness', 'typo2') + 10;
	Ptypo.changeParam(newParam, 'thickness', 'typo2');
});

document.getElementById('minus').addEventListener('click', function() {
	var newParam = Ptypo.getParam('thickness', 'typo2') - 10;
	Ptypo.changeParam(newParam, 'thickness', 'typo2');
});
