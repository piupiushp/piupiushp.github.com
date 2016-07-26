function setPlatform($platform, $cardTemp, $curtain, imgs, $intros) {

	init();

	function init() {

		var i;

		for (i = 0; i < 9; i++) {

			setCard(imgs[i], $intros.eq(i), i);
		};
	};

	function setCard(imgSrc, $intro, pos) {

		var $newCard = $cardTemp.clone(),
			deg = -40 + pos * 10;

		$newCard.css({'background-image': 'url(' + imgSrc + ')'});
		$newCard.css({'transform': 'rotate(' + deg + 'deg)'});
		$newCard.prepend($intro);
		$platform.append($newCard);

		return card;
	};

	return {

		cardClick: function ($obj) {

			var $info = $obj.find('.info').clone().removeClass('test');

			$curtain.children('#screen').append($info);
			$curtain.css({'display': 'block'});
		},
		curtainClick: function ($obj) {

			$obj.children('#screen').empty();
			$obj.css({'display': 'none'});
		},
	};
};