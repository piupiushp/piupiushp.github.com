loading();

function loading() {

	var $loadCurtain = $('#load-curtain'),
		$loadStagePos = $('<div></div>'),
		$loadStage = $('<div></div>'),
		$face = $('<p>(-ω- )</p>'),
		face = [
			'(-ω- )',
			'(+ω+)',
			'(*ω* )',
			'( ^ω^)',
			'(;ω;)',
			'(。ω。)',　
			'(『ω′)',
			'(・ω・=)',
			'(￣ω￣)',
			'(〃ω〃)',
			'(≧ω≦)',
			'(。・ω・)',
			'(=・ω・=)',
			'( ＞ω＜)',
			'(′・ω・`)',
			'(/ω＼)',
			'(/ω・＼)',
			'(/・ω・＼)',
			'(ΘωΘ)',
			'(ΦωΦ)', 			
		],
		timeInterval = null,
		len = face.length, i = 0;

	$loadStagePos.css(
			{
				'position': 'absolute',
				'left': '50%',
				'top': '50%',
				'width': 0,
				'height': 0,
			}
		);

	$loadStage.css(
			{
				'position': 'absolute',
				'left': '-10em',
				'top': '-1em',
				'text-align': 'center',
				'font-size': '1.5em',
				'width': '20em',
				'height': '2em',
				'line-height': '2em',
			}
		);

	$loadStagePos.append($loadStage);
	$loadStage.append('<p>数据集合中ing!</p>').append($face);
	$loadCurtain.append($loadStagePos);

	timeInterval = setInterval(function () {

		i === len ? i = 0 : i++;
		$face.empty().text(face[i]);
	}, 100);

	$(window).load(function () {
		clearInterval(timeInterval);
		$loadCurtain.css({'display': 'none'});
	});
};

