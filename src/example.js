Ptypo.createFont('fontone', 'venus');
Ptypo.createFont('fonttwo', 'venus');
Ptypo.createFont('fontthree', 'venus');

function simpleGetComputedStyle(el, styleProp) {
	return window.getComputedStyle(el, null).getPropertyValue(styleProp);
}

function TestElem(el) {
	this.container = document.createElement('div');
	this.container.style.width = el.offsetWidth + 'px';
	this.container.classList.add('test-container');
	this.span = document.createElement('span');
	this.span.style.fontSize = simpleGetComputedStyle(el, 'font-size');
	this.span.style.fontFamily = simpleGetComputedStyle(el, 'font-family');
	this.span.classList.add('test-span');
	this.span.innerText = el.innerText;

	this.container.appendChild(this.span);
	document.body.appendChild(this.container);
}

TestElem.prototype.getSize = function() {
	return {
		width: this.span.offsetWidth,
		height: this.span.offsetHeight,
	}
}

TestElem.prototype.clean = function() {
	document.body.removeChild(this.container);
}

TestElem.prototype.setFontSize = function( fontInt ) {
	this.span.style.fontSize = fontInt + 'px';
}

TestElem.prototype.getFontSize = function() {
	var match = this.span.style.fontSize.match(/([0-9]*)px/);
	return match ? parseInt(match[1]) : 0;
}

var intervalIds = {};
function changeParamToRef(el, test, prop, ref, value, inc) {
	return function xheight() {
		if (test.getSize()[prop] > ref - 5 && test.getSize()[prop] < ref + +5) {
			test.clean();
			return clearInterval(intervalIds[el.attributes['data-font'].value + prop]);
		}
		Ptypo.values[el.attributes['data-font'].value][value] += Math.sign(ref - test.getSize()[prop]) * inc;
		Ptypo[el.attributes['data-font'].value].update(Ptypo.values[el.attributes['data-font'].value]);
	}
}

function changeWidthForMultline(test, el, inc) {
	var baseHeight = test.getSize().height;
	return function() {
		if (baseHeight < test.getSize().height) {
			test.clean();
			Ptypo.values[el.attributes['data-font'].value].width -= 5 * inc;
			Ptypo[el.attributes['data-font'].value].update(Ptypo.values[el.attributes['data-font'].value]);
			return clearInterval(intervalIds[el.attributes['data-font'].value + 'multi']);
		}

		Ptypo.values[el.attributes['data-font'].value].width += inc;
		Ptypo[el.attributes['data-font'].value].update(Ptypo.values[el.attributes['data-font'].value]);
	}
}

function changeSizeToRef(ref, test, start) {
	var height = ref.offsetHeight;
	var testHeight = test.getSize().height;

	return function xheight() {
		if (
			(test.getSize().height > ref.offsetHeight && height > testHeight)
				|| (test.getSize().height < ref.offsetHeight - 10 && height < testHeight)) {
			test.clean();
			fitToMulti(ref);
			return clearInterval(intervalIds[ref.attributes['data-font'].value + 'fontSize']);
		}

		var fontSize = test.getFontSize() + 3;

		test.setFontSize(fontSize);
		ref.style.fontSize = test.getFontSize() + 'px';
	}
}

function fitToSize(ref) {
	var test = new TestElem(ref);
	var interFunc = changeSizeToRef(ref, test, test.getFontSize());

	intervalIds[ref.attributes['data-font'].value + 'fontSize'] = setInterval(interFunc, 50);
}

function fitToWidth(ref) {
	var test = new TestElem(ref);

	var interFunc = changeParamToRef(ref, test, 'width', ref.offsetWidth, 'width', .05);

	intervalIds[ref.attributes['data-font'].value + 'width'] = setInterval(interFunc, 50);
}

function fitToMulti(ref) {
	var test = new TestElem(ref);

	var interFunc = changeWidthForMultline(test, ref, 0.001);

	intervalIds[ref.attributes['data-font'].value + 'multi'] = setInterval(interFunc, 50);
}

function fitToHeight(ref) {
	var test = new TestElem(ref);

	var interFunc = changeParamToRef(ref, test, 'height', ref.offsetHeight, 'xHeight', 30);

	intervalIds[ref.attributes['data-font'].value + 'height'] = setInterval(interFunc, 50);
}

window.isTextOnOneLine = function( el ) {
	var container = document.createElement('div');
	container.style.width = el.offsetWidth + 'px';
	var span = document.createElement('span');
	span.style.fontSize = window.getComputedStyle(el, null).getPropertyValue('font-size');
	span.style.fontFamily = window.getComputedStyle(el, null).getPropertyValue('font-family');
	span.innerText = el.innerText;

	var container2 = document.createElement('div');
	container2.style.width = el.offsetWidth + 'px';
	var spanNowrap = document.createElement('span');
	spanNowrap.style['white-space'] = 'nowrap';
	spanNowrap.innerText = el.innerText;
	spanNowrap.style.fontSize = span.style.fontSize;
	spanNowrap.style.fontFamily = span.style.fontFamily;

	container.appendChild(span);
	container2.appendChild(spanNowrap);
	document.body.appendChild(container);
	document.body.appendChild(container2);
	var result = span.offsetHeight === spanNowrap.offsetHeight;

	document.body.removeChild(container);
	document.body.removeChild(container2);
	return result;
}

function fitTextToElement(el) {
	var textOnOneLine = isTextOnOneLine(el);
	if (textOnOneLine) {
		fitToHeight(el);
		fitToWidth(el);
	}
	else {
		fitToSize(el, parseInt(window.getComputedStyle(el, null).getPropertyValue('font-size').match(/([0-9]*)px/)[1]));
	}
}

window.addEventListener('keypress', function(e) {
	if (e.charCode === 101) {
		var el = document.getElementById('fontone');
		el.contentEditable = true;
	}

	if (e.charCode === 115) {

		Ptypo.values.fontone.thickness = 250;
		Ptypo.values.fonttwo.slant = 10;
		fitTextToElement(document.getElementById('fontone'));
		fitTextToElement(document.getElementById('fonttwo'));
		fitTextToElement(document.getElementById('fontthree'));
	}
	if (e.charCode === 117) {
		fitTextToElement(document.getElementById('fonttwo'));
	}

	if (e.charCode === 116) {
		Object.keys(intervalIds).forEach(function(key) {
			clearInterval(intervalIds[key]);
		});
	}
});
