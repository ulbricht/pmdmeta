<?php

//write xml data to file
error_log("\nin write_to_file\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
session_start();
if (isset($_POST) && isset($_POST['storedata']) && isset($_POST['file'])){
    $data=$_POST['storedata'];
    $fname=$_POST['file'];
    saveMetadata($data, $fname);
}else{
 
    if (isset($_GET) && isset($_GET['file']) && strlen(isset($_GET['file']))>0)
        $downloadname=$_GET['file'];
    else
        $downloadname="metadata.xml";

    @ini_set('zlib.output_compression', 'Off');
    @ini_set('output_buffering', 'Off');
    @ini_set('output_handler', '');
    @apache_setenv('no-gzip', 1);	   
    
    
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.$downloadname.'"');
    header("Pragma: public");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header('Content-Length: '.strlen($_SESSION['storedata']));
    echo $_SESSION["storedata"];
    return;

}

function saveMetadata($data, $fname){
    error_log("\nsaving\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
    error_log($fname, 3, "/var/www/html/pmdmeta/php_logfile.log");
    $file = fopen($fname, 'w');//creates new file
    fwrite($file, $data);
    fclose($file); 

    //update json metadata file
    $jsonFname = str_replace("xml", "json", $fname);
    $jsonString = file_get_contents($jsonFname);
    $jsonData = json_decode($jsonString, true);
    $jsonData['status'] = "In Progress";
    $jsonData['last saved timestamp'] = date("Y-m-d H:i:s");
    $newJsonString = json_encode($jsonData);
    file_put_contents($jsonFname, $newJsonString);
}

?>

