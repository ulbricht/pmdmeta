<?php
error_log("in thesaurus\n", 3, "/Users/Neville/software/pmdmeta/php_logfile.log");

$thesauruses=array();

foreach ($_REQUEST as $key => $value){
	if (substr($key,0,strlen("thesaurus"))==="thesaurus"){
		$thesauruses[$value]=$value;
		error_log("$key\n", 3, "/Users/Neville/software/pmdmeta/php_logfile.log");
		error_log("$value\n", 3, "/Users/Neville/software/pmdmeta/php_logfile.log");
	}
}
//$thesauruses=array("gcmd");


foreach ($thesauruses as $thesaurus){

	$thesaurusuri="";
	$thesaurusname="";
	$codelistvalue="Theme";

	if (strlen($thesaurus)==0)
		continue;

	$def=readfromfile($thesaurus,"_labels.csv");
	foreach (readfromfile($thesaurus,"_index.csv") as $uri =>$name){
		$thesaurusuri=$uri;
		$thesaurusname=array_shift($name);
		if (count($name) > 0) 
			$codelistvalue=array_shift($name);
	}
	$rel=readfromfile($thesaurus,"_relations.csv");
	$key=readfromfile($thesaurus,"_keywords.csv");

	$elements=getRoots($rel);

//var_dump($elements);return;

$ret['success']='true';
	foreach (walktree($rel,$def,$key,$thesaurusuri,$thesaurusname,$codelistvalue,$elements) as $child)
		$ret['children'][]=$child;
}


echo json_encode($ret);

function walktree ($relations, $definitions, $keys, $thesaurusuri, $thesaurusname, $codelistvalue, $items,$searchkey=""){
	$ret=array();
	foreach ($items as $element){	
		$obj=array();
		$obj['id']=$element;
		$obj["name"]=$definitions[$element][0];
		$obj["qtip"]=$definitions[$element][1];

//		$obj["qtip"]=preg_replace("/[\n\r]/","<br>",$obj["qtip"]);

                if ($element=='1eb0ea0a-312c-4d74-8d42-6f1ad758f999')//expand science keywords
                    $obj['expanded']=true;
		if (array_key_exists($element,$keys)!==FALSE)
			$obj["keyword"]=$keys[$element][0];					

		$obj["thesaurusuri"]= $thesaurusuri;
		$obj["thesaurusname"]= $thesaurusname;
		$obj["codelistvalue"]= $codelistvalue;

		if (count($relations[$element])==0){
			$obj['leaf']='true';
		}else{
			$obj['leaf']='false';
			$obj['children']=walktree($relations, $definitions, $keys, $thesaurusuri, $thesaurusname, $codelistvalue, $relations[$element]);
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
