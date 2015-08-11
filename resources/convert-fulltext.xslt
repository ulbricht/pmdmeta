<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output  method="text" encoding="utf-8" omit-xml-declaration="yes"/>

<!-- template to copy elements -->
    <xsl:template match="*">
	<xsl:apply-templates select="@* | node()"/>
    </xsl:template>
           

    <!-- template to copy the rest of the nodes -->
    <xsl:template match="@* | comment() | processing-instruction()">
   </xsl:template>
    
    <xsl:template match="text()">
        <xsl:choose>
            <xsl:when test="normalize-space()!=''"><xsl:text> </xsl:text><xsl:value-of select="."/><xsl:text> </xsl:text></xsl:when>
            <xsl:otherwise></xsl:otherwise>
        </xsl:choose>
    </xsl:template>    

</xsl:stylesheet>