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


use escidoc\resources\om\context\Context;

use escidoc\resources\xlink\XLink;
use escidoc\resources\common\reference\UserAccountRef;
use escidoc\util\Uri;

class PanmetadocsContextConfig{

    var $group;    
    var $admingroup;
    
    public function __construct(DOMElement $admindescriptor=null){

            $this->group=new XLink();   
           $this->admingroup=new XLink();            
        
        if ($admindescriptor instanceof DOMElement){
        
            $dom=new DOMDocument("1.0","utf8");
            $dom->appendChild($dom->importNode($admindescriptor,true));        

            $xpath=new DOMXPath($dom);

            $projectgroupnode=$xpath->query("//projectgroup");
            if ($projectgroupnode->length!=1)
                    throw new Exception($this->getObjid().": missing projectgroup in admin-descriptor.");
            $projectgroup=$projectgroupnode->item(0);
            $uri=$projectgroup->lookupNamespaceURI("xlink");
            $href=$projectgroup->getAttributeNS($uri,"href");
            $name=$projectgroup->nodeValue;
            $uri=new Uri("http://dummy".$href);
            $this->group->setHref($uri);
            $this->group->setTitle($name);

            $projectadmingroupnode=$xpath->query("//projectadmingroup");
            if ($projectadmingroupnode->length!=1)
                    throw new Exception($this->getObjid().": missing projectadmingroup in admin-descriptor.");
            $projectadmingroup=$projectadmingroupnode->item(0);
            $href=$projectadmingroup->getAttributeNS($uri,"href");
            $name=$projectadmingroup->nodeValue;
            $uri=new Uri("http://dummy".$href);
            $this->admingroup->setHref($uri);
            $this->admingroup->setTitle($name);   
        }
        
    }

    public function getUserGroupID() {
        $grphref=preg_split("|/|",$this->getUserGroupHRef());
        return array_pop($grphref);
    }
    public function getUserGroupHRef() {
        return $this->group->getHref()->getPath();
    }        
    public function getUserGroupName() {
        return $this->group->getTitle();
    }
    public function getAdminGroupID() {
        $admgrphref=preg_split("|/|",$this->getAdminGroupHRef());
        return array_pop($admgrphref);
    }
    public function getAdminGroupHRef() {
        return $this->admingroup->getHref()->getPath();
    }        
    public function getAdminGroupName() {
        return $this->admingroup->getTitle();
    }        
    public function setUserGroup(UserAccountRef $group){
        
        if (!$this->group)
            $this->group=new XLink();   

        $this->group->setHref($group->getXLink()->getHref());
        $this->group->setTitle($group->getXLink()->getTitle());
    }
    public function setAdminGroup(UserAccountRef $admingroup){
        
        if (!$this->admingroup)
            $this->admingroup=new XLink();   
        
        $this->admingroup->setHref($admingroup->getXLink()->getHref());
        $this->admingroup->setTitle($admingroup->getXLink()->getTitle());
    }


    public function __toString(){
            return '<panmetadocsconfig>'.
               '<projectgroup xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'.$this->getUserGroupHRef().'">'.$this->getUserGroupName().'</projectgroup>'.
               '<projectadmingroup xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'.$this->getAdminGroupHref().'">'.$this->getAdminGroupName().'</projectadmingroup>'.
               '<metadataprofiles></metadataprofiles>'.
            '</panmetadocsconfig>';
    }
    

}


?>
