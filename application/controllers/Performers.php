<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Performers extends CI_Controller {


	public function index()
	{
		$this->load->database();
		$query = $this->db->query('SELECT id, act_name FROM performers');

		foreach ($query->result() as $row)
		{
			echo $row->id;
			echo $row->act_name;
		}

		echo 'Total Results: ' . $query->num_rows();
	}
}
