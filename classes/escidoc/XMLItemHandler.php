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


use escidoc\client\ItemHandler;
use escidoc\mapping\DOMMapper;

/**
 * retrieve XML instead of objects
 *
 * @author Damian Ulbricht (damian.ulbricht@gfz-potsdam.de)
 *
 */
class XMLItemHandler extends ItemHandler {


	/**
	 * @param string $itemId
	 * @return string
	 * @see escidoc\client\interfaces\handler.IItemHandler::retrieve()
	 *
	 * @throws EscidocException
	 * @throws ClientException
	 */
	public function retrieve($itemId) {
		$xml = $this->getRestClient()->retrieve($itemId);
		DOMMapper::unmarshal($xml, $this->isValidatingIn());
		return $xml;		
	}

	/**
	 * @param string $itemId
	 * @return string
	 * @see escidoc\client\interfaces\handler.IItemHandler::retrieveVersionHistory()
	 *
	 * @throws EscidocException
	 * @throws ClientException
	 */
	public function retrieveVersionHistory($itemId) {
		$xml = $this->getRestClient()->retrieveVersionHistory($itemId);
		DOMMapper::unmarshal($xml, $this->isValidatingIn());
		return $xml;
	}

}
?>
