<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>XYZ</title>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

	<link rel="stylesheet" type="text/css" href="assets/css/app.css" />
</head>
<body>

<div id="container">
	<h1>XYZ</h1>
	<div class="pages performers-list-page">
		<table id="performers">
			<thead>
			</thead>
			<tbody>
			</tbody>
			<tfoot>
			</tfoot>
		</table>
	</div>
	<div class="pages performer-detail-page">
		<h3></h3>
		<div class="info"></div>
		<div id="performerPrevious" class="btn btn-primary"><-</div>
		<img src="" />
		<div id="performerNext" class="btn btn-primary">-></div>
		<br/>
		<br/>
		<div id="performerClose" class="btn btn-primary">Close</div>
	</div>
</div>

<!-- non blocking JS ;) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/locale/bootstrap-table-en-US.min.js"></script>
<script type="application/javascript" src="assets/js/app.js"></script>
</body>
</html>
