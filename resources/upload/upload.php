<?php

    
    include_once('../../includes/inc_conf.php');  
    
    require_once ("Net/URL.php");
    use \Net_URL;   
    use escidoc\client\StagingFileHandler;

    include_once "classes/escidoc/escidoclogin.php";     


    header("HTTP/1.0 201 OK");


    $file=$_FILES['fileupload'];
    $errcode=$file['error'];
    if ($errcode!=UPLOAD_ERR_OK){
        switch ($errcode){
        case UPLOAD_ERR_INI_SIZE:  throw new Exception("Filesize exceeds limit ".ini_get('upload_max_filesize')."!");
        case UPLOAD_ERR_FORM_SIZE: throw new Exception("Filesize exceeds limit of HTML form!");
        case UPLOAD_ERR_PARTIAL:   throw new Exception("Fileupload did not finish!");
        case UPLOAD_ERR_NO_FILE:   throw new Exception("There was no file. Did you forget to select one?");
        default:                   throw new Exception("An error with unknown code \"".$errcode.
                                                  "\" occured.<br>Am I running on a very new PHP version?");
       }

    }

    if ($file['size']<1)
        throw new Exception("Your uploaded file is empty!");
    
    $_SESSION["stagingfilehandler"]=new StagingFileHandler(new Net_URL($escidoccoreservice));
    $_SESSION["stagingfilehandler"]->setHandle($_SESSION["eSciDocUserHandle"]);


    $stage=$_SESSION["stagingfilehandler"]->upload(new SplFileInfo($file['tmp_name']));  
        

    echo json_encode(array("success"=>true, "fileName"=>$file['name'], "fileSize"=>$file['size'], "fileType"=>$file['type'],"fileURL"=>$stage->getUrl()));
    
?>