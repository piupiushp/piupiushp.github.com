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
		'pic/9.jpg',
		'pic/10.jpg',
		'pic/11.jpg',
		'pic/12.jpg',
		'pic/13.jpg',
		'pic/14.jpg',
	],
	$intros = $('.intro'),
	$loadingCurtain = $('#loading-curtain'),
	$loadingScreen = $('#loading-screen'),
	hCenter = Position.hCenter,
	vCenter = Position.vCenter,
	center = Position.center,
	draw = drawLoading($('#loading-screen canvas'), 300, 300, 50, 3, 0.3, 10),
	loadingInterval = setInterval(draw, 33);


winResize();
$win.resize(winResize);
loadImgs(['pic/bg.jpg'].concat(imgs), init);

function init() {

	var $card = $('#card'),
		$loadingCurtain = $('#loading-curtain'),
		$cardTemp = $card.clone().removeAttr('id').removeClass('test'),
		event = setPlatform($album, $cardTemp, $('#prev'), $('#next'), 
					$curtain, imgs, $intros);
	
	clearInterval(loadingInterval);
	$main.click(function (e) { mainClick(e, event); });
	$album.css({'display': 'block'});
	$loadingCurtain.animate({'opacity': 0}, 500, 'linear', function () {

		$loadingCurtain.css({'display': 'none'});
	})
};

function winResize() {

	screenRatio = getScreenRatio(1.5, 1);
	setFontSize($main, $mainTest, screenRatio);
	isMobile ? resizeForChangeOrientation(funcHori, funcVerti) : funcHori();
	center($screen, $main);
	center($loadingScreen, $loadingCurtain);
};

function mainClick(e, event) {

	var $obj = $(e.srcElement || e.target);

	switch ($obj.attr('class')) {

		case 'arror': 
			event.arrorClick($obj);
			break;
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

function resizeForChangeOrientation(funcHori, funcVerti) {

	$win.width() > $win.height() ?  funcHori() : funcVerti();
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
