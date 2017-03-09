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
	echo json_encode(array("success"=>true, "message"=>$validationresult));
}catch (Exception $e){ 
    echo json_encode(array("success"=>false, "message"=>$e->getMessage()));                 
}



?>
