<?php
   
    include_once("includes/inc_conf.php");  
    
    use escidoc\client\ItemHandler;
    use escidoc\resources\common\taskparam\StatusTaskParam;
    
    require_once ("Net/URL.php");
    use \Net_URL;
    
 session_start();         
 

    if (!preg_match("/^escidoc:\d+$/",$_REQUEST["id"]))
        return;

    
try{
    
    
        if (!isset($_SESSION["eSciDocUserHandle"]))
            throw new Exception("You must be logged in!");
        
        $_SESSION["itemhandler"]=new ItemHandler(new Net_URL($escidoccoreservice));
        $_SESSION["itemhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);   
       
        $item=$_SESSION["itemhandler"]->retrieve($_REQUEST["id"]);     
        
       switch ($_REQUEST["operation"]) {
            case "revise":
                $tp=new StatusTaskParam($item->getLastModificationDate(),"revising item");     
                $_SESSION["itemhandler"]->revise($item->getObjid(),$tp);
                break;
            case "submit":
                $tp=new StatusTaskParam($item->getLastModificationDate(),"submitting item");    
                $tr=$_SESSION["itemhandler"]->submit($item->getObjid(),$tp);
                break;
            case "publish":
                $tp=new StatusTaskParam($item->getLastModificationDate(),"releasing item");      
                $_SESSION["itemhandler"]->release($item->getObjid(), $tp);
                break;
            case "withdraw":
                $tp=new StatusTaskParam($item->getLastModificationDate(),"withdrawing item");     
                $_SESSION["itemhandler"]->withdraw($item->getObjid(), $tp);
                break;    

        }

        echo json_encode(array("success"=>true, "message"=>"success"));                 
    
}catch (Exception $e){ 
    echo json_encode(array("success"=>false, "message"=>$e->getMessage()));                 

}



?>
