<?php
 
       
 //   include_once("includes/inc_conf.php");    
    
      
// ini_set("display_errors",1);
     
    
try{


    
    $param=$_POST['objects'];
    
    $itemdiff= json_decode($param,true);



$mdrecords=array();
$itemid=false;
    
    foreach ($itemdiff as $itemhref=>$itemcontent){
        
        $hrefarray=preg_split("|/|",$itemhref);
        $itemid=array_pop($hrefarray);

        foreach ($itemcontent as $structtype=>$structvalue){
            if ($structtype=='mdrecords'){
                foreach ($structvalue as $mdrecord){                    
                    foreach ($mdrecord as $mdrecordname=>$mdrecordstringcontent){                            
			$mdrecords[$mdrecordname]=$mdrecordstringcontent;
                    }
                }
            } 
         }
    }  


    $doi="";
    $fulltext="";
    $itemxml="<envelope>";

	

    $dbindex=array();

    $dbindex["title"]=false;
    $dbindex["description"]=false;
    $dbindex["creator"]=array();
    $dbindex["affiliations"]=array();
    $dbindex["category"]=array();
    $dbindex["subject"]=array();
    $dbindex["bbox"]=array();
    $dbindex["contributor"]=array();
    $dbindex["sciencekeywordtree"]=array();

    $xsl = new XSLTProcessor();    
    $xsldom=new DOMDocument();
    $xsldom->load("convert-fulltext.xslt");
    $xsl->importStyleSheet($xsldom);

    foreach ($mdrecords as  $mdrecordname=>$mdrecord){
        $content=new DOMDocument();
        $content->loadXML($mdrecord);

	$fulltext.=$xsl->transformToXML($content); 
	$itemxml.=$mdrecord;

        if ($mdrecordname==="datacite"){
    	    $xpath=new DOMXPath($content);

    	    $res=$xpath->query("//*[local-name() = 'identifier' and @identifierType='DOI']");
	    if ($res->length >0){
	        $doi=$res->item(0)->nodeValue;
            }

    	    $res=$xpath->query("//*[local-name() = 'title']");
	    if ($res->length>0){
		    $dbindex["title"]=$res->item(0)->nodeValue;
	    }

    	    $res=$xpath->query("//*[local-name() = 'description' and @descriptionType='Abstract']");
	    if ($res->length>0){
		    $dbindex["description"]=$res->item(0)->nodeValue;
	    }

    	    $res=$xpath->query("//*[local-name() = 'creatorName']");
	    if ($res->length>0){
		    foreach ($res as $creator){
			    array_push($dbindex["creator"],$creator->nodeValue);
		    }
	    }

    	    $res=$xpath->query("//*[local-name() = 'contributorName']");
	    if ($res->length>0){
		    foreach ($res as $contributor){
			    array_push($dbindex["contributor"],$contributor->nodeValue);
		    }
	    }

    	    $res=$xpath->query("//*[local-name() = 'geoLocationBox']");
	    if ($res->length>0){
		    foreach ($res as $node){
			$box=array();
			$box["minlat"]=$xpath->query("//*[local-name() = 'southBoundLatitude']",$node)->item(0)->nodeValue;
			$box["maxlat"]=$xpath->query("//*[local-name() = 'northBoundLatitude']",$node)->item(0)->nodeValue;
			$box["minlon"]=$xpath->query("//*[local-name() = 'westBoundLongitude']",$node)->item(0)->nodeValue;
			$box["maxlon"]=$xpath->query("//*[local-name() = 'eastBoundLongitude']",$node)->item(0)->nodeValue;
		    	array_push($dbindex["bbox"],$box);
		    }
	    }

    	    $res=$xpath->query("//*[local-name() = 'geoLocationPoint']");
	    if ($res->length>0){
		    foreach ($res as $node){
			$box=array();
			$box["minlat"]=$xpath->query("//*[local-name() = 'pointLatitude']",$node)->item(0)->nodeValue;
			$box["maxlat"]=$xpath->query("//*[local-name() = 'pointLatitude']",$node)->item(0)->nodeValue;
			$box["minlon"]=$xpath->query("//*[local-name() = 'pointLongitude']",$node)->item(0)->nodeValue;
			$box["maxlon"]=$xpath->query("//*[local-name() = 'pointLongitude']",$node)->item(0)->nodeValue;
		    	array_push($dbindex["bbox"],$box);
		    }
	    }

    	    $res=$xpath->query("//*[local-name() = 'subject' and ( @subjectScheme!='NASA/GCMD Earth Science Keywords' or normalize-space(@subjectScheme)='' ) ]");
	    if ($res->length>0){
		    foreach ($res as $subject){
			    array_push($dbindex["subject"],strtolower($subject->nodeValue));
		    }
	    }

   	    $res=$xpath->query("//*[local-name() = 'subject' and @subjectScheme='NASA/GCMD Earth Science Keywords']");
	    if ($res->length>0){
		    $sciencekeyword=array();
		    foreach ($res as $subject){
			    $candidate=$subject->nodeValue;
			    $candidate=strtolower($candidate);
			    $candidate=trim($candidate);
			    do{
				$sciencekeyword[$candidate]=true;
				$len=strrpos($candidate,">");
				$candidate=substr($candidate,0,$len);
				$candidate=trim($candidate);
				
			    }while(strlen($candidate)>0);
		    }
		    $dbindex["sciencekeywordtree"]=array_keys($sciencekeyword);
	    }
       }   
    }

    $itemxml.="</envelope>";


    error_reporting(E_ALL ^ E_NOTICE);


    $dsn="mysql:localhost;dbname=db";//pdo connection string
    $dbo = new PDO($dsn,"user","pass");
    $dbo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);



     $pmdinstance="4dmb_";


       
        try{


            if (strlen($itemid)==0){

		$sth=$dbo->prepare("select uuid() as uuid;");
		if ($sth->execute()) {
		    $result=$sth->fetch(PDO::FETCH_ASSOC);
		    $itemid=$result["uuid"];
		} else {
		    throw new Exception("Failed to get UUID from database");
		}

		if (strlen($itemid)==0){
		    throw new Exception("Failed to get UUID from database");
		}

	    }

//var_dump($dbindex);


            $dbo->beginTransaction();

                $sthds=$dbo->prepare('REPLACE INTO '.$pmdinstance.'dataset (id,item,lastmodified,doi) VALUES (?,?,?,?)');
                $sthds->execute(array(  $itemid,
                                        $itemxml,
                                        date('Y-m-d H:i:s'),
                                        $doi
                                ));

                $sthmd=$dbo->prepare('REPLACE INTO '.$pmdinstance.'mdrecords (datasetid,name,content) VALUES (?,?,?)');


		foreach ($mdrecords as  $mdrecordname=>$mdrecord){
                    $sthmd->execute(array(  $itemid,
                                            $mdrecordname,
                                            $mdrecord
                                    ));
                }
                
                $sthft=$dbo->prepare('REPLACE INTO '.$pmdinstance.'fullidx (datasetid,fullidx) VALUES (?,?)');
                $sthft->execute(array(  $itemid,
                                            $fulltext
                               ));
                
                $sthfct=$dbo->prepare('DELETE FROM '.$pmdinstance.'facets WHERE datasetid = ?');
                $sthfct->execute(array($itemid));

                $sthfct=$dbo->prepare('DELETE FROM '.$pmdinstance.'location WHERE datasetid = ?');
                $sthfct->execute(array($itemid));

                $sthfct=$dbo->prepare('INSERT INTO '.$pmdinstance.'facets (datasetid,label,value) VALUES (?,?,?)');
                $sthloc=$dbo->prepare('INSERT INTO '.$pmdinstance.'location (datasetid,minlat,maxlat,minlon,maxlon) VALUES (?,?,?,?,?)');

		foreach ($dbindex as $label=>$value){
			if (!is_array($value)){
				$sthfct->execute(array($itemid,$label,$value));
			}else{

				if ($label=="bbox"){
					foreach ($value as $box){
						$sthloc->execute(array($itemid,
								$box["minlat"],
								$box["maxlat"],
								$box["minlon"],
								$box["maxlon"]));
					}

				}else{
					foreach ($value as $val){
						$sthfct->execute(array($itemid,$label,$val));
					}
				}
			}
		}
                
                
            $dbo->commit();

        }catch(PDOException $e) {
            $dbo->rollback();
            throw $e;
        }
        $warning="";
  /*     
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
   */     
        
        echo json_encode(array("success"=>true, "message"=>$warning, "object"=> $itemid));                 
                
        return; //do the loop for only one item 
    
  
}catch (Exception $e){
    
    echo json_encode(array("success"=>false, "message"=>$e->getMessage()."|".$_SESSION["eSciDocUserHandle"]."|" , "escidocid"=> ""));                 

}



?>
