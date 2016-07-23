function setPlatform($platform, $cardTemp, $prev, $next, $curtain, imgs, $intros) {

	var cards = [],
		currPos = 0;

	init();

	function init() {

		var card = {},
			num = imgs.length > 9 ? 9 : imgs.length,
			i;

		arrorContr();
		isBinding = true;

		for (i = 0; i < num; i++) {

			card = setCard(imgs[i], $intros.eq(i), i);
			addCard(card, 'append');

		};
	};

	function setCard(imgSrc, $intro, pos) {

		var card ={},
			$newCard = $cardTemp.clone(),
			deg = -40 + pos * 10;

		card.$card = $newCard;
		card.deg = deg;
		$newCard.css({'background-image': 'url(' + imgSrc + ')'});
		$newCard.css({'transform': 'rotate(' + deg + 'deg)'});
		$newCard.prepend($intro);

		return card;
	};

	function addCard(card, type) {

		switch (type) {

			case 'append':
				$platform.append(card.$card);
				cards.push(card);
				break;

			case 'prepend':
				$platform.prepend(card.$card);
				cards.unshift(card);
				break;

			default: 
				break;
		};
	};

	function delCard(pos) {

		var card = cards.splice(pos, 1)[0];

		card.$card.remove();
	};

	function moveCards(isPrev) {

		var ready = {},
			src, $intro, card, i;

		ready.count = 0;
		isBinding = false;

		if (isPrev) {

			src = imgs[currPos + 9];
			$intro = $intros.eq(currPos + 9);
			card = setCard(src, $intro, 9);
			currPos++;			
			delCard(0);
			addCard(card, 'append');

			for (i = 0; i < 9; i++) {
				moveCard(cards[i], true, ready);
			};

		}else {

			currPos--;
			src = imgs[currPos];
			$intro = $intros.eq(currPos);
			card = setCard(src, $intro, -1);
			delCard(8);
			addCard(card, 'prepend');

			for (i = 0; i < 9; i++) {
				moveCard(cards[i], false, ready);
			};
		};

		arrorContr();
	};

	function moveCard(card, isPrev, ready) {

		var currdeg = card.deg,
			ddeg = isPrev ? -1 : 1,
			i = 1;

		setTimeout(function () {

			card.deg = currdeg + i * ddeg;
			card.$card.css({'transform': 'rotate(' + card.deg + 'deg)'});
			i++;

			i > 10 ? 
				ready.count === 8 ? isBinding = true : ready.count++ :
				setTimeout(arguments.callee, 33);

		}, 33);
	};

	function arrorContr() {

		switch (currPos) {

			case 0:
				$next.css({'display': 'none'});
				break;
			case imgs.length - 9:
				$prev.css({'display': 'none'});	
				break;
			default:
				$prev.css({'display': 'block'});
				$next.css({'display': 'block'});
				break; 
		};
	};

	return {

		cardClick: function ($obj) {

			var $info = $obj.find('.info').clone().removeClass('test');

			$curtain.children('#screen').append($info);
			$curtain.css({'display': 'block'});
		},
		arrorClick: function ($obj) {

			isBinding ? 
				$obj.attr('id') === 'prev' ? moveCards(true) : moveCards(false) : 
				null;
		},
		curtainClick: function ($obj) {

			$obj.children('#screen').empty();
			$obj.css({'display': 'none'});
		},
	};
};