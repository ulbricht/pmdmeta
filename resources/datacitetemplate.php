<?php

    header("Content-type: text/xml");     
    echo '<resource xmlns="http://datacite.org/schema/kernel-3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://datacite.org/schema/kernel-3 http://schema.datacite.org/meta/kernel-3/metadata.xsd">';
    echo '<titles><title></title></titles>';
    echo '<identifier identifierType="DOI">10.5880/GFZ.</identifier>';
    echo '<publisher>GFZ German Research Center for Geosciences</publisher>';
    echo '<publicationYear>'.date('Y',time()).'</publicationYear>';
    echo '<language>eng</language>';
    echo '<resourceType resourceTypeGeneral="Dataset">Dataset</resourceType>';
    echo '<rightsList><rights rightsURI="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</rights></rightsList>';
    echo '<descriptions><description descriptionType="Abstract"></description></descriptions>';
    echo '</resource>';

?>