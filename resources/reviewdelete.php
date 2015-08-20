<?php

    include_once("includes/inc_conf.php"); 
        
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

try{
    
    if (strncmp($_REQUEST["dir"],md5($_REQUEST["item"]),strlen(md5($_REQUEST["item"]))-1)!=0)
        throw new Exception ("Directory ".$_REQUEST["dir"]." was not generated from item ".$_REQUEST["item"]);
    
    if (!isset($_SESSION["eSciDocUserHandle"])){
        throw new Exception ("You must be logged in!");
    }  
    
    
    $_SESSION["userhandler"]=new UserHandler(new Net_URL($escidoccoreservice));
    $_SESSION["userhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);
    $user=$_SESSION["userhandler"]->retrieveCurrentUser();
    
    $_SESSION["pdphandler"]=new PDPHandler(new Net_URL($escidoccoreservice));
    $_SESSION["pdphandler"]->setHandle($_SESSION["eSciDocUserHandle"]);
   
    checkwriteable($_SESSION["pdphandler"],$user->getObjid(),$_REQUEST['item']);  

    deltree("../../review/".$_REQUEST["dir"]);

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
    
    $pdpresults= $pdphandler->evaluate($requests);
    
    if (!$pdpresults->get(0)->getDecision()===Decision::PERMIT)
        throw new Exception ("You are not allowed to update the dataset");
}

function deltree ($directory){   
    if ($dh=@opendir($directory)){
        if ($dh===FALSE)
            throw new Exception("Could not open directory ".$directory." for deletion.");
        while (($file = readdir($dh)) !== false){
            if ($file=="." || $file=="..")
                continue;
            $filelocation=$directory."/".$file;
            if (is_file($filelocation) && !@unlink($filelocation))
                throw new Exception("Could not delete file ".$filelocation);
            if (is_dir($filelocation))
                deltree($filelocation);        
        }
        closedir($dh);
    }
    if (!@rmdir($directory))
        throw new Exception("Could not delete directory ".$directory);
}


?>
