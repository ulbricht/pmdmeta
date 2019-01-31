<?php

//ini_set("display_errors",1);

$seconds=12*3600;
$modified=time();
$expires=$modified+$seconds;

header( 'Last-Modified: ' . gmdate( 'D, d M Y H:i:s',$modified ) . ' GMT' ); 
header("Expires: ".gmdate("D, d M Y H:i:s",$expires )." GMT"); 
header("Cache-Control: private, max-age=$seconds");
header("Pragma: cache");


$thesauruses=array();

foreach ($_REQUEST as $key => $value){

	if (substr($key,0,strlen("thesaurus"))==="thesaurus")
		$thesauruses[$value]=$value;
}
//$thesauruses=array("gcmd");


foreach ($thesauruses as $thesaurus){

	$thesaurusuri="";
	$thesaurusname="";

	if (strlen($thesaurus)==0)
		continue;

	$def=readfromfile($thesaurus,"_labels.csv");

	foreach (readfromfile($thesaurus,"_index.csv") as $uri =>$name){
		$thesaurusuri=$uri;
		$thesaurusname=array_shift($name);
	}
	$rel=readfromfile($thesaurus,"_relations.csv");
	$key=readfromfile($thesaurus,"_keywords.csv");

	$elements=getRoots($rel);

//var_dump($elements);return;

$ret['success']='true';
	foreach (walktree($rel,$def,$key,$thesaurusuri,$thesaurusname,$elements) as $child)
		$ret['children'][]=$child;
}


echo json_encode($ret);

function walktree ($relations, $definitions, $keys, $thesaurusuri, $thesaurusname, $items,$searchkey=""){
	$ret=array();
	foreach ($items as $element){	
		$obj=array();
		$obj['id']=$element;
		$obj["name"]=$definitions[$element][0];
		$obj["qtip"]=$definitions[$element][1];
	
		$obj["qtip"]=preg_replace("/[\n\r]/","<br>",$obj["qtip"]);

                if ($element=='1eb0ea0a-312c-4d74-8d42-6f1ad758f999'||
			$element=='e9f67a66-e9fc-435c-b720-ae32a2c3d8f5'||
			$element=='894f9116-ae3c-40b6-981d-5113de961710')//expand science keywords
                    $obj['expanded']=true;
		if (array_key_exists($element,$keys)!==FALSE){
			$keyword=$keys[$element][0];
			if ( strrpos($keyword, ">") !== FALSE) { 
			    $keyword = substr($keyword, strrpos($keyword, ">")+1); 
			}
			$obj["keyword"]=trim($keyword);
		}				

		$obj["thesaurusuri"]= $thesaurusuri;
		$obj["thesaurusname"]= $thesaurusname;

		if (count($relations[$element])==0){
			$obj['leaf']='true';
		}else{
			$obj['leaf']='false';
			$obj['children']=walktree($relations, $definitions, $keys, $thesaurusuri, $thesaurusname, $relations[$element]);
		}
		array_push($ret,$obj);
	}
	return $ret;
}
	

function getRoots($relations){
	$children=array();
	foreach ($relations as $relation)
		foreach ($relation as $k)
			if (!isset($children[$k]))
				$children[$k]=$k;
			
	$keys=array_keys($relations);
	$roots=array_diff($keys,$children);
	return $roots;
}
function readfromfile ($thesaurus,$extention){
	$file = fopen($thesaurus.$extention,"r");

	if (!$file)
		throw new Exception("can not find thesaurus ".$thesaurus);
	$def=array();
	while(($line=fgetcsv($file) )!==FALSE)
	  {
		$id=array_shift($line);
		$def[$id]=$line;
	  }
	fclose ($file);
	return $def;
}


?>
