<?php

    include_once("includes/inc_conf.php");   
        
    $path="../../../";
    $reviewfiles=scandir($path);
    
    
   header("Content-type: text/xml");     
    echo "<html><body>";  
    foreach ($reviewfiles as $review)
        if (is_dir($path.$review) && is_dir($path.$review."/xsl/") && file_exists($path.$review."/xsl/datasetoverview.xslt")){
            echo '<a href="'.$systemserver."/".$review.'" target="_blank">'.$review.'</a>'."\n";
	}
    echo "</body></html>";
            



?>
