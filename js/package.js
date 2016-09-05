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

function isSome(str) {

	return new RegExp(str, 'i').test(navigator.userAgent);
}

function getFontSizebyGivenLen($test, len) {
	
	$test.css({'width': '5em'});

	var w = $(window).width(),
		screenRatio = w / len,
		lenInPx = $test.width(),
		lenInEm = 5,
		pxToEmRatio = lenInPx / lenInEm;

		return ratio = (screenRatio / pxToEmRatio * 100) + '%';
};

function runFuncBySizeGrad(grad, func) {

	var w = $(window).width(),
		len, i;

	for (len = grad.length, i = 0; i < len; i++)
		if (grad[i + 1] ? w < grad[i + 1] : true) break;
	
	func(i);
};

function loadImgs(imgArr, func) {

	var imgElemArr = [],
		args = [].slice.call(arguments, 2),
		len = imgArr.length,
		num = 1, i;

	for (i = 0; i < len; i++) {

		$('<img src="' + imgArr[i] + '"><img>').load(function () {

			num === len ? func.apply(null, args) : num++;
		});
	};
};

function bindEvent() {

	var args = arguments, len, i;

	for (len = args.length, i = 0; i < len; i++) {

		(function () {

			var $obj = args[i][0],
				event = args[i][1],
				funcArr = args[i][2];

			$obj.on(event, function (e) {

				var len, i;

				for (len = funcArr.length, i = 0; i < len; i++) {

					funcArr[i](e);
				};
			});
		})()
	};
};


function setEvent(eventList) {

	return function (e) {

		var $obj = $(e.srcElement || e.target),
			objClass = $obj.attr('class');

		if (!objClass) return;
		
		var	classArr = objClass.split(' '),
			event = null, len, i;

		for (i = 0, len = classArr.length; i < len; i++) {

			event = eventList[classArr[i]];
			event ? event($obj) : null;
		};
	};
};

function changeClass($obj, class1Arr, class2Arr) {

	var len, i;

	for (len = class1Arr.length, i = 0; i < len; i++) 
		$obj.removeClass(class1Arr[i]);

	for (len = class2Arr.length, i = 0; i < len; i++) 
		$obj.addClass(class2Arr[i]);
};

function setBg($objs, picArr) {

	var len, i;

	for (len = picArr.length, i = 0; i < len; i++) {

		$objs.eq(i).css({'background-image': 'url(' + picArr[i] + ')'});
	};
};

function setImg($objs, picArr) {

	var len, i;

	for (len = picArr.length, i = 0; i < len; i++) {

		$objs.eq(i).attr('src', picArr[i]);
	};
};

