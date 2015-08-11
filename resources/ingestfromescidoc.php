<?php
    
    include_once("../includes/inc_conf.php");    
    
    use escidoc\client\ItemHandler;
    use escidoc\mapping\DOMMapper;
   
use escidoc\resources\om\context\Context;    
use escidoc\resources\srw\SearchRetrieveRequest;    
    use escidoc\util\DateTimeFormatter;
use escidoc\util\NonNegativeInteger;
use escidoc\util\PositiveInteger;

    require_once ("Net/URL.php");
    use \Net_URL;   
    
       
    
try{
   $numberofrecords=0; 
    include_once "classes/escidoc/escidoclogin.php";
    
    $_SESSION["itemhandler"]=new ItemHandler(new Net_URL($escidoccoreservice));
    $_SESSION["itemhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);
    
    
    if (! $_SESSION["eSciDoc_context"] instanceof Context)
       throw new Exception("no context set");
       
    $context=$_SESSION["eSciDoc_context"];

    $query["query"]=' "/properties/context/id"="'.$context->getObjid().'" ';


    $request=new SearchRetrieveRequest($query["query"]);
    $request->setMaximumRecords(NonNegativeInteger::parse(1000));
    $request->setStartRecord(PositiveInteger::parse(1));

    $srr=$_SESSION["itemhandler"]->retrieveItems( $request);

    $itemnodelist=$srr->getRecords()->getList();

    $numberofrecords=count($itemnodelist);
    
    try {
        #Hier die Verbindungsdaten zur MYSQL !!!!
	$dbo->beginTransaction();
	$sthdel1=$dbo->prepare('DELETE FROM '.$pmdinstance.'dataset;');
	$sthdel2=$dbo->prepare('DELETE FROM '.$pmdinstance.'mdrecords;');
	$sthdel3=$dbo->prepare('DELETE FROM '.$pmdinstance.'fullidx; ');
	$sthdel1->execute();
	$sthdel2->execute();
	$sthdel3->execute();    
	$dbo->commit();
    } catch (PDOException $e) {
        throw $e;
    } 


    
    foreach ($itemnodelist as $itemnode){
        
        
        $newitem=$itemnode->getRecordData()->getUnmarshalledContent()->getUnmarshalledContent();

        
        $doi="";
        $fulltext="";
        
        $xsl = new XSLTProcessor();    
        $xsldom=new DOMDocument();
        $xsldom->load("convert-fulltext.xslt");
        $xsl->importStyleSheet($xsldom);
        
        foreach ($newitem->getMetadataRecords()->getList() as $mdrecord){
            $content=new DOMDocument();
            $childnode=$content->importNode($mdrecord->getContent(),true);
            $content->appendChild($childnode);
            if ($mdrecord->getName()==="datacite"){
                $xpath=new DOMXPath($content);
                $res=$xpath->query("//*[local-name() = 'identifier' and @identifierType='DOI']");
                if ($res->length >0)
                    $doi=$res->item(0)->nodeValue;
            }            
            $fulltext.=$xsl->transformToXML($content);            
        }
        
        try{

            $dbo->beginTransaction();

                $sthds=$dbo->prepare('REPLACE INTO '.$pmdinstance.'dataset (id,item,lastmodified,doi) VALUES (?,?,?,?)');
                $sthds->execute(array(  $newitem->getObjId(),
                                        DOMMapper::marshal($newitem),
                                        DateTimeFormatter::ISO8601($newitem->getLastModificationDate()),
                                        $doi
                                ));

                $sthmd=$dbo->prepare('REPLACE INTO '.$pmdinstance.'mdrecords (datasetid,name,content) VALUES (?,?,?)');

                foreach ($newitem->getMetadataRecords()->getList() as $mdrecord){

                    $content=new DOMDocument();
                    $childnode=$content->importNode($mdrecord->getContent(),true);
                    $content->appendChild($childnode);
                    $sthmd->execute(array(  $newitem->getObjId(),
                                            $mdrecord->getName(),
                                            $content->saveXML()
                                    ));
                }
                
                    $sthft=$dbo->prepare('REPLACE INTO '.$pmdinstance.'fullidx (datasetid,fullidx) VALUES (?,?)');
                    $sthft->execute(array(  $newitem->getObjId(),
                                            $fulltext
                                    ));               
            $dbo->commit();

        }catch(PDOException $e) {
            $dbo->rollback();
            throw $e;
        }


    }
    
echo json_encode(array("success"=>true, "message"=>"successfully ingested ".$numberofrecords." escidoc items.", "object"=> ""));    
    
}catch (Exception $e){
    
    echo json_encode(array("success"=>false, "message"=>$e->getMessage()."|".$_SESSION["eSciDocUserHandle"]."|" , "escidocid"=> ""));                 

}



?>
