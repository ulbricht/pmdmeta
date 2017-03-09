<?php


    session_start();

    if (!isset($_FILES) || !isset($_FILES['metaupload'])){
        header("Content-type: text/xml"); 
        echo $_SESSION["xml"];
        unset ($_SESSION["xml"]);
        return;
    }
    
    header("HTTP/1.0 201 OK");    
    
    $error =false;
    try{
    $file=$_FILES['metaupload'];
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
    
    $xmldom=new DOMDocument();
    $xmldom->load($file['tmp_name']);
    $_SESSION["xml"]=outdom($xmldom);
   
    }catch (Exception $e){
        $error=$e.getMessage();
    }
    
    
    echo json_encode(array("success"=>true,"error"=>$error ));
     
    function outdom($xmldom){
        $xsl = new XSLTProcessor();    
        $xsldom=new DOMDocument();
        $xsldom->load("../convert-remove-namespace.xslt");
        $xsl->importStyleSheet($xsldom);
    
        return $xsl->transformToXML($xmldom);        
    }     
     
     
?>