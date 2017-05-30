<?php

//write xml data to file
error_log("\nin write_to_file\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
session_start();
if (isset($_POST)){

    if (isset($_POST['storedata']) && isset($_POST['file'])){
        $data=$_POST['storedata'];
        $fname=$_POST['file'];
        $editor_metafile=$_POST['editor_metafile'];
        saveMetadata($data, $fname, $editor_metafile, "manual metadata edit");
    }
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

function getEditorNameFromMetafile($editor_metafile) {
    error_log("\n$editor_metafile\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
    $jsonString = file_get_contents($editor_metafile);
    $jsonData = json_decode($jsonString, true);
    return $jsonData['user_name'];
}

function updateProvenance($jsonData, $editor_metafile, $action) {
    error_log("\nupdate provenance\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
    //get editor name from the metafile
    $editor = getEditorNameFromMetafile($editor_metafile);

    $newProvenance = array('timestamp'=> date("Y-m-d H:i:s"),
                      'editor'=> $editor,
                      'action'=> $action);
    if (array_key_exists('provenance', $jsonData)) {
        array_push($jsonData['provenance'], $newProvenance);
    } else {
        $jsonData['provenance'] = array($newProvenance);
    }

    return $jsonData;
}


function saveMetadata($data, $fname, $editor_metafile, $action){
    error_log("\nsaving\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
    $file = fopen($fname, 'w');//creates new file
    if ($file === false) {
        error_log("\nerror saving\n", 3, "/var/www/html/pmdmeta/php_logfile.log");
        echo json_encode(array("success"=>false));
        return false;
    }
    fwrite($file, $data);
    fclose($file); 

    //update json metadata file
    $jsonFname = str_replace("xml", "json", $fname);
    $jsonString = file_get_contents($jsonFname);
    $jsonData = json_decode($jsonString, true);
    $jsonData['status'] = "In Progress";

    //update provenance record
    $jsonData = updateProvenance($jsonData, $editor_metafile, $action);

    $newJsonString = json_encode($jsonData);
    file_put_contents($jsonFname, $newJsonString);

    echo json_encode(array("success"=>true));
    return true;
}

?>

