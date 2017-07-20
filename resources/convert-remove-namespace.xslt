<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:gmd="http://www.isotc211.org/2005/gmd"
xmlns:gco="http://www.isotc211.org/2005/gco"
xmlns:gml="http://www.opengis.net/gml"
xmlns:dif="http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif/"
xmlns:difalt="http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif"
>

    <xsl:output  method="xml" encoding="utf-8" omit-xml-declaration="no"/>
<xsl:strip-space elements="*"/>
<!-- template to copy elements -->
    <xsl:template match="*">
        <xsl:element name="{local-name()}" namespace="{namespace-uri()}">
            <xsl:apply-templates select="@* | node()"/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="gmd:*">
        <xsl:element name="gmd:{local-name()}" >
            <xsl:apply-templates select="@* | node()"/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="gco:*">
        <xsl:element name="gco:{local-name()}">
            <xsl:apply-templates select="@* | node()"/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="gml:*">
        <xsl:element name="gml:{local-name()}">
            <xsl:apply-templates select="@* | node()"/>
        </xsl:element>
    </xsl:template>   
    <xsl:template match="dif:*">
        <xsl:element name="dif:{local-name()}">
            <xsl:apply-templates select="@* | node()"/>
        </xsl:element>
    </xsl:template>   
    <xsl:template match="difalt:*">
        <xsl:element name="dif:{local-name()}">
            <xsl:apply-templates select="@* | node()"/>
        </xsl:element>
    </xsl:template>       
            
     
       
<!-- template to copy attributes -->
    <xsl:template match="@*">
<!--        <xsl:attribute name="{local-name()}" namespace="{namespace-uri()}">-->
        <xsl:attribute name="{local-name()}">
            <xsl:value-of select="."/>
        </xsl:attribute>
    </xsl:template>

    <!-- template to copy the rest of the nodes -->
    <xsl:template match="comment() | text() | processing-instruction()">
        <xsl:copy/>
    </xsl:template>

</xsl:stylesheet>
