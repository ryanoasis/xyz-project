<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Performers extends CI_Controller {


	public function index()
	{
		parse_str($_SERVER['QUERY_STRING']);

		$queryCommand = 'SELECT * FROM performers';

		if (isset($text)) {
			$searchableFields = ["act_name", "category_name", "state_name", "city_name"];
			//$queryCommand .= " WHERE `act_name` like '%" . $text . "%' ";
			$queryCommand .= " WHERE `" . implode("` like '%" . $text . "%' OR `", $searchableFields) . "` like '%" . $text . "%' ";
		}

		if (isset($sort, $direction)) {
			$queryCommand .= " ORDER BY " . $sort . " " . $direction;
		}

		$queryCommand .= ' LIMIT ' . $offset . ', ' . $limit;

		$this->load->database();

		$query = $this->db->query($queryCommand);

		$items['columns'] = $query->list_fields();

		foreach ($query->result() as $row)
		{
			foreach ($row as $key => $value) {
				$item[$key] = $value;
			}
			$items['data'][] = $item;
		}

		echo json_encode($items);

	}
}
