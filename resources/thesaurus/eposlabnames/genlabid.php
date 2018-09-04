<?php

/*
	generate a laboratory ID based on the name:
	1) remove white space in the name
	2) convert letters to lower case
	3) create an MD5 checksum of the resulting name
*/

  $labs=json_decode(file_get_contents("names.json"),true);

  $outlabs=array();

  foreach ($labs as $lab){
	$idname=preg_replace('/\s+/', '', strtolower($lab["name"]));
	$lab["id"]=md5($idname);	
	array_push($outlabs,$lab);
  }

  file_put_contents("names.json",json_encode($outlabs));

?>
