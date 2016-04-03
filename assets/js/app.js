$(function() {
	/**
	 * Application level
	 */

	var columns = 7;
	/**
	 * @property {number} delay The delay in ms to test the ajax with
	 */
	var delay = 2000;

	init();

	function init() {
		var options = {
			offset: 0,
			limit: 25
		};

		$("#performers")
		.bootstrapTable({
			showToggle: true,
			columns: [
				{ field: "act_name", title: "Act Name", sortable: true },
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

		addLoader();

		getPerformers(options);

		$(window).on("popstate", function(e) {
			//console.log(e);
			//console.log("popstate");
			//console.log(history.state);
			renderState(history.state);
		});
	}

	function renderState(state) {
		if (state.view === "index") {
			renderPerformersList();
		}
		else if (state.view === "details") {
			renderPerformer(getPerformerFromCacheByID(state.id));
		}
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

		setTimeout(function() {
			$.ajax({
				url: "index.php/performers",
				dataType: "json",
				data: data,
				success: successHandler,
				error: errorHandler
			});
		}, delay);
	}

	function successHandler(response) {
		//console.log("success");
		// todo check response

		var data = response.data;
		var dataLength = data.length;
		var i = 0;
		var field;
		var row;

		// simple cache
		$.cache = {};
		$.cache.performers = $.extend(true, [], data);

		for (; i < dataLength; i++) {
			row = data[i];

			for (field in row) {
				// safety first ;)
				if (row.hasOwnProperty(field)) {
					if (field === "thumbnail") {
						row[field] = "<a href='performer/" + row.url + "'><img src='" + JSON.parse(row[field]).url + "' /></a>";
					}

					if (field === "act_name") {
						row[field] = "<a href='performer/" + row.url + "'>" + row[field] + "</a>";
					}
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

		removeLoader();

		$("#performers").delegate("a", "click", function(e) {
			var url = $(this).attr("href").split("/")[1];
			var performer = getPerformerFromCacheByURL(url);
			e.preventDefault();
			console.log(url);
			renderPerformer(performer);
		});

		$("#performerClose").on("click", function(e) {
			var href = window.location.href;
			var index = href.substr(0, href.lastIndexOf("/") + 1);
			history.pushState({ view: "index", id: "" }, "", index);
			//renderPerformersList();
			renderState(history.state);
		});

		$("#performerNext").on("click", function(e) {
			var next = getNextPerformer($.cache.currentPerformer);
			$(".performer-detail-page").animate(
				{ width: "toggle" },
				{
					duration: 800,
					done: function() {
						renderPerformer(next);
						//$(".performer-detail-page").animate({ width: "toggle" });
					}
				}
			);
		});

		history.pushState({ view: "index", id: "" }, "", window.location.href);
	}

	function errorHandler() {
		console.log("error");
		removeLoader();
	}

	function renderPerformersList() {
		$(".pages").hide();
		$(".performers-list-page").show();
	}

	function renderPerformer(performer) {
		var imgURL = JSON.parse(performer.thumbnail).url;

		$.cache.currentPerformer = performer;

		$(".pages").hide();
		console.log(performer);
		console.log(performer.act_name);
		$(".performer-detail-page").find('h3').text(performer.act_name);
		$(".performer-detail-page").find('img').attr("src", imgURL);
		$(".performer-detail-page").find('.info').empty();
		$(".performer-detail-page").find('.info').append(performer.category_name + "<br/>" + performer.city_name + ", " + performer.state_name);
		$(".performer-detail-page").show();
		history.pushState({ view: "details", id: performer.ID }, performer.act_name, performer.url);
	}

	function getPerformerFromCacheByURL(url) {
		return $.cache.performers.filter(function(item) { return item.url === url; })[0];
	}

	function getPerformerFromCacheByID(id) {
		return $.cache.performers.filter(function(item) { return item.ID === id; })[0];
	}

	function getNextPerformer(performer) {
		var i = 0;
		var performers = $.cache.performers;
		var length = performers.length;

		for (; i < length; i++) {
			if (performers[i].ID === performer.ID) {
				if (i === length - 1) {
					return performers[0];
				}
				else {
					return performers[i + 1];
				}
			}
		}
	}

	function addLoader() {
		$("#performers tbody").empty().append("<tr><td class='loader' colspan=" + columns + "></td></tr>");
	}

	function removeLoader() {
		$("#performers tbody tr td.loader").closest("tr").remove();
	}
});
