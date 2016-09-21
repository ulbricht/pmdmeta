<?php

$ns_skos="http://www.w3.org/2004/02/skos/core#";
$ns_rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#";

$dom=new DOMDocument();
$dom->load("sciencekeywords.rdf");

$rel=array();
$def=array();

$concepts=$dom->getElementsByTagNameNS($ns_skos,"Concept");

foreach ($concepts as $concept){
	$id=$concept->getAttributeNS($ns_rdf,'about');
	
	$definitions=$concept->getElementsByTagNameNS($ns_skos,"definition");
	if ($definitions->length>0)
		$def[$id]["definition"]=$definitions->item(0)->nodeValue;
	
	$labels=$concept->getElementsByTagNameNS($ns_skos,"prefLabel");
	if($labels->length>0)
		$def[$id]["label"]=$labels->item(0)->nodeValue;
	
	if (array_key_exists($id,$rel)===FALSE || !is_array($rel[$id])){
		$rel[$id]=array();
	}
	foreach ($concept->getElementsByTagNameNS($ns_skos,"narrower") as $narrower){
		$n=$narrower->getAttributeNS($ns_rdf,'resource');
		$rel[$id][$n]=$n;
	}
	foreach ($concept->getElementsByTagNameNS($ns_skos,"broader") as $broader){
		$b=$broader->getAttributeNS($ns_rdf,'resource');
		if (array_key_exists($b,$rel)===FALSE || !is_array($rel[$b])){
			$rel[$b]=array();
		}				
		$rel[$b][$id]=$id;		
	}	
}

$file = fopen("gcmd_labels.csv","w");
foreach ($def as $k=>$d)
  {
	$out=array();
	array_push($out,$k);
	array_push($out,$d["label"]);
	if (array_key_exists("definition",$d)!==FALSE)
		array_push($out,$d["definition"]);
	else
		array_push($out,"");
	fputcsv($file,$out);
  }
fclose ($file);

$file = fopen("gcmd_relations.csv","w");
foreach ($rel as $k=>$d)
  {
	$out=$d;
	array_unshift($out,$k);
	fputcsv($file,$out);
  }
fclose ($file);

$roots=getRoots($rel);
$file=fopen("gcmd_keywords.csv","w");
traverse($file,"",$roots,$rel,$def);
fclose ($file);


function traverse ($file,$prefix,$ids,$relations,$definitions){
	foreach ($ids as $id){	
		if ($definitions[$id]["label"]!=="Science Keywords"){
			if (strlen($prefix)>0)
				fputcsv($file,array($id,$prefix." > ".$definitions[$id]["label"]));	
			else
				fputcsv($file,array($id,$definitions[$id]["label"]));			
		}
		$children=$relations[$id];
		if (count($children)>0){
			if (strlen($prefix)>0){
				$newprefix=$prefix." > ".$definitions[$id]["label"];
			}else {
				if ($definitions[$id]["label"]==="Science Keywords")
					$newprefix="";			
				else
					$newprefix=$definitions[$id]["label"];
			}
			traverse($file,$newprefix,$children,$relations,$definitions);		
			
		}
	}
} 

  
function getRoots($relations){
	$children=array();
	foreach ($relations as $d)
		$children=array_merge($children,$d);
	$roots=array_diff(array_keys($relations),$children);
	return $roots;
}  




?>