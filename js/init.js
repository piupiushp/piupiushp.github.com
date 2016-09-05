var isMoblie = isSome('mobile'),
	$win = $(window),
	$body = $('body'),
	$main = $('#main'),
	$mainTest = $('#main-test');

//Run---------------------------------------------------------
init();

//Initialization----------------------------------------------
function init() {

	winResize();
	completeHtml();

	bindEvent(

			[
				$win,
				'resize',
				[winResize]
			],
			[
				$main,
				isMoblie ? 'touchstart' : 'click',
				[click]
			],
			[
				$win,
				'scroll',
				[scroll]
			]
		);
};

//Event-------------------------------------------------------
function winResize() {

	runFuncBySizeGrad(

			[0, 600],

			function (i) {

				var classArr = ['S', 'L'];

				$main.removeClass();
				$main.addClass(classArr[i]);	
			}
		);

	runFuncBySizeGrad(

			[0, 600, 800, 1000], 
			
			function (i) {

				var fontSizeArr = [
					'12px', 
					getFontSizebyGivenLen($mainTest, 50),
					getFontSizebyGivenLen($mainTest, 60),
					getFontSizebyGivenLen($mainTest, 80)
				];

				$main.css({'font-size': fontSizeArr[i]});
			}
		);
};

function scroll() {

};

function click(e) {

	setEvent(
			{
				'card-film': function ($obj) {

					var card = $obj.attr('card');

					$('#main-curtain').css({'display': 'block'});
					$('#main-stage').append($('#card' + card + '-content'));
				},
				'main-curtain': function () {

					var card = $('#main-stage').children('.card-content').attr('card');

					$('.card').eq(card).append($('#card' + card + '-content'));
					$('#main-curtain').css({'display': 'none'});
				},
			}
		)(e);
};

//Function-----------------------------------------------------
function completeHtml() {
	
	var $cards = $('.card'),
		cardsBg = [

			'pic/cbg0.jpg',
			'pic/cbg1.jpg',
			'pic/cbg2.jpg',
			'pic/cbg3.jpg',
			'pic/cbg4.jpg',
			'pic/cbg5.jpg',
			'pic/cbg6.jpg',
			'pic/cbg7.jpg',
		];

	setCard();
	setBg($cards, cardsBg);
};

function setCard() {

	var $cards = $('.card'),
		len = $cards.length, i = 0;

	for (; i < len; i++) {

		$cards.eq(i).css(
				{
					'transform': 'rotate(' + (-50 + i * 14) + 'deg)',
					'-ms-transform': 'rotate(' + (-50 + i * 14) + 'deg)',
					'-moz-transform': 'rotate(' + (-50 + i * 14) + 'deg)',
					'-webkit-transform': 'rotate(' + (-50 + i * 14) + 'deg)',
					'-o-transform': 'rotate(' + (-50 + i * 14) + 'deg)',
				}
			);
	};
};
