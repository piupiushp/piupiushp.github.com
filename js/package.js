var Position = {

	hCenter: function ($obj, $main, position) {

		var left;

		if (!$main) $main = $(window);

		left = ($main.width() - $obj.outerWidth(true)) / 2;
		$obj.css({'position': position ? position : 'absolute',
				  'left': left + 'px'});
	},

	vCenter: function ($obj, $main, position) {

		var top;

		if (!$main) $main = $(window);

		top = ($main.height() - $obj.outerHeight(true)) / 2;
		$obj.css({'position': position ? position : 'absolute',
				  'top': top + 'px'});
	},

	center: function ($obj, $main, position) {

		Position.hCenter($obj, $main, position);
		Position.vCenter($obj, $main, position);
	},
};

function isMobileAgent() {

	return /mobile/i.test(navigator.userAgent);
};

function isHorizontal() {

	var $win = $(window);

	return $win.width() > $win.height();
};

function setFontSize($obj, $test, screenRatio) {
	
	$test.css({'width': '5em'});

	var lenInEm = 5,
		lenInPx = $test.width(),
		emToPxRatio = lenInEm / lenInPx,
		ratio = emToPxRatio * screenRatio;

	$obj.css({'font-size': ratio * 2000 + '%'});
};

function getScreenRatioForGivenLen(pcLen, mobileHoriLen, mobileVertiLen) {

	var w = document.body.clientWidth,
		h = document.body.clientHeight,
		screenW = window.screen.availWidth;

	return isMobileAgent() ? 
				isHorizontal() ? 
					w / mobileHoriLen : 
					h / mobileVertiLen :
				screenW / pcLen;
};

function resizeForChangeOrientation(funcHori, funcVerti) {

	$win.width() > $win.height() ?  funcHori() : funcVerti();
};

function loadImgs(imgArr, func) {

	var imgElemArr = [],
		len = imgArr.length,
		num = 1, i;

	for (i = 0; i < len; i++) {

		$('<img src="' + imgArr[i] + '"><img>').load(function () {

			num === len ? func() : num++;
		});
	};
};

