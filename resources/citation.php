<?php

session_start();         

if ($_REQUEST["cmd"]==="c" || $_REQUEST["cmd"]==="u" || $_REQUEST["cmd"]==="d"){
	if (!isset($_SESSION["eSciDocUserHandle"])){
		echo json_encode(array('success'=>false, 'message'=>'You must be logged in!','citations'=>array()));
		return;
	}
}

$dsn="mysql:host=dbhost;dbname=dbname";//pdo connection string
$dbo = new PDO($dsn,"dbuser","dbpassword");
$dbo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

$citations=array();
if (isset($_REQUEST["citations"])){
	$params=json_decode($_REQUEST["citations"],true);

	if (array_key_exists("url",$params)!==FALSE){
		$citations[]=$params;
	}else{
		foreach ($params as $param){
			if(array_key_exists("url",$param)!==FALSE)
				$citations[]=$param;
		}
	}

}

switch ($_REQUEST["cmd"]){
	case 'c':
		foreach ($citations as $citation)
			createcitation($dbo,$citation["url"],$citation["citation"],null);
		echo json_encode(array('success'=>true, 'message'=>'Created Record','citations'=>$citations));
		break;
	case 'r':
		$citations=fetchcitations($dbo);
		echo json_encode(array('citations'=>$citations));
		break;
	case 'u':
		foreach ($citations as $citation)
			updatecitation($dbo,$citation["url"],$citation["citation"],null);
		echo json_encode(array('success'=>true, 'message'=>'Updated Record','citations'=>$citations));
		break;
	case 'd':
		foreach ($citations as $citation)
			removecitation($dbo,$citation["url"]);
		echo json_encode(array('success'=>true, 'message'=>'Deleted Record','citations'=>array()));
		break;
}

return;

//-------------------------------
// Supporting functions
//-------------------------------
function createcitation($dbo,$url,$citation,$timestamp){
	try{
		if (!$timestamp || strlen($timestamp)===0)
			$timestamp=null;
		$sth=$dbo->prepare("INSERT INTO citationcache (url, citation, datetimecopied) VALUES (?,?,?)");
		$sth->execute(array($url,$citation,$timestamp));
		return true;
	}catch(PDOException $e) {
		return false;
	}
}
function updatecitation($dbo,$url,$citation,$timestamp){
	try{
		if (!$timestamp || strlen($timestamp)===0)
			$timestamp=null;
		$sth=$dbo->prepare("UPDATE citationcache SET citation=?, datetimecopied=? WHERE url=?");
		$sth->execute(array($citation,$timestamp,$url));
		return true;
	}catch(PDOException $e) {
		return false;
	}
}
function removecitation($dbo,$url){
	try{
		$sth=$dbo->prepare("DELETE FROM citationcache WHERE url=?");
		$sth->execute(array($url));
		return true;
	}catch(PDOException $e) {
		return false;
	}
}
function fetchcitations($dbo){
	$result=array();
	try{
		$sth=$dbo->prepare("SELECT url, citation, datetimecopied FROM citationcache");
		$sth->execute(array());
		$mres= $sth->fetchall();
		foreach($mres as $r){
		    $ret=array();
		    $ret["datetimecopied"]=$r["datetimecopied"];
		    $ret["citation"]=$r["citation"];
		    $ret["url"]=$r["url"];
		    $result[]=$ret;
		}
		return $result;
	}catch(PDOException $e) {
		return false;
	}
}
?>
