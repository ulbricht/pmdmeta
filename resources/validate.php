<?php

//used to temporarily store xml data for download
try{

	$xml=new DOMDocument(); 
	$xml->loadXML($_POST['validationdata']); 
	$xsl = new XSLTProcessor();    
        $xsldom=new DOMDocument();
        $xsldom->load("checkentries.xslt");
        $xsl->importStyleSheet($xsldom);    
        $validationresult=$xsl->transformToXML($xml);

        $validated = true;
        if (strpos($validationresult, 'class="error"') !== false) {
        	$validated = false;
        }  
        error_log("\nsuccess: true", 3, "/var/www/html/pmdmeta/php_logfile.log"); 
        error_log("\n$validationresult", 3, "/var/www/html/pmdmeta/php_logfile.log"); 
        error_log("\n$validated", 3, "/var/www/html/pmdmeta/php_logfile.log");     
	echo json_encode(array("success"=>true, "message"=>$validationresult), "validated"=>validated);
}catch (Exception $e){ 
	error_log("\nsuccess: false", 3, "/var/www/html/pmdmeta/php_logfile.log");  
    echo json_encode(array("success"=>false, "message"=>$e->getMessage()));                 
}



?>
