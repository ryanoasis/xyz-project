<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Performers extends CI_Controller {


	public function index()
	{
		parse_str($_SERVER['QUERY_STRING']);

		$queryCommand = 'SELECT * FROM performers';

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
