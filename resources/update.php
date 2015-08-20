<?php
 
       
    include_once("includes/inc_conf.php");    

    require_once 'classes/escidoc/cls_pmdconfig.php';    
    use escidoc\client\ItemHandler;
   // use escidoc\client\ContainerHandler;
    use escidoc\mapping\DOMMapper;
//    use escidoc\resources\om\item\component\Component;
    use escidoc\resources\common\MetadataRecord;
    use escidoc\resources\common\MetadataRecords;
    use escidoc\resources\om\item\Item;
    use escidoc\resources\common\reference\ContentModelRef;
    use escidoc\resources\common\reference\ContextRef;    
    
    use escidoc\util\DateTimeFormatter;
    use escidoc\resources\common\reference\ItemRef;
    use escidoc\resources\common\reference\RoleRef;
    use escidoc\resources\aa\useraccount\Grant;
    use escidoc\client\GroupHandler;
    
    require_once ("Net/URL.php");
    use \Net_URL;   
    
           
    
try{

    include_once "classes/escidoc/escidoclogin.php";
    
    $_SESSION["itemhandler"]=new ItemHandler(new Net_URL($escidoccoreservice));
    $_SESSION["itemhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);
    $_SESSION["grouphandler"]=new GroupHandler(new Net_URL($escidoccoreservice));
    $_SESSION["grouphandler"]->setHandle($_SESSION["eSciDocUserHandle"]);
    
    $param=$_POST['objects'];
    
    $itemdiff= json_decode($param,true);
    
 //  print_r($itemdiff);
    
    foreach ($itemdiff as $itemhref=>$itemcontent){
        
        $hrefarray=preg_split("|/|",$itemhref);
        $itemid=array_pop($hrefarray);

        $item=false;
        if ($itemid)    
            $item= $_SESSION["itemhandler"]->retrieve($itemid);
        else
            $item=new Item();
        
        foreach ($itemcontent as $structtype=>$structvalue){
            if ($structtype=='mdrecords'){
                foreach ($structvalue as $mdrecord){                    
                    $itemmdrecords=$item->getMetadataRecords();                    
                    foreach ($mdrecord as $mdrecordname=>$mdrecordstringcontent){                            
                        $mdrecordcontent=new DOMDocument();
                        $mdrecordcontent->loadXML($mdrecordstringcontent);
                        $record=new MetadataRecord($mdrecordname);
                        $record->setContent($mdrecordcontent->documentElement);
                        $itemmdrecords->add($record);
                    }
                    $item->setMetadataRecords($itemmdrecords);
                }
            }
            else if ($structtype=='components'){
                foreach ($structvalue as $components){
                    foreach ($components as $componenthref => $component){
                        

                        
                        $hrefarray=preg_split("|/|",$componenthref);
                        $componentid=array_pop($hrefarray);
                        
                        if (count($hrefarray)==0 && is_array($component)) { 
                                //new component
                            foreach ($component as $componentstructtype=>$componentstructvalue){
                                 if ($componentstructtype=='content'){
                                        $newitemcomponent=DOMMapper::unmarshal($componentstructvalue, true); 
                                 }                                 
                            }
                            foreach ($component as $componentstructtype=>$componentstructvalue){
                                if ($componentstructtype=='mdrecords'){
                                    $itemcomponentmdrecords=new MetadataRecords();
                                    foreach ($componentstructvalue as $mdrecord){
                                        foreach ($mdrecord as $mdrecordname=>$mdrecordstringcontent){
                                            if ($mdrecordstringcontent && strlen($mdrecordstringcontent)>0){                                            
                                                $mdrecordcontent=new DOMDocument();
                                                $mdrecordcontent->loadXML($mdrecordstringcontent);
                                                $record=new MetadataRecord($mdrecordname);
                                                $record->setContent($mdrecordcontent->documentElement);
                                                $itemcomponentmdrecords->add($record);
                                            }
                                        }
                                        $newitemcomponent->setMetadataRecords($itemcomponentmdrecords);
                                    }
                                }
                            }                            
                            $item->getComponents()->add($newitemcomponent);
                        }else if (!is_array($component)){
                                //delete component                            
                            foreach ($item->getComponents()->getList() as $delcomp)                        
                                if ($delcomp->getObjId()==$componentid)
                                    $item->getComponents()->remove($delcomp);
                        }else{
                            //modify component
                            foreach ($component as $componentstructtype=>$componentstructvalue){
                                 if ($componentstructtype=='content'){
                                        $modifyitemcomponent=DOMMapper::unmarshal($componentstructvalue, true); 
                                 }                                 
                            }
                            $deletecomponentsmdrecords=array();
                            foreach ($component as $componentstructtype=>$componentstructvalue){
                                if ($componentstructtype=='mdrecords'){
                                    $itemcomponentmdrecords=new MetadataRecords();
                                    foreach ($componentstructvalue as $mdrecord){
                                        foreach ($mdrecord as $mdrecordname=>$mdrecordstringcontent){
                                            if ($mdrecordstringcontent && strlen($mdrecordstringcontent)>0){                                            
                                                $mdrecordcontent=new DOMDocument();
                                                $mdrecordcontent->loadXML($mdrecordstringcontent);
                                                $record=new MetadataRecord($mdrecordname);
                                                $record->setContent($mdrecordcontent->documentElement);
                                                $itemcomponentmdrecords->add($record);
                                            }else{
                                                array_push($deletecomponentsmdrecords,$mdrecordname);
                                            }
                                        }
                                        $modifyitemcomponent->setMetadataRecords($itemcomponentmdrecords);                                        
                                    }
                                }
                            } 
                            
                            $itemcomponent=false;
                            foreach ($item->getComponents()->getList() as $compsearch){
                                if ($compsearch->getObjId()==$componentid){
                                    $itemcomponent=$compsearch;
                                    break;
                                }
                            }
                            $itemcomponent->getProperties()->setVisibility($modifyitemcomponent->getProperties()->getVisibility());
                            $itemcomponent->getProperties()->setValidStatus($modifyitemcomponent->getProperties()->getValidStatus());  
                            $itemcomponent->getProperties()->setContentCategory($modifyitemcomponent->getProperties()->getContentCategory()); 
                            
                            foreach ($modifyitemcomponent->getMetadataRecords()->getList() as $mdrecord){
                                $itemcomponent->getMetadataRecords()->add($mdrecord);
                            }
                            foreach ($deletecomponentsmdrecords as $name){
                                $itemcomponent->getMetadataRecords()->remove($name);
                            }
                            
                        }
                    }
                }
            }  
         }      

//echo DOMMapper::marshal($item);
//return;

        

        if ($item->getObjid()){     
            $newitem=$_SESSION["itemhandler"]->update($item->getObjid(),$item);
        }else{            
            $item->getProperties()->setContext(new ContextRef($_SESSION["eSciDoc_context"]->getObjid()));
            $contentmodelid=preg_split("|/|",$escidoccontentmodel);
            $item->getProperties()->setContentModel(new ContentModelRef(array_pop($contentmodelid)));
            $newitem=$_SESSION["itemhandler"]->create($item);

            $_SESSION["eSciDoc_pmdconfig"]=new PanmetadocsContextConfig($_SESSION["eSciDoc_context"]->getAdmindescriptors()->get("panmetadocs")->getContent()); 
            $groupid=$_SESSION["eSciDoc_pmdconfig"]->getUserGroupID();            
            $role=new RoleRef($roles["item-writeable"]);
            $newgrant=new Grant($role);
            $assignedon=new ItemRef($newitem->getObjid());        
            $newgrant->getProperties()->setAssignedOn($assignedon);
            $_SESSION["grouphandler"]->createGrant($groupid, $newgrant);
        }

        
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
        $warning="";
        
        $sql="select id, content from ".$pmdinstance."dataset as dataset join ".$pmdinstance."mdrecords as mdrecords on dataset.id=mdrecords.datasetid where mdrecords.name='datacite' and doi=?";
        if(trim($doi!='')){
            try{
                    $sth=$dbo->prepare($sql);
                    $sth->execute(array($doi));
                    $res= $sth->fetchall();                
                    if(is_array($res)&&sizeof($res)>1){
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
                    }                
            }catch(PDOException $e) {
                    $warning.="Unable to verify if DOI:".$doi." is assinged uniquely.";
            }
        }
        
        
        echo json_encode(array("success"=>true, "message"=>$warning, "object"=> $newitem->getXLink()->getHref()->getPath()));                 
                
        return; //do the loop for only one item 
    }
    
}catch (Exception $e){
    
    echo json_encode(array("success"=>false, "message"=>$e->getMessage()."|".$_SESSION["eSciDocUserHandle"]."|" , "escidocid"=> ""));                 

}

?>
