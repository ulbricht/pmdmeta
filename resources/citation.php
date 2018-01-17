<?php

session_start();         

try {

if ($_REQUEST["cmd"]==="c" || $_REQUEST["cmd"]==="u" || $_REQUEST["cmd"]==="d"){
	if (!isset($_SESSION["eSciDocUserHandle"])){
		throw new Exception('You must be logged in!', 401);
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
			createcitation($dbo,$citation["url"],$citation["citation"],$citation["datetimecopied"]);
		echo json_encode(array('success'=>true, 'message'=>'Created Record','citations'=>$citations));
		break;
	case 'r':
		$citations=fetchcitations($dbo);
		echo json_encode(array('citations'=>$citations));
		break;
	case 'u':
		foreach ($citations as $citation)
			updatecitation($dbo,$citation["url"],$citation["citation"],$citation["datetimecopied"]);
		echo json_encode(array('success'=>true, 'message'=>'Updated Record','citations'=>$citations));
		break;
	case 'd':
		foreach ($citations as $citation)
			removecitation($dbo,$citation["url"]);
		echo json_encode(array('success'=>true, 'message'=>'Deleted Record','citations'=>array()));
		break;
}

}catch (PDOException $e){

	header("Erver error",true,500);
	echo json_encode(array('success'=>false, 'message'=>$e->getMessage(),'citations'=>array()));
	return;

}catch (Exception $e){
	header("Error",true,$e->getCode());
	echo json_encode(array('success'=>false, 'message'=>$e->getMessage(),'citations'=>array()));
	return;

}

return;

//-------------------------------
// Supporting functions
//-------------------------------
function createcitation($dbo,$url,$citation,$timestamp){
	if (!$timestamp || strlen($timestamp)===0)
		$timestamp=null;
	$sth=$dbo->prepare("INSERT INTO citationcache (url, citation, datetimecopied) VALUES (?,?,?)");
	$sth->execute(array($url,$citation,$timestamp));
	return true;
}
function updatecitation($dbo,$url,$citation,$timestamp){
	if (!$timestamp || strlen($timestamp)===0)
		$timestamp=null;
	$sth=$dbo->prepare("UPDATE citationcache SET citation=?, datetimecopied=? WHERE url=?");
	$sth->execute(array($citation,$timestamp,$url));
	return true;
}
function removecitation($dbo,$url){
	$sth=$dbo->prepare("DELETE FROM citationcache WHERE url=?");
	$sth->execute(array($url));
	return true;
}
function fetchcitations($dbo){
	$result=array();
	$sth=$dbo->prepare("SELECT url, citation, datetimecopied FROM citationcache");
	$sth->execute(array());
	$mres= $sth->fetchall();
	foreach($mres as $r){
	    $ret=array();
	    $ret["url"]=$r["url"];
	    $ret["citation"]=$r["citation"];
	    $ret["datetimecopied"]=$r["datetimecopied"];
	    $result[]=$ret;
	}
	return $result;
}
?>
