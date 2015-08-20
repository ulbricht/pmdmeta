<?php
    
    include_once("includes/inc_conf.php");    
    
    use escidoc\client\ItemHandler;
    use escidoc\client\ContainerHandler;
    use escidoc\mapping\DOMMapper;

    include_once('classes/escidoc/XMLItemHandler.php');     
    
    include_once "classes/escidoc/escidoclogin.php"; 
    
    require_once ("Net/URL.php");
    use \Net_URL;   
    use escidoc\client\exceptions\server\application\security\AuthorizationException;
    
    $_SESSION["itemhandler"]=new ItemHandler(new Net_URL($escidoccoreservice));
    $_SESSION["itemhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);
    $_SESSION["xmlitemhandler"]=new XMLItemHandler(new Net_URL($escidoccoreservice));
    $_SESSION["xmlitemhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);    
    $_SESSION["containerhandler"]=new ContainerHandler(new Net_URL($escidoccoreservice));
    $_SESSION["containerhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);    

    $urlparam=preg_split("|/|",$_REQUEST["object"]);
    $mdrecord=$_REQUEST["mdrecord"];
    $history=$_REQUEST["history"];
    $files=$_REQUEST["files"];
    
    
    header("Content-type: text/xml");     
    try{
        if ($urlparam[2]=="item"){

            if (isset($history)){
                $history=$_SESSION["xmlitemhandler"]->retrieveVersionHistory($urlparam[3]);
                $history=preg_replace("|<\?xml-stylesheet type=\"text/xsl\" href=\"http://escidoc.gfz-potsdam.de/xsl/Resource2Html.xsl\"\?>|","",$history);
                echo $history;            
            }else if (isset($files)){
                $item=$_SESSION["itemhandler"]->retrieve($urlparam[3]);                
                $components=$item->getComponents();
                echo DOMMapper::marshal($components);               
            }else{

                $item=$_SESSION["itemhandler"]->retrieve($urlparam[3]);
                $xmldom=new DOMDocument();
                if ($mdrecord && strlen($mdrecord)>0){
                    $records=$item->getMetaDataRecords();        
                    $mdrecord=$records->get($mdrecord);
                    $domelement=$mdrecord->getContent();
                    $xmldom->appendChild($xmldom->importNode($domelement,true));
                    outdom($xmldom);                
                }else{
                    $mdrecords=$item->getMetaDataRecords();
                    $mdrecords->remove("escidoc");
                    $outobj=DOMMapper::marshal($mdrecords);
                    $outxml=new DOMDocument();
                    $outxml->loadXML($outobj);
                    outdom($outxml);
                }

            }
        }
    }catch (AuthorizationException $e){}
       
    function outdom($xmldom){
        $xsl = new XSLTProcessor();    
        $xsldom=new DOMDocument();
        $xsldom->load("convert-remove-namespace.xslt");
        $xsl->importStyleSheet($xsldom);
    
        echo $xsl->transformToXML($xmldom);        
    }

?>
