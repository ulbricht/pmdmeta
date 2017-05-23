<?php
error_log("\nin validate.php", 3, "/var/www/html/pmdmeta/php_logfile.log"); 
try{
    if (isset($_POST) && isset($_POST['validationdata'])){
        validateForm($_POST['validationdata'], "checkentries.xslt") ;
    }
}catch (Exception $e){ 
	error_log("\nsuccess: false", 3, "/var/www/html/pmdmeta/php_logfile.log");  
    echo json_encode(array("success"=>false, "message"=>$e->getMessage())); 
    return false;                
}

function validateForm($validationdata, $xslfile){
    $xml=new DOMDocument(); 
    $xml->loadXML($validationdata);
    $xsl = new XSLTProcessor();    
    $xsldom=new DOMDocument();
    $xsldom->load($xslfile);
    $xsl->importStyleSheet($xsldom);    
    $validationresult=$xsl->transformToXML($xml);

    $validated = false;
    if (strpos($validationresult, 'class="error"') === false) {
        error_log("\nno errors", 3, "/var/www/html/pmdmeta/php_logfile.log"); 
        $validated = true;
    }  
    echo json_encode(array("success"=>true, "message"=>$validationresult, "validated"=>$validated));
    return $validated; 
}
?>
