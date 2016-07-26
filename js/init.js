var isMobile = isMobileAgent(),
	$win = $(window),
	$main = $('#main'),
	$mainTest = $('#main-test'),
	$album = $('#album'),
	$curtain = $('#curtain'),
	$screen = $('#screen'),
	imgs = [

		'pic/0.jpg',
		'pic/1.jpg',
		'pic/2.jpg',
		'pic/3.jpg',
		'pic/4.jpg',
		'pic/5.jpg',
		'pic/6.jpg',
		'pic/7.jpg',
		'pic/8.jpg',
	],
	$intros = $('.intro'),
	$loadingCurtain = $('#loading-curtain'),
	$loadingScreen = $('#loading-screen'),
	$card = $('#card'),
	hCenter = Position.hCenter,
	vCenter = Position.vCenter,
	center = Position.center,
	draw = drawLoading($('#loading-screen canvas'), 300, 300, 50, 3, 0.3, 10),
	loadingInterval;


loading();

function loading() {

	winResize();
	$win.resize(winResize);
	loadingInterval = setInterval(loadInit, 33);
	loadImgs(['pic/bg.jpg'].concat(imgs), init);
};

function init() {

	var $cardTemp = $card.clone().removeAttr('id').removeClass('test'),
		event = setPlatform($album, $cardTemp, $curtain, imgs, $intros);
	
	clearInterval(loadingInterval);
	$album.css({'display': 'block'});

	isMobile ? 
		$main.on('touchend', function (e) { mainClick(e, event); }) :
		$main.click(function (e) { mainClick(e, event); });
	
	$loadingCurtain.animate({'opacity': 0}, 500, 'linear', function () {

		$loadingCurtain.css({'display': 'none'});
	})
};

function mainClick(e, event) {

	var $obj = $(e.srcElement || e.target);

	switch ($obj.attr('class')) {

		case 'card-coating':
			$obj = $obj.parent();
			event.cardClick($obj);
			break;
		case 'curtain':
			event.curtainClick($obj);
		default:
			break;
	};
};

function winResize() {

	screenRatio = getScreenRatioForGivenLen(1000, 1000, 1000);
	setFontSize($main, $mainTest, screenRatio);

	center($screen, $main);
	center($loadingScreen, $loadingCurtain);

	isMobile ? resizeForChangeOrientation(funcHori, funcVerti) : funcHori();
};

function funcHori() {

	var $card = $('.card');

	$main.addClass('hori').removeClass('verti');
	$album.css({'top': 'auto'});
	hCenter($album, $main);
};

function funcVerti() {

	var $card = $('.card');

	$main.addClass('verti').removeClass('hori');
	$album.css({'left': 'auto'});
	vCenter($album, $main);
};

function loadInit() {

	$loadingScreen.css({'display': 'block'});
	draw();
};
