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
			dataType: "json",
			success: successHandler,
			error: errorHandler
		});
	}

	function successHandler(response) {
		console.log("success");
		// todo check response

		var data = response.data;
		var dataLength = data.length;
		var i = 0;
		var structure;
		var field;
		var row;

		for (; i < dataLength; i++) {
			row = data[i];
			structure += "<tr>";

			for (var field in row) {
				if (field === "thumbnail") {
					row[field] = "<img src='" + JSON.parse(row[field]).url + "' />";
				}

				structure += "<td>" + row[field] + "</td>";
			}

			structure += "</tr>";
		}

		$("#performers tbody").append(structure);
	}

	function errorHandler() {
		console.log("error");
	}
});
