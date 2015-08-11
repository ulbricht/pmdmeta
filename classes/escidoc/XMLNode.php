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


use \DOMDocument as DOMDocument;
use \DOMXPath as DOMXPath;
use \DOMElement as DOMElement;
use \DOMNode as DOMNode;
use \Exception as Exception;
use \InvalidArgumentException as InvalidArgumentException;


class XMLNode{
    /**
     *
     * @var DOMDocument
     */
    protected $dom;
    /**
     *
     * @var DOMXPATH
     */
    private $xpath;
    /**
     *
     * @var DOMNode
     */
    private $resource;
    /**
     *
     * The base class of all XML classes. It is able to use referencing (see $copy)
     * inside the DOMDocument, i.e. if a XMLNode- or a DOMNode-Object is provided
     * there is no need to copy the whole DOMDocument.
     *
     * @param XMLNode $resource 
     * @param DOMDocument $resource
     * @param DOMElement $resource
     * @param DOMNode $resource
     * @param string $resource creates always a copy
     * @param bool $copy ask for creating a reference to $resource
     */
    public function __construct($resource,$copy=true) {
            $this->dom=false;

            if ($copy==true){
                if (is_a($resource, "XMLNode")){
                    $this->dom=new DOMDocument($resource->dom->xmlVersion,$resource->dom->encoding);
                    $this->dom->appendChild($this->dom->importNode($resource->resource,true));
                    $this->resource=$this->dom->documentElement;
                }else if ($resource instanceof DOMDocument){
                    $this->dom=new DOMDocument($resource->xmlVersion, $resource->encoding);
                    $this->dom->appendChild($this->dom->importNode($resource->firstChild,true));
                    $this->resource=$this->dom->documentElement;
                }else if ($resource instanceof DOMNode || $resource instanceof DOMElement){
                    $this->dom=new DOMDocument($resource->ownerDocument->xmlVersion,$resource->ownerDocument->encoding);
                    $this->dom->appendChild($this->dom->importNode($resource,true));
                    $this->resource=$this->dom->documentElement;
                }
            }else{
                if (is_a($resource, "XMLNode")){                
                    $this->resource=$resource->resource;
                    $this->dom=$resource->dom;
                    $this->xpath=$resource->xpath;
                    return;
                }else if ($resource instanceof DOMNode || $resource instanceof DOMElement){
                    $this->dom=$resource->ownerDocument;
                    $this->resource=$resource;
                }else if ($resource instanceof DOMDocument){
                    $this->dom=$resource;
                    $this->resource=$resource->documentElement;
                }
            }

            if (!($this->dom instanceof DOMDocument) && is_string($resource)){
                $this->dom= new DOMDocument();
                $this->dom->loadXML($resource);
                $this->resource=$this->dom->documentElement;
            }

            if (!($this->dom instanceof DOMDocument))
                throw new Exception ("Failed to create object from: ".print_r($resource));
            
            $this->xpath=new DOMXPath($this->dom);

//            foreach (EscidocNamespaces::getUris() as $prefix=>$uri)
//                $this->registerNS ($prefix, $uri);

    }

    /**
     * Returns the root node. Due to referencing for subresources this can be
     * a different DOMNode than $this->dom->documentElement
     *
     * @return DOMNode
     */
    public function getRootNode (){
        return $this->resource;
    }
    /**
     *
     * @return string
     */
    public function  __toString() {
        //It seems necessary to construct a new DOMDocument. The output of subresources
        //comes without the XML-header!
        $dom;
        if ($this->dom->documentElement->isSameNode($this->resource)){
             $dom=$this->dom;
        }else{
            $dom=new DOMDocument($this->dom->xmlVersion, $this->dom->encoding);
            $dom->appendChild($dom->importNode($this->resource,true));
        }
        return $dom->saveXML();
    }
    /**
     * registers a prefix for use with xpath
     *
     * @param string $prefix
     */
    protected function registerNS($prefix,$uri=null){
        if ($uri==null){
            $uri=$this->dom->lookupNamespaceUri($prefix);
        }
        $this->xpath->registerNamespace($prefix, $uri);
    }
    /**
     *
     * @param string $expression
     * @param DOMNode $contextnode 
     * @return DOMNodeList
     */
    protected function xpath($expression,$contextnode=null){
        
        if ($contextnode==null){            
            $queryexpression=".".$expression;
            $contextnode=$this->resource;    
        }
        else{
            $queryexpression=$expression;
        }
//        echo "\n".$queryexpression;

        $nodes=$this->xpath->query($queryexpression,$contextnode);
        
        if ($nodes===false)
            throw new InvalidArgumentException("Expression is malformed or the contextnode is invalid");
        
//        echo "-->>nodes".$nodes->length."\n";
        return $nodes;
        
    }

    /**
     *
     * Imports XML, defined in $resource, below position $xpathparent and overwrites
     * the element $xpathreplaces.
     *
     * @param string $xpathparent XPath of the parent
     * @param string $xpathreplaces XPath of the node that will be replaced
     * @param false  $xpathreplaces just adds the resource below xpathparent
     * @param XMLNode $resource resource to import
     * @param null    $resource delete resource at position $xpathreplaces
     */
    protected function importResource($xpathparent,$resource,$xpathreplaces=false){
        if (is_a($resource, "XMLNode"))
            $newcontent=$resource;
        else if ($resource==null && is_string($xpathreplaces))
            $newcontent=null;
        else
            $newcontent=new XMLNode($resource,false);
        
        $parentnodes=$this->xpath($xpathparent,$this->resource);
        if ($parentnodes->length!=1)
            throw new Exception("Ambiguous position for new resource! Found ".$parentnodes->length." possible parent nodes.");
        $parent=$parentnodes->item(0);

        $oldnode=false;
        if ($xpathreplaces!=false){
            $childnodes=$this->xpath($xpathreplaces,$this->resource);
            if ($childnodes->length>1)
                throw new Exception("Ambiguous replace position for new resource! Found ".$childnodes->length." possible nodes.");
            else if ($childnodes->length==1)
                $oldnode=$childnodes->item(0);
        }

        //newcontent is null -> remove the subtree
        if ($newcontent==null){
            if ($oldnode)
                $parent->removeChild($oldnode);
            return;
        }

        //Do nothing, if a node should be replaced by itself. Due to referencing this can happen.
        if ($oldnode!==false && $oldnode->isSameNode($newcontent->getRootNode()))
            return;

        $newnode=$this->dom->importNode($newcontent->getRootNode(),true);

        if ($oldnode){
            $parent->replaceChild($newnode,$oldnode);
        }else{
            $parent->appendChild($newnode);
        }

    }
}

?>
