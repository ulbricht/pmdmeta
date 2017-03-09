<?php
   
    include_once("includes/inc_conf.php");   
    include_once('classes/cls_DataCite.php');
    
    use escidoc\client\ItemHandler;
    use escidoc\resources\common\MetadataRecord;
 //   use escidoc\resources\common\MetadataRecords;
 //   use escidoc\resources\om\item\Item;
    
    use escidoc\client\PDPHandler;
    use escidoc\client\UserHandler;
    use escidoc\resources\aa\pdp\Requests;
 //   use escidoc\resources\aa\pdp\Results;
    use escidoc\resources\aa\pdp\Decision;    
    use escidoc\resources\xacml\attr\StringAttribute;
    use escidoc\resources\xacml\ctx\Attribute;
    use escidoc\resources\xacml\ctx\Subject;
    use escidoc\resources\xacml\ctx\Request;
    use escidoc\resources\xacml\ctx\Resource;
    use escidoc\util\Uri;
    use escidoc\resources\xacml\ctx\SubjectIdentifier;
    use escidoc\resources\xacml\attr\DataTypes;
    use escidoc\resources\xacml\ctx\ResourceIdentifier;
    use escidoc\resources\xacml\ctx\Action;
    use escidoc\resources\xacml\ctx\ActionIdentifier;
//    use escidoc\mapping\DOMMapper;    
    require_once ("Net/URL.php");
    use \Net_URL;
    
 session_start();     

    echo json_encode(array("session"=>$_SESSION));
try{
    
    
        if (!isset($_SESSION["eSciDocUserHandle"]))
            throw new Exception("You must be logged in!");
        
        $_SESSION["itemhandler"]=new ItemHandler(new Net_URL($escidoccoreservice));
        $_SESSION["itemhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);   
        $_SESSION["userhandler"]=new UserHandler(new Net_URL($escidoccoreservice));
        $_SESSION["userhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);
        $_SESSION["pdphandler"]=new PDPHandler(new Net_URL($escidoccoreservice));
        $_SESSION["pdphandler"]->setHandle($_SESSION["eSciDocUserHandle"]);

        $user=$_SESSION["userhandler"]->retrieveCurrentUser();
        
        $escidocitemid=$_REQUEST["item"];
        $targeturl=$_REQUEST["dataciteurl"];
        $registermode=$_REQUEST["dataciteregistry"];

        $subject = new Subject(Subject::SUBJECT_CATEGORY_DEFAULT);
        $subject->getAttributes()->add(
                new Attribute(new Uri(SubjectIdentifier::SUBJECT_ID), new Uri(DataTypes::STRING),
                        StringAttribute::getInstance($user->getObjid())));
        $resource = new Resource();
        $resource->getAttributes()->add(
                new Attribute(new Uri(ResourceIdentifier::RESOURCE_ID), new Uri(DataTypes::STRING),
                        StringAttribute::getInstance($escidocitemid)));

        $writeaction = new Action();
        $writeaction->getAttributes()->add(
                new Attribute(new Uri(ActionIdentifier::ACTION_ID), new Uri(DataTypes::STRING),
                        StringAttribute::getInstance('info:escidoc/names:aa:1.0:action:update-item')));   


        $writerequest = new Request($resource, $writeaction);    
        $writerequest->add($subject); 

        $requestarray[0]=$writerequest;

        $requests=new Requests();
        $requests->addAll($requestarray);

    //    echo DOMMapper::marshal($requests);


        $pdpresults= $_SESSION["pdphandler"]->evaluate($requests); 


        if ($pdpresults->get(0)->getDecision()!==Decision::PERMIT)
            throw new Exception("To register a DOI you need write access to the dataset.");
        
        if (!($registermode==='register' || $registermode==='metadata' || $registermode==='deactivate'))
            throw new Exception("Please choose as registration mode one of: <br>register DOI, <br>update DOI metadata, or <br>deactivate DOI.");            
        
    

        
       
        $item=$_SESSION["itemhandler"]->retrieve($escidocitemid);
        uniquedoi($dbo,$item,$pmdinstance);
        $successmessage=registerDOIFromItem($item,$targeturl,$publication,$doidbrestserver,$registermode);
        echo json_encode(array("success"=>true, "message"=>$successmessage));                 
    
}catch (Exception $e){ 
    echo json_encode(array("success"=>false, "message"=>$e->getMessage()));                 

}

function uniquedoi($dbo,$item,$pmdinstance){
    
        $dataciteuploaddata=false;
        $dataciteupload=$item->getMetadataRecords()->get("datacite");            
        if ($dataciteupload instanceof MetadataRecord){
            $de=$dataciteupload->getContent();
            $dataciteuploaddata=$de->ownerDocument->saveXML($de);
        }    
    
        $dom= new DOMDocument();
        $dom->loadXML($dataciteuploaddata);
        $xpath=new DOMXPath($dom);
        $doi= $xpath->query('//*[local-name()="resource"]/*[local-name()="identifier" and @identifierType="DOI"]')->item(0)->nodeValue;        
        
        $sql="select id, content from ".$pmdinstance."dataset as dataset join ".$pmdinstance."mdrecords as mdrecords on dataset.id=mdrecords.datasetid where mdrecords.name='datacite' and doi=?";
        if(trim($doi==''))
            throw new Exception("DOI is empty");

        $warning="";        
        try{
            
                $sth=$dbo->prepare($sql);
                $sth->execute(array($doi));
                $res= $sth->fetchall();                
                if(is_array($res) && sizeof($res)==1)
                    return;


                $warning.='<p><b style="color:red">DOI:'.$doi.' is already in use by</b><br><ol>';
                foreach($res as $results){
                        $title="No Title";
                        $dom=new DOMDocument();
                        $dom->loadXML($results["content"]);
                        $xpath=new DOMXPath($dom);
                        $xp=$xpath->query("//*[local-name()='title']");
                        if ($xp->length>0){
                                $title=$xp->item(0)->nodeValue;			
                        }
                        $warning.='<li><a href="?object=/ir/item/'.$results["id"].'">'.$title.'</a>';
                }
                $warning.='</ol></p>';
                  
        }catch(PDOException $e) {
                throw new Exception("Unable to verify if DOI:".$doi." is assinged uniquely.");
        }
        
        if (strlen(trim($warning))>0)
            throw new Exception($warning);
    
}


function registerDOIFromItem($item,$targeturl,$publication,$doidbrestserver,$registermode){	

        $dataciteuploaddata=false;
        $difuploaddata=false;
        $iso19115uploaddata=false;
        $doi;        
        

        $dataciteupload=$item->getMetadataRecords()->get("datacite");            
        if ($dataciteupload instanceof MetadataRecord){
            $de=$dataciteupload->getContent();
            $dataciteuploaddata=$de->ownerDocument->saveXML($de);
        }
        $difupload=$difuploaddata=$item->getMetadataRecords()->get("dif");
        if ($difupload instanceof MetadataRecord){
            $de=$difupload->getContent();
            $difuploaddata=$de->ownerDocument->saveXML($de);
        }
        $isoupload=$item->getMetadataRecords()->get("iso19115");
        if ($isoupload instanceof MetadataRecord){
            $de=$isoupload->getContent();
            $iso19115uploaddata=$de->ownerDocument->saveXML($de);
        }            
        $dom= new DOMDocument();
        $dom->loadXML($dataciteuploaddata);
        $xpath=new DOMXPath($dom);
        $doi= $xpath->query('//*[local-name()="resource"]/*[local-name()="identifier" and @identifierType="DOI"]')->item(0)->nodeValue;  

        $publicationyear=$xpath->query('//*[local-name()="resource"]/*[local-name()="publicationYear"]')->item(0)->nodeValue;
        if (!preg_match("/[0-9][0-9][0-9][0-9]/",$publicationyear))
            throw new Exception("publication year is needed");

        if ($publication["releasebeforedoi"] && array_search($item->getProperties()->getPublicStatus(), array("submitted","in-revision","pending"))!==FALSE &&
            substr($doi,0,strlen($publication["doitestprefix"]))!=$publication["doitestprefix"]) //allow testprefixes
                throw new Exception("Dataset must be released to register a DOI.");


$prefixes= array( "GFZ" => array("10.1594/GFZ.","10.5880/ENMAP.","10.5880/GFZ.","10.5880/PIK.","10.5880/TERENO."),
		"ICGEM" => array("10.5880/ICGEM."),
		 "SDDB" => array("10.1594/GFZ.SDDB.","10.1594/GFZ/ICDP","10.5880/SDDB."),
		  "WSM" => array("10.1594/GFZ.WSM.","10.5880/WSM.")
	   );

	$account=null;
	
	foreach ($prefixes as $key => $prefixarray){

		foreach ($prefixarray as $prefix)
			if (strtolower(substr($doi,0,strlen($prefix)))===strtolower($prefix)){
				$account=$key;
			}
	}

	if (!$account)
		throw new Exception("There is no datacenter for your DOI prefix.");

//	throw new Exception($account);

        $datacite=new DOIDB($doidbrestserver[$account]["user"],$doidbrestserver[$account]["password"] , $doidbrestserver[$account]["url"]);

        switch ($registermode){   
            case "register":
                $metaupdate=false;
                try{
                    $datacite->doiRetrieve($doi);
                }catch (DataCiteException $e){                    
                    if ($e->getCode()==404)
                        $metaupdate=true;                        
                }
                if ($metaupdate)
                    $datacite->metaUpdate($dataciteuploaddata);

                $datacite->doiUpdate($doi, $targeturl);  

                if ($metaupdate){
                    if (strlen($iso19115uploaddata)>0)
                        $datacite->metaIsoUpdate($doi,$iso19115uploaddata);
                    if (strlen($difuploaddata)>0)
                        $datacite->metaDifUpdate($doi,$difuploaddata);                   
                }
                return 'successfully registered DOI "'.$doi.'"';                                                
            case "metadata":
                $datacite->metaUpdate($dataciteuploaddata);
                if (strlen($iso19115uploaddata)>0)
                    $datacite->metaIsoUpdate($doi,$iso19115uploaddata);
                if (strlen($difuploaddata)>0)
                    $datacite->metaDifUpdate($doi,$difuploaddata);                
                return 'successfully updated metadata of DOI "'.$doi.'"';                                
            case "deactivate":
                $datacite->metaDelete($doi);
                return 'successfully deactivated metadata of DOI "'.$doi.'"';
            default:               
                throw new Exception("Please choose doi operation mode");
        }  

}

?>
