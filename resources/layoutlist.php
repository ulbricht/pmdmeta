<?php

    include_once("includes/inc_conf.php");   
        
    $reviewfiles=scandir("../../../");
    
    $invaliddirs=array(".","..","dmp","extern","panmetaworks","lib","alt");
    
   header("Content-type: text/xml");     
    echo "<html><body>";  
    foreach ($reviewfiles as $review)
        if (array_search($review,$invaliddirs)===FALSE)
            echo '<a href="'.$systemserver.$review.'" target="_blank">'.$review.'</a>'."\n";
    echo "</body></html>";
            



?>
