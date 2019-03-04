CREATE TABLE `4dmb_dataset` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL COMMENT 'item id',
  `item` MEDIUMBLOB,
  `lastmodified` datetime NOT NULL COMMENT 'item timestamp',
  `doi` varchar(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin
;

CREATE TABLE `4dmb_fullidx` (
  `datasetid` varchar(50) COLLATE utf8_bin NOT NULL,
  `fullidx` longtext COLLATE utf8_general_ci,
  PRIMARY KEY `fulltextper_datasetid` (`datasetid`),
  INDEX `datasetid` (`datasetid`) ,
  FULLTEXT KEY `fullidx` (`fullidx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin   
;

CREATE TABLE `4dmb_mdrecords` (
  `datasetid` varchar(50) COLLATE utf8_bin NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `content` MEDIUMBLOB,
  UNIQUE KEY `mdrecord_per_ds` (`datasetid`,`name`),
  INDEX `datasetid` (`datasetid`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin
;

CREATE TABLE `4dmb_oaipmh` (
  `datasetid` varchar(50) COLLATE utf8_bin NOT NULL,
  `oaiset` varchar(10) COLLATE utf8_bin NOT NULL,
  INDEX `datasetid` (`datasetid`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin
;

CREATE TABLE `4dmb_facets` (
  `datasetid` varchar(50) COLLATE utf8_bin NOT NULL,
  `label` varchar(50) COLLATE utf8_general_ci NOT NULL,
  `value` longtext COLLATE utf8_general_ci,
  INDEX `datasetid` (`datasetid`),
   INDEX `facet_label` (`label`),
   INDEX `facet_value` (value(512))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin
;

CREATE TABLE `4dmb_location` (
  `datasetid` varchar(50) COLLATE utf8_bin NOT NULL,
  `minlat` float NOT NULL,
  `maxlat` float NOT NULL,
  `minlon` float NOT NULL,
  `maxlon` float NOT NULL,
  INDEX `datasetid` (`datasetid`) ,
   INDEX `loc_minlat` (`minlat`),
   INDEX `loc_maxlat` (`maxlat`),
   INDEX `loc_minlon` (`minlon`),
   INDEX `loc_maxlon` (`maxlon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin
;


