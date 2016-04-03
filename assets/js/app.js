$(function() {
	/**
	 * Application level
	 */

	init();

	function init() {
		var options = {
			offset: 0,
			limit: 25
		};

		$("#performers")
		.bootstrapTable({
			columns: [
				{ field: "ID", title: "ID" },
				{ field: "act_name", title: "Act Name", sortable: true },
				{ field: "url", title: "" },
				{ field: "thumbnail", title: "Thumbnail" },
				{ field: "city_name", title: "City", sortable: true },
				{ field: "state_code", title: "State Code", sortable: true },
				{ field: "state_name", title: "State", sortable: true },
				{ field: "country_code", title: "Country Code", sortable: true },
				{ field: "category_name", title: "Category Name", sortable: true }
			],
			pagination: true,
			pageSize: options.limit,
			pageList: [25, 50, 75, 100],
			sidePagination: 'server',
			showColumns: true,
			search: true,
			onPageChange: function(number, size) {
				getPerformers({ offset: (number - 1) * options.limit });
			},
			onSort: function(name, order) {
				getPerformers({ sort: name, direction: order });
			}
		});
		getPerformers(options);
	}

	function getPerformers(options) {
		var data = {};

		data.offset = options.offset || 0;
		data.limit = options.limit || 25;

		if (options.direction) {
			data.direction = options.direction;
		}

		if (options.sort) {
			data.sort = options.sort;
		}

		$.ajax({
			url: "index.php/performers",
			dataType: "json",
			data: data,
			success: successHandler,
			error: errorHandler
		});
	}

	function successHandler(response) {
		// todo check response

		var data = response.data;
		var dataLength = data.length;
		var i = 0;
		var field;
		var row;

		for (; i < dataLength; i++) {
			row = data[i];

			for (field in row) {
				if (field === "thumbnail") {
					row[field] = "<img src='" + JSON.parse(row[field]).url + "' />";
				}
			}
		}

		$.ajax({
			url: "index.php/performers",
			dataType: "json",
			data: data,
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
		var field;
		var row;

		for (; i < dataLength; i++) {
			row = data[i];

			for (field in row) {
				if (field === "thumbnail") {
					row[field] = "<img src='" + JSON.parse(row[field]).url + "' />";
				}
			}
		}

		var j = 0;
		var columns = response.columns;
		var columnsLength = columns.length;
		var columnStructure = [];

		for (; j < columnsLength; j++) {
			columnStructure.push({ field: columns[j], title: columns[j].replace("_", " "), sortable: true });
		}

		$("#performers")
			.bootstrapTable("load", { total: 100, rows: response.data });
	}

	function errorHandler() {
		console.log("error");
	}
});
