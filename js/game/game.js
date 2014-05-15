var Settings = require('/js/game/settings.js').Settings;

var Game = function (wheel) {
	// PRIVATE VARS
	var state = {
		points: 0,
		rolls: 0 ,
		donate: 0,
	}, oldState = $.extend(true, {}, state);

	var lastAction = -1;
	var segments = Settings.segments;
	segments.shuffle();

	var segment_functions = [function (val) {
		var add = parseInt(val) || 0;
		state.points += add;
		if(state.points < 0)
			state.points = 0;
	}, function () {		// 1
		state.points = 0;
	}, function () {		// 2
		state.donate += 1;
	}, function () {		// 3
		segment = segments[lastAction];
		segment_functions[segment.functor].call(undefined, segment.label);
		segment_functions[segment.functor].call(undefined, segment.label);
	}, function () {		// 4
		state.rolls += 2;
	}, function () {		// 5
		state.rolls += 1;
	}, function () {		// 6
		state.rolls -= 1;
	}, function () {		// 7
		var temp = $.extend(true, {}, state);
		state = oldState;
		oldState = temp;
	}];

	// PRIVATE FUNCS
	var updateState = function () {
		$('#rolls').text(state.rolls);
		$('#points').text(state.points);
		$('#donate').text(state.donate);
	};

	// PUBLIC FUNCS
	this.resetState = function () {
		state.points = 0;
		state.rolls = 0;
		state.donate = 0;
		$('#stack').empty();
		updateState();
	};

	// EVENT HANDLERS

	$('#info div').change(function () {
		state.points = parseInt($('#points').text()) || 0;
		state.rolls = parseInt($('#rolls').text()) || 0;
		state.donate = parseInt($('#donate').text()) || 0;
	}).wysiwygEvt();

	// INIT
	wheel.segments = $.map(segments, function (el) {
		return el.label;
	});
	wheel.update();

	$(document).on('wheel_finished', function (e, data) {
		if(segments[data.segment].functor != 7)
			oldState = $.extend(true, {}, state);

		$('#stack').append('<p>'+segments[data.segment].label+'</p>');
		segment = segments[data.segment];
		segment_functions[segment.functor].call(undefined, segment.label);

		state.rolls -= 1;
		oldState.rolls -= 1;

		if(segments[data.segment].functor != 3)
			lastAction = data.segment;

		updateState();
		if(state.rolls > 0)
			setTimeout(wheel.spin, 1000);
	});
};