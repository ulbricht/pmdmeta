<?php
    
//ini_set("display_errors",1);

    $itemid=$_REQUEST["object"];
    $mdrecord=$_REQUEST["mdrecord"];
    $history=$_REQUEST["history"];
    $files=$_REQUEST["files"];
    
    
    header("Content-type: text/xml");     
    try{


    #Hier die Verbindungsdaten zur MYSQL !!!!
	$dsn="mysql:host=localhost;dbname=db";//pdo connection string
	$dbo = new PDO($dsn,"user","pass");
    $dbo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);



        if (strlen($itemid)>0){

            if (isset($history)){
                echo "";               
            }else if (isset($files)){
                echo "<files/>";               
            }else{

		$pmdinstance="4dmb_";

		$sthds=$dbo->prepare('SELECT item from '.$pmdinstance.'dataset where id= ?');
		$sthds->execute(array(  $itemid ));

		$result=$sthds->fetch(PDO::FETCH_ASSOC);
		$itemxml=$result["item"];

                $xmldom=new DOMDocument();
		$xmldom->loadXML($itemxml);
                outdom($xmldom);                

            }
        }
    }catch (Exception $e){}
       
    function outdom($xmldom){
        $xsl = new XSLTProcessor();    
        $xsldom=new DOMDocument();
        $xsldom->load("convert-remove-namespace.xslt");
        $xsl->importStyleSheet($xsldom);
    
        echo $xsl->transformToXML($xmldom);        
    }

?>
