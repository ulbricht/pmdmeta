<?php
    ini_set("display_errors","1");
    $xsl = new XSLTProcessor();    
    $xsldom=new DOMDocument();
    $xsldom->load("convert-remove-namespace.xslt");
    $xsl->importStyleSheet($xsldom);
    $xml=new DOMDocument();
    $xml->load($_REQUEST["url"]);
    header("Content-type: text/xml");
    echo $xsl->transformToXML($xml);
?>
