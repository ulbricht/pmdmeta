<?php
    
    $file=$_REQUEST["object"];

    header("Content-type: text/xml");     
    if (isset($file)){

            //error_log("\nfile:", 3, "/var/www/html/pmdmeta/php_logfile.log");
            //error_log($file, 3, "/var/www/html/pmdmeta/php_logfile.log");
            $xml = file_get_contents($file);
            echo $xml;
    }
?>