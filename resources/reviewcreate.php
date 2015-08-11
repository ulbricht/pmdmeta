<?php
    include_once("../includes/inc_conf.php");
    require_once ("Net/URL.php");
    use \Net_URL;        
    include_once "classes/escidoc/escidoclogin.php";
     
    use escidoc\client\PDPHandler;
    use escidoc\client\UserHandler;
    use escidoc\resources\aa\pdp\Requests;
    use escidoc\resources\aa\pdp\Results;
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
    use escidoc\mapping\DOMMapper;    

    require_once "classes/escidoc/FileMetadata.php";    
    
try{
    
    if (!isset($_SESSION["eSciDocUserHandle"])){
        throw new Exception ("You must be logged in!");
    }  
        
    $_SESSION["userhandler"]=new UserHandler(new Net_URL($escidoccoreservice));
    $_SESSION["userhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);
    $user=$_SESSION["userhandler"]->retrieveCurrentUser();
    
    $_SESSION["pdphandler"]=new PDPHandler(new Net_URL($escidoccoreservice));
    $_SESSION["pdphandler"]->setHandle($_SESSION["eSciDocUserHandle"]);
   
    checkwriteable($_SESSION["pdphandler"],$user->getObjid(),$_REQUEST['item']);
    
    createreview($_REQUEST["item"]);

    echo json_encode(array("success"=>true, "message"=>$warning));                 
                
}catch (Exception $e){
    
    echo json_encode(array("success"=>false, "message"=>$e->getMessage()));                 

}    

function checkwriteable($pdphandler,$user,$item){ 


    $subject = new Subject(Subject::SUBJECT_CATEGORY_DEFAULT);
    $subject->getAttributes()->add(
            new Attribute(new Uri(SubjectIdentifier::SUBJECT_ID), new Uri(DataTypes::STRING),
                    StringAttribute::getInstance($user)));
    $resource = new Resource();
    $resource->getAttributes()->add(
            new Attribute(new Uri(ResourceIdentifier::RESOURCE_ID), new Uri(DataTypes::STRING),
                    StringAttribute::getInstance($item)));
    
    $writeaction = new Action();
    $writeaction->getAttributes()->add(
            new Attribute(new Uri(ActionIdentifier::ACTION_ID), new Uri(DataTypes::STRING),
                    StringAttribute::getInstance('info:escidoc/names:aa:1.0:action:update-item')));      
    
    $writerequest = new Request($resource, $writeaction);    
    $writerequest->add($subject);  
    
    $requestarray= array($writerequest);

    $requests=new Requests();
    $requests->addAll($requestarray); 
    
    $_SESSION["pdphandler"]=new PDPHandler(new Net_URL($escidoccoreservice));
    $_SESSION["pdphandler"]->setHandle($_SESSION["eSciDocUserHandle"]);
    $pdpresults= $pdphandler->evaluate($requests);
    
    if (!$pdpresults->get(0)->getDecision()===Decision::PERMIT)
        throw new Exception ("You are not allowed to update the dataset");
}

function createreview($escidocid){        
    $item= $_SESSION["itemhandler"]->retrieve($escidocid);
    $modtime=preg_replace("/\+00:00/","Z",$item->getLastModificationDate()->format(DateTime::W3C));
    $exposedlinkbase=md5($item->getObjid()).md5($modtime);

    $base="../../";
                   
    $reviewlocation=$base."review/".$exposedlinkbase;
    if (file_exists($reviewlocation))
        throw new Exception("There already exists a review of this dataset.");
    mkdir($reviewlocation);

    mkdir($reviewlocation."/css");
    file_put_contents($reviewlocation."/css/datasetoverview.css", file_get_contents($base."css/datasetoverview_review.css"));
    file_put_contents($reviewlocation."/css/template.css", file_get_contents($base."css/template.css"));
    file_put_contents($reviewlocation."/css/gfz_text.css", file_get_contents($base."css/gfz_text.css"));

    mkdir($reviewlocation."/xsl");
    file_put_contents($reviewlocation."/xsl/datasetoverview.xslt", file_get_contents($base."xsl/datasetoverview.xslt"));

     mkdir($reviewlocation."/images");
     file_put_contents($reviewlocation."/images/logo_gfz_en.gif", file_get_contents($base."images/logo_gfz_en.gif"));
     file_put_contents($reviewlocation."/images/logo_helmholtz_gemeinschaft_de.gif", file_get_contents($base."images/logo_helmholtz_gemeinschaft_de.gif"));
     file_put_contents($reviewlocation."/images/wordmark_gfz_en.gif", file_get_contents($base."images/wordmark_gfz_en.gif"));
     file_put_contents($reviewlocation."/images/background.gif", file_get_contents($base."images/background.gif"));   
     file_put_contents($reviewlocation."/images/All_Status_ItemReleased_31_Static.png", file_get_contents($base."images/All_Status_ItemReleased_31_Static.png"));   
     file_put_contents($reviewlocation."/images/article_31.png", file_get_contents($base."images/article_31.png"));   
     file_put_contents($reviewlocation."/images/abstract_31.png", file_get_contents($base."images/abstract_31.png"));   
     file_put_contents($reviewlocation."/images/external_Ressources_31.png", file_get_contents($base."images/external_Ressources_31.png"));
     file_put_contents($reviewlocation."/getcitationinfo.php", file_get_contents($base."getcitationinfo.php"));
     

    file_put_contents($reviewlocation."/index.php", file_get_contents($base."review/index.php"));

    $fh=fopen($reviewlocation.'/item.xml',"w");
    fputs($fh,DOMMapper::marshal($item));
    fclose($fh);

    storeFilesLocal($item,$reviewlocation);
        
}
function storeFilesLocal($item,$reviewlocation){
    if (isset($reviewlocation)){
        foreach ($item->getComponents()->getList() as $component){ 
                $file["item"]=preg_replace("|^(\w+:\d+):\d+|",'${1}',$item->getObjid());//cut version information
                $md=new FileMetadata($component->getMetadataRecords()->get("escidoc")->getContent());       
                $file["size"]=$md->getFilesize();
                $file["name"]=$md->getFilename();                    

                //copy file to harddisc
                $fh=fopen($reviewlocation.'/'.$file["name"],"w");
                set_time_limit(4*30);
                fputs($fh,$_SESSION["itemhandler"]->retrieveContent($file["item"],$component->getObjid()));
                fclose($fh);            
        }
    }  
}

?>
