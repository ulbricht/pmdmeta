<?php
require_once 'PEAR.php';
//require_once "Mail.php";

error_log("\nin submitmail\n", 3, "/var/www/html/pmdmeta/php_logfile.log");




 // $from = "Sandra Sender <sender@example.com>";
 // $to = "Neville Shane <nshane@ldeo.columbia.edu>";
 // $subject = "Hi!";
 // $body = "Hi,\n\nHow are you?";
 
 // $host = "mail.iedadata.org";
 // $username = "hub@iedadata.org";
 // $password = "GeoMapApp1";
 
 // $headers = array ('From' => $from,
 //   'To' => $to,
 //   'Subject' => $subject);
 // $smtp = Mail::factory('smtp',
 //   array ('host' => $host,
 //     'auth' => true,
 //     'username' => $username,
 //     'password' => $password));
 
 // $mail = $smtp->send($to, $headers, $body);
 // error_log("mail error", 3, "/var/www/html/pmdmeta/php_logfile.log");
 // if (PEAR::isError($mail)) {
 // 	error_log("mail error", 3, "/var/www/html/pmdmeta/php_logfile.log");

 //   echo("<p>" . $mail->getMessage() . "</p>");
 //  } else {
 //  	error_log("Message successfully sent!", 3, "/var/www/html/pmdmeta/php_logfile.log");
 //   echo("<p>Message successfully sent!</p>");
 //  }
 






// ini_set("display_errors","1");

// header("HTTP/1.0 200 OK");

 $json_file=$_POST['json_file'];
 updateJsonFile($json_file);

// $filecontent=$_POST['mailcontent'];
// $filename=genfilename($filecontent);
// $filetype="text/xml";  
  
// $recipient ="hub.admin@iedadata.org";
// $sender= "hub@iedadata.org";
// $subject = "New IEDA Hub Dataset Submission";

// $attachment= chunk_split(base64_encode($filecontent));
// $boundary = md5(uniqid(time()));

// $kopf = "MIME-Version: 1.0\n";
// $kopf .= "From: ".$sender."\n";
// $kopf .= "Content-Type: multipart/mixed; boundary=".$boundary."\n\n";
// $kopf .= "This is a multi-part message in MIME format.\n";
// $kopf .= "--".$boundary."\n";
// $kopf .= "Content-Type: text/plain\n";
// $kopf .= "Content-Transfer-Encoding: 8bit\n\n";
// $kopf .= "\n";
// $kopf .= "--".$boundary."\n";
// $kopf .= "Content-Type: ".$filetype."; name=\"".$filename."\"\n";
// $kopf .= "Content-Transfer-Encoding: base64\n";
// $kopf .= "Content-Disposition: attachment; filename=\"".$filename."\"\n\n";
// $kopf .= $attachment."\n";
// $success=mail($recipient, $subject, "", $kopf);    
 

// var $jsoncode = json_encode(array("success"=>$success, "fileName"=>$filename, "fileSize"=>sizeof($filecontent), "fileType"=>$filetype));

error_log("\nhello\n", 3, "/var/www/html/pmdmeta/php_logfile.log");     
function genfilename($xml){

	$dom=new DOMDocument();
	$dom->loadXML($xml);
	$xpath=new DOMXPath($dom);

	$title="";
	$tq=$xpath->query("//*[local-name()='resource']/*[local-name()='titles']/*[local-name()='title']");
	if ($tq->length >0)
		$title=$tq->item(0)->nodeValue;

	$name="";
	$nq=$xpath->query("//*[local-name()='resource']/*[local-name()='creators']/*[local-name()='creator']/*[local-name()='creatorName']");
	if ($nq->length >0)
		$name=$nq->item(0)->nodeValue;

	$name=array_shift(preg_split('/,/',$name));

	$timestamp=date("Ymd_Hi");
	$savename=$name."_".$title."_".$timestamp;
	return preg_replace('/[^A-Za-z0-9äöüÄÖÜß_\-\ ]/','',$savename);
}


function updateJsonFile($file){
	//update json metadata file
    error_log($file, 3, "/var/www/html/pmdmeta/php_logfile.log");
    $jsonString = file_get_contents($file);
    $jsonData = json_decode($jsonString, true);
    $jsonData['status'] = "Metadata Submitted";
    $jsonData['metadata submit timestamp'] = date("Y-m-d H:i:s");
    $newJsonString = json_encode($jsonData);
    file_put_contents($file, $newJsonString);
}


     
     
?>