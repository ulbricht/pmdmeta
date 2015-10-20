<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output  method="html" encoding="utf-8"/>

<!-- template to copy elements -->

    <xsl:template match="/">
	<div class="validation">
	<xsl:apply-templates/>
	</div>
    </xsl:template>


    <xsl:template match="*[local-name()='resource']">


	<xsl:call-template name="check">
		<xsl:with-param name="entity" select="./*[local-name()='identifier' and starts-with(.,'10.')]"/>
		<xsl:with-param name="errmsg">DOI is missing or in wrong format (must start with "10.") </xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>
	</xsl:call-template>

	<xsl:call-template name="check">
		<xsl:with-param name="entity" select="./*[local-name()='publisher']"/>
		<xsl:with-param name="errmsg">Publisher is missing!</xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>
	</xsl:call-template>

	<xsl:call-template name="check">
		<xsl:with-param name="entity" select="./*[local-name()='publicationYear']"/>
		<xsl:with-param name="errmsg">Year of publication missing!</xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>
	</xsl:call-template>

	<xsl:call-template name="check">
		<xsl:with-param name="entity" select="./*[local-name()='resourceType']/@*[local-name()='resourceTypeGeneral']"/>
		<xsl:with-param name="errmsg">Resource Type is missing!</xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>
	</xsl:call-template>

	<xsl:call-template name="check">
		<xsl:with-param name="entity" select="./*[local-name()='titles']/*[local-name()='title']"/>
		<xsl:with-param name="errmsg">Title is missing!</xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>		
	</xsl:call-template >

	<xsl:call-template name="check">
		<xsl:with-param name="entity"  select="./*[local-name()='rightsList']/*[local-name()='rights']"/>
		<xsl:with-param name="errmsg">License is missing!</xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>
	</xsl:call-template>

	<xsl:call-template name="check">
		<xsl:with-param name="entity" select="./*[local-name()='creators']/*[local-name()='creator']/*[local-name()='creatorName']"/>
		<xsl:with-param name="errmsg">Author is missing!</xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>
	</xsl:call-template>

	<xsl:for-each select="./*[local-name()='creators']/*[local-name()='creator']">
		<xsl:call-template name="check">
			<xsl:with-param name="entity" select="./*[local-name()='creatorName' and contains( . , ', ')]"/>
			<xsl:with-param name="errmsg">Author/Contributor "<xsl:value-of select="./*[local-name()='creatorName']"/>": The format for persons is  "familyname, givenname" separated by <b>comma and space</b>. For an institution this format could be correct.</xsl:with-param>
			<xsl:with-param name="class">warning</xsl:with-param>
	</xsl:call-template>
	</xsl:for-each>

	<xsl:for-each select="./*[local-name()='contributors']/*[local-name()='contributor']">
		<xsl:call-template name="check">
			<xsl:with-param name="entity" select="./*[local-name()='contributorName' and contains(.,', ')]"/>
			<xsl:with-param name="errmsg">Author/Contributor "<xsl:value-of select="./*[local-name()='contributorName']"/>": The format for persons is  "familyname, givenname" separated by <b>comma and space</b>. For an institution this format could be correct.</xsl:with-param>
			<xsl:with-param name="class">warning</xsl:with-param>
	</xsl:call-template>
	</xsl:for-each>

	<xsl:for-each select="./*[local-name()='contributors']/*[local-name()='contributor']">
		<xsl:call-template name="check">
			<xsl:with-param name="entity" select="./@*[local-name()='contributorType']"/>
			<xsl:with-param name="errmsg">Contributor "<xsl:value-of select="./*[local-name()='contributorName']"/>" requires a role.</xsl:with-param>
			<xsl:with-param name="class">error</xsl:with-param>
	</xsl:call-template>
	</xsl:for-each>

	<xsl:call-template name="check">
		<xsl:with-param name="entity" select="./*[local-name()='descriptions']/*[local-name()='description']"/>
		<xsl:with-param name="errmsg">Abstract is missing!</xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>
	</xsl:call-template>

	<xsl:call-template name="check">
		<xsl:with-param name="entity" select="./*[local-name()='subjects']/*[local-name()='subject']"/>
		<xsl:with-param name="errmsg">Please provide Keywords!</xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>
	</xsl:call-template>


    </xsl:template>

    <xsl:template match="*[local-name()='DIF']">
    </xsl:template>

    <xsl:template match="*[local-name()='MD_Metadata']">

	<xsl:call-template name="check">
		<xsl:with-param name="entity" select=".//*[local-name()='MD_Keywords']/*[local-name()='keyword']/*[local-name()='CharacterString' and normalize-space(../../*[local-name()='thesaurusName']//*[local-name()='title'])='GEMET - INSPIRE themes, version 1.0']"/>
		<xsl:with-param name="errmsg">Please provide at least one keyword from GEMET thesaurus</xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>		
	</xsl:call-template>

	<xsl:call-template name="check">
		<xsl:with-param name="entity" select=".//*[local-name()='MD_Keywords']/*[local-name()='keyword']/*[local-name()='CharacterString' and normalize-space(../../*[local-name()='thesaurusName']//*[local-name()='title'])='NASA/GCMD Earth Science Keywords']"/>
		<xsl:with-param name="errmsg">Please provide at least one keyword from NASA Science Keywords</xsl:with-param>
		<xsl:with-param name="class">error</xsl:with-param>
	</xsl:call-template>

    </xsl:template>


<xsl:template name="check">
	<xsl:param name="entity"/>
	<xsl:param name="errmsg"/>
	<xsl:param name="class"/>
	<xsl:if test="normalize-space($entity)=''">
		<xsl:element name="div">
			<xsl:attribute name="class"><xsl:value-of select="$class"/></xsl:attribute>
			 <xsl:value-of select="$errmsg"/>
		 </xsl:element>
	</xsl:if>
</xsl:template>

</xsl:stylesheet>
