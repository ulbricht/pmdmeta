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


require_once 'classes/escidoc/XMLNode.php';

class FileMetadata extends XMLNode{
    public function __construct($resource=null, $copy = true) {
        
        
        try{
            parent::__construct($resource, $copy);
        }catch (Exception $e){   
            parent::__construct(file_get_contents(dirname(__FILE__).'/templates/FileMetadata.xml'));
        }
        $this->registerNS("escidocfile", "http://purl.org/escidoc/metadata/profiles/0.1/file");
        $this->registerNS("dc", "http://purl.org/dc/elements/1.1/");
        $this->registerNS("xsi","http://www.w3.org/2001/XMLSchema-instance");
        $this->registerNS("dcterms","http://purl.org/dc/terms/");
                
    }
    /**
     *
     * @return string 
     */
    public function getFilename(){
        return $this->xpath("/dc:title")->item(0)->nodeValue;
    }
    /**
     *
     * @return string 
     */
    public function getMimeType(){
        return $this->xpath("/dc:format")->item(0)->nodeValue;
    }
    /**
     *
     * @return string 
     */
    public function getFilesize(){
        return $this->xpath("/dcterms:extent")->item(0)->nodeValue;
    }
    /**
     *
     * @return string 
     */
    public function getDescription(){
        return $this->xpath("/dc:description")->item(0)->nodeValue;        
    }
    /**
     *
     * @return string 
     */
    public function getDateCopyrighted(){
        return $this->xpath("/dcterms:dateCopyrighted")->item(0)->nodeValue;                
    }        
    /**
     *
     * @return string 
     */
    public function getRights(){
        return $this->xpath("/dc:rights")->item(0)->nodeValue;        
    }
    /**
     *
     * @return string 
     */
    public function getLicense(){
        return $this->xpath("/dcterms:license")->item(0)->nodeValue;        
    }

    /**
     *
     * @param string $value 
     */
    public function setFilename($value){
        $this->xpath("/dc:title")->item(0)->nodeValue=$value;
    }
    /**
     *
     * @param string $value 
     */
    public function setMimeType($value){
        $this->xpath("/dc:format")->item(0)->nodeValue=$value;
    }
    /**
     *
     * @param string $value 
     */
    public function setFilesize($value){
        $this->xpath("/dcterms:extent")->item(0)->nodeValue=$value;
    }
    /**
     *
     * @param string $value 
     */
    public function setDescription($value){
        $this->xpath("/dc:description")->item(0)->nodeValue=$value;        
    }
    /**
     *
     * @param string $value 
     */
    public function setDateCopyrighted($value){
        $this->xpath("/dcterms:dateCopyrighted")->item(0)->nodeValue=$value;                
    }
    /**
     *
     * @param string $value 
     */
    public function setRights($value){
        $this->xpath("/dc:rights")->item(0)->nodeValue=$value;        
    }
    /**
     *
     * @param string $value 
     */
    public function setLicense($value){
        $this->xpath("/dcterms:license")->item(0)->nodeValue=$value;        
    }
    
}

?>
