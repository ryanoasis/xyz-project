$(function() {
	/**
	 * Application level
	 */

	init();

	function init() {
		getPerformers();
	}

	function getPerformers() {
		$.ajax({
			url: "index.php/performers",
			success: successHandler,
			error: errorHandler
		});
	}

	function successHandler(argument) {
		console.log("success");
	}

	function errorHandler(argument) {
		console.log("error");
	}
});
