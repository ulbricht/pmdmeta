<?php

ini_set("display_errors","1");

header("HTTP/1.0 200 OK");


$filecontent=$_POST['mailcontent'];
$filename=genfilename($filecontent);
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

    
function genfilename($xml){

	$dom=new DOMDocument();
	$dom->loadXML($xml);
	$xpath=new DOMXPath($dom);

	$title="";
	$tq=$xpath->query("//*[local-name()='resource']/*[local-name()='titles']/*[local-name()='title']");
	if ($tq->length >0)
		$title=$tq->item(0)->nodeValue;

	if (strlen($title)>50)
	    $title=substr($title,0,50);

	$name="";
	$nq=$xpath->query("//*[local-name()='resource']/*[local-name()='creators']/*[local-name()='creator']/*[local-name()='creatorName']");
	if ($nq->length >0)
		$name=$nq->item(0)->nodeValue;

	$name=array_shift(preg_split('/,/',$name));

	$timestamp=date("Ymd_Hi");
	$savename=$name."_".$title."_".$timestamp;
	return preg_replace('/[^A-Za-z0-9äöüÄÖÜß_\-\ ]/','',$savename);
} 
     
?>

