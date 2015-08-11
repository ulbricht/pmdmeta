<?php

//used to temporarily store xml data for download

session_start();

if (isset($_POST) && isset($_POST['storedata'])){
    $_SESSION['storedata']=$_POST['storedata'];
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


