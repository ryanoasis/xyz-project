<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Performers extends CI_Controller {


	public function index()
	{
		$this->load->database();
		$query = $this->db->query('SELECT * FROM performers');

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
