<?php

    include_once("includes/inc_conf.php");   
        
    $reviewfiles=scandir("../../review");
    
   header("Content-type: text/xml");     
    echo "<html><body>";
    foreach ($reviewfiles as $review)
        if (strncmp($review,md5($_REQUEST["id"]),strlen(md5($_REQUEST["id"])))==0)
            echo '<a href="'.$systemserver.'/review/'.$review.'" target="_blank">'.$review.'</a>';
    echo "</body></html>";
            



?>
