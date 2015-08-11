<?php
    
    include_once("../includes/inc_conf.php");     
    
    use escidoc\client\ItemHandler;
    use escidoc\resources\common\taskparam\StatusTaskParam;
    
    require_once ("Net/URL.php");
    use \Net_URL;
    
 session_start();         
 
    
try{
    
    
//        if (!isset($_SESSION["eSciDocUserHandle"]))
//            throw new Exception("You must be logged in!");
        
        $_SESSION["itemhandler"]=new ItemHandler(new Net_URL($escidoccoreservice));
        $_SESSION["itemhandler"]->setHandle($_SESSION["eSciDocUserHandle"]);   
       
        $item=$_SESSION["itemhandler"]->retrieve($_REQUEST["id"]);     
        
        
        

        echo json_encode(array("success"=>true, "publicstatus"=>$item->getProperties()->getPublicStatus(),"versionstatus"=>$item->getProperties()->getVersion()->getStatus()));                 
    
}catch (Exception $e){ 
    echo json_encode(array("success"=>false, "message"=>$e->getMessage()));                 

}



?>
