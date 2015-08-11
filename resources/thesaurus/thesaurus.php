<?php

$rel=array();
$def=array();
$key=array();

$thesaurus=false;
$conceptid=false;

if (php_sapi_name()==='cli'){
	$thesaurus=$argv[1];
	$conceptid=$argv[2];
}else{
	$thesaurus=strtolower($_REQUEST["thesaurus"]);
	$conceptid=$_REQUEST["node"];
}
if (strlen($thesaurus)==0){
    echo '{"success": true,"children": []}';
    return;
}


$file = fopen($thesaurus."_labels.csv","r");
while(($line=fgetcsv($file) )!==FALSE)
  {
	$id=array_shift($line);
	$def[$id]=$line;
  }
fclose ($file);

$file = fopen($thesaurus."_relations.csv","r");
while(($line=fgetcsv($file) )!==FALSE)
  {
	$id=array_shift($line);
	$rel[$id]=$line;
  }
fclose ($file);

$file = fopen($thesaurus."_keywords.csv","r");
while(($line=fgetcsv($file) )!==FALSE)
  {
	$id=array_shift($line);
	$key[$id]=$line;
  }
fclose ($file);

$elements;
if (strlen($conceptid)==0 || $conceptid=="root"){
	$elements=getRoots($rel);
}else{
	$elements=$rel[$conceptid];
}
	
$ret['success']='true';
$ret['children']=walktree($rel,$def,$key,$elements);
echo json_encode($ret);



function walktree ($relations, $definitions, $keys, $items,$searchkey=""){
	$ret=array();
	foreach ($items as $element){	
		$obj=array();
		$obj['id']=$element;
		$obj["name"]=$definitions[$element][0];
		$obj["qtip"]=$definitions[$element][1];
                if ($element=='1eb0ea0a-312c-4d74-8d42-6f1ad758f999')//expand science keywords
                    $obj['expanded']=true;
		if (array_key_exists($element,$keys)!==FALSE)
			$obj["keyword"]=$keys[$element][0];					

		if (count($relations[$element])==0){
			$obj['leaf']='true';
		}else{
			$obj['leaf']='false';
			$obj['children']=walktree($relations, $definitions, $keys, $relations[$element]);
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

?>