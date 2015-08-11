<?php

ini_set("display_errors","1");

header("HTTP/1.0 200 OK");

$filecontent=$_POST['mailcontent'];
$filename="metadata.xml";
$filetype="text/xml";  
    
$recipient ="ulbricht@gfz-potsdam.de";
$sender= "ulbricht@gfz-potsdam.de";
$subject = "[PMD] Metadata submission";

$attachment= chunk_split(base64_encode($filecontent));
$boundary = md5(uniqid(time()));

$kopf = "MIME-Version: 1.0\n";
$kopf .= "From: ".$sender."\n";
$kopf .= "Content-Type: multipart/mixed; boundary=".$boundary."\n\n";
$kopf .= "This is a multi-part message in MIME format.\n";
$kopf .= "--".$boundary."\n";
$kopf .= "Content-Type: text/plain\n";
$kopf .= "Content-Transfer-Encoding: 8bit\n\n";
$kopf .= "\n";
$kopf .= "--".$boundary."\n";
$kopf .= "Content-Type: ".$filetype."; name=\"".$filename."\"\n";
$kopf .= "Content-Transfer-Encoding: base64\n";
$kopf .= "Content-Disposition: attachment; filename=\"".$filename."\"\n\n";
$kopf .= $attachment."\n";

$success=mail($recipient, $subject, "", $kopf);    

echo json_encode(array("success"=>$success, "fileName"=>$filename, "fileSize"=>sizeof($filecontent), "fileType"=>$filetype));

    
     
     
?>