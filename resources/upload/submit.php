<?php
	include 'write_to_file.php';
	include '../validate.php';

	ob_start();

	error_log("\nin submit\n", 3, "/var/www/html/pmdmeta/php_logfile.log");

	$data = $_POST['submitdata'];
	$meta_file = $_POST['file'];
	$curator = $_POST['curator'];
	$editor_metafile = $_POST['editor_metafile'];

	//first save the metadata
	$saved = saveMetadata($data, $meta_file, $editor_metafile, "metadata form auto-saved before submission");
	if ($saved === false) {
		error_log("\nexiting submit early\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
		return;
	}

	ob_end_clean();

	//then validate the data
	if (validateForm($data, "../checkentries.xslt") === false) {
		error_log("\nnot validated\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
		return;
	}
    error_log("\nvalidated\n", 3, "/var/www/html/pmdmeta/php_logfile.log");

	//update json metadata file
	$json_file = str_replace(".xml", ".json", $meta_file);
	$jsonString = file_get_contents($json_file);
	$jsonData = json_decode($jsonString, true);
	if ($curator == "True") {
		$jsonData['status'] = "Sent for Submitter Review";
		$jsonData['curator_id'] = getEditorIDFromMetafile($editor_metafile);
		//update provenance record
		$jsonData = updateProvenance($jsonData, $editor_metafile, "sent to submitter for review");
	} else {
		$jsonData['status'] = "Metadata Submitted";
		//update provenance record
		$jsonData = updateProvenance($jsonData, $editor_metafile, "metadata form submitted");
	}
	error_log($jsonData['status'], 3, "/var/www/html/pmdmeta/php_logfile.log");


	$newJsonString = json_encode($jsonData);
	file_put_contents($json_file, $newJsonString);


function getEditorIDFromMetafile($editor_metafile) {
    error_log("\n$editor_metafile\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
    $jsonString = file_get_contents($editor_metafile);
    $jsonData = json_decode($jsonString, true);
    return $jsonData['id'];
}

 ?>