<?php
 
       
     
    
try{
    
    $itemid=$_REQUEST["id"];

    error_reporting(E_ALL ^ E_NOTICE);

    $dsn="mysql:host=localhost;dbname=db";//pdo connection string
    $dbo = new PDO($dsn,"user","pass");
    $dbo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

     $pmdinstance="4dmb_";

        try{

            $dbo->beginTransaction();

                $sthds=$dbo->prepare('DELETE FROM '.$pmdinstance.'dataset WHERE id = ?');
                $sthds->execute(array($itemid));

                $sthmd=$dbo->prepare('DELETE FROM '.$pmdinstance.'mdrecords WHERE datasetid = ?');
                $sthmd->execute(array($itemid));                

                $sthft=$dbo->prepare('DELETE FROM '.$pmdinstance.'fullidx WHERE datasetid = ?');
                $sthft->execute(array($itemid));                

                $sthfct=$dbo->prepare('DELETE FROM '.$pmdinstance.'facets WHERE datasetid = ?');
                $sthfct->execute(array($itemid));                

                $sthfct=$dbo->prepare('DELETE FROM '.$pmdinstance.'location WHERE datasetid = ?');
                $sthfct->execute(array($itemid));                

                $sthfct=$dbo->prepare('DELETE FROM '.$pmdinstance.'oaipmh WHERE datasetid = ?');
                $sthfct->execute(array($itemid));                

            $dbo->commit();

        }catch(PDOException $e) {
            $dbo->rollback();
            throw $e;
        }
        $warning="";
      
        echo json_encode(array("success"=>true, "message"=>$warning));                 
                
        return; //do the loop for only one item 
    
  
}catch (Exception $e){
    
    echo json_encode(array("success"=>false, "message"=>$e->getMessage()));                 

}



?>
