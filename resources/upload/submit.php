<?php
	include 'write_to_file.php';
	include '../validate.php';

	ob_start();

	error_log("\nin submit\n", 3, "/var/www/html/pmdmeta/php_logfile.log");

	$data=$_POST['submitdata'];
	$meta_file=$_POST['file'];
	$curator_id = $_POST['curator_id'];
	//first save the metadata
	$saved = saveMetadata($data, $meta_file);
	if ($saved === false) {
		error_log("\nexiting submit early\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
		return;
	}

	//now validate the data
	ob_end_clean();
	if (validateForm($data, "../checkentries.xslt") === false) {
		error_log("\nnot validated\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
		return;
	}
    error_log("\nvalidated\n", 3, "/var/www/html/pmdmeta/php_logfile.log");

	//update json metadata file
	$json_file = str_replace(".xml", ".json", $meta_file);
	$jsonString = file_get_contents($json_file);
	$jsonData = json_decode($jsonString, true);
	if ($curator_id != "") {
		$jsonData['status'] = "Sent for Submitter Review";
		$jsonData['curator_id'] = $curator_id;
	} else {
		$jsonData['status'] = "Metadata Submitted";
	}
	
	error_log($jsonData['status'], 3, "/var/www/html/pmdmeta/php_logfile.log");
	$jsonData['metadata submit timestamp'] = date("Y-m-d H:i:s");
	$newJsonString = json_encode($jsonData);
	file_put_contents($json_file, $newJsonString);
?>