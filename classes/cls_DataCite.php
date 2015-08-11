<?php
/*
Copyright [2010] [GFZ German Research Centre for Geosciences]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*
 *  The class "DataCite" provides functionality to register/update DOIs
 *  and their metadata via Datacite-API (see: https://mds.datacite.org).
 *
 *  To get Errors during processing catch the instance of a DataCiteException.
 *
 *  For a test case see the bottom of this file.
 *
 * 2011-07-13  - commented the test functions at the bottom
 * 2011-06-17  - Update auf neue API -> https://mds.datacite.org
 * 2011-06-09  - Mirkos XPath-Klassen
 */

require_once 'HTTP/Request2.php';

use \HTTP_Request2;
use \HTTP_Request2_Response;
use \HTTP_Request2_Exception;

class DataCiteException extends RuntimeException{

    public function __construct($message, $code=null, $previous=null) {
        //Only two parameter for exception handling
        //parameters for Exception([string $exception [, long $code ]]) only for >= PHP5.2.10 and < PHP5.3.6
        parent::__construct($message, $code);
    }

}
/*
 * DataCite class
 * REST API
 */
/**
 * Description of DataCite
 * 
 * @property string $service protected access
 * @property string $user protected access
 * @property string $passwd protected access
 * @property string $testmode protected access
 */
class DataCite{

    protected $service;
    protected $user;
    protected $passwd;
    protected $testmode;
    
    
    //new DataCite ("me","secret","https://api.datacite.org");
    /**
     *
     * @param string $user
     * @param string $passwd
     * @param string $service 
     */
    public function __construct($user, $passwd, $service) {
            $this->service=$service;
	    $this->user=$user;
 	    $this->passwd=$passwd;
            $testmode='';
    }

    /**
     *
     * @param string $url
     * @param string $method
     * @param string $data
     * @return array $ret 
     */
    protected function send($url,$method,$data){

//FIXME should be better IllegalArgumentException
        if (array_search($method,array('GET','PUT','POST','DELETE'))===FALSE)
            throw new DataCiteException ("Illegal http method \"".$method." ".$url."\"!");
        
        
                 try{                
                    
                    $httpRequest = new HTTP_Request2($url);
                    $httpRequest->setConfig(array("ssl_verify_peer"=>false));                   
                    $httpRequest->setAuth($this->user, $this->passwd, HTTP_Request2::AUTH_BASIC);
                    $httpRequest->setHeader(array(
                                    "Accept"=>"application/xml",
                                    "Content-Type"=> "application/xml;charset=UTF-8"
                                    ));     
 
                    $httpRequest->setMethod($method);
                    if ($data != null) {
                            $httpRequest->setBody($data);
                    }

                    $response = $httpRequest->send();
                }catch(HTTP_Request2_Exception $e){
			throw new DataCiteException($url." : ".$e->getMessage(), $e->getCode());
		}               
                
                $ret["body"]=$response->getBody();
                $ret["code"]=$response->getStatus();
                $ret["header"]=$response->getHeader();

                if (!($ret["code"]>=200 && $ret["code"]<300))
                    throw new DataCiteException ($ret["body"],$ret["code"]);

                return $ret;
        
    }

    //retrieves the url of a DOI
    /**
     *
     * @param string $doi
     * @return array $ret 
     */
    public function doiRetrieve($doi){
         return $this->send($this->service."/doi/".$doi,'GET','');        
    }

    //creates/updates a DOI and the associated url
    /**
     *
     * @param string $doi
     * @param string $url 
     * @return array $ret 
     */
    public function doiUpdate($doi,$url){
         return $this->send($this->service."/doi",'POST',"doi=".$doi."\n"."url=".$url);
    }

    //retrieve the metadata that is associated with a DOI
    /**
     *
     * @param string $doi
     * @return array $ret 
     */
    public function metaRetrieve($doi){
         return $this->send($this->service."/metadata/".$doi,'GET','');
    }

    //associate metadata with a DOI, activate an inactive DOI
    /**
     *
     * @param string $metadata
     * @return array $ret 
     */
    public function metaUpdate($metadata){
         return $this->send($this->service."/metadata",'POST',$metadata);
    }

    //makes metadata of a DOI inactive
    /**
     *
     * @param string $doi
     * @return array $ret 
     */
    public function metaDelete($doi){
         return $this->send($this->service."/metadata/".$doi,'DELETE','');
    }

    //updates username, password and optionally the serviceaddress
    /**
     *
     * @param string $user
     * @param string $passwd
     * @param string $service 
     */
    public function setAuth($user,$passwd,$service=''){
            if ($service!=='') $this->service=$service;
	    $this->user=$user;
 	    $this->passwd=$passwd;
    }

    //avoids persistent changes
    public function testmode($mode=false){
        if ($mode){
            $this->testmode="?testMode=true";
        }else{
            $this->testmode="";
        }
    }
     

}

class DOIDB extends DataCite{
     //new DataCite ("me","secret","https://doidb.wdc-terra.org/mds");
    /**
     *
     * @param string $user
     * @param string $passwd
     * @param string $service 
     */
    public function __construct($user, $passwd, $service) {
           parent::__construct($user, $passwd, $service); 
    }  

    //retrieve the metadata that is associated with a DOI
    /**
     *
     * @param string $doi
     * @return array $ret 
     */
    public function metaDifRetrieve($doi){
         return $this->send($this->service."/difmetadata/".$doi,'GET','');
    }

    //associate metadata with a DOI, activate an inactive DOI
    /**
     *
     * @param string $metadata
     * @return array $ret 
     */
    public function metaDifUpdate($doi,$metadata){
         return $this->send($this->service."/difmetadata/".$doi,'POST',$metadata);
    }

    //makes metadata of a DOI inactive
    /**
     *
     * @param string $doi
     * @return array $ret 
     */
    public function metaDifDelete($doi){
         return $this->send($this->service."/difmetadata/".$doi,'DELETE','');
    }
    
    //retrieve the metadata that is associated with a DOI
    /**
     *
     * @param string $doi
     * @return array $ret 
     */
    public function metaIsoRetrieve($doi){
         return $this->send($this->service."/isometadata/".$doi,'GET','');
    }

    //associate metadata with a DOI, activate an inactive DOI
    /**
     *
     * @param string $metadata
     * @return array $ret 
     */
    public function metaIsoUpdate($doi,$metadata){
         return $this->send($this->service."/isometadata/".$doi,'POST',$metadata);
    }

    //makes metadata of a DOI inactive
    /**
     *
     * @param string $doi
     * @return array $ret 
     */
    public function metaIsoDelete($doi){
         return $this->send($this->service."/isometadata/".$doi,'DELETE','');
    }    
    
}
?>
