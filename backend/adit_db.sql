-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: adit_db
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adit_adituser`
--

DROP TABLE IF EXISTS `adit_adituser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_adituser` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(10) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `first_name` varchar(10) NOT NULL,
  `last_name` varchar(10) NOT NULL,
  `point` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adituser`
--

LOCK TABLES `adit_adituser` WRITE;
/*!40000 ALTER TABLE `adit_adituser` DISABLE KEYS */;
INSERT INTO `adit_adituser` VALUES ('pbkdf2_sha256$150000$rMEYB2515WLb$Cw9RXxTDoybA9jag8W+Cbop97u3/p4+AkbjEfFy0F7s=','2019-11-06 01:40:01.543000',0,1,'user@snu.ac.kr','user','','First','Last',0,1,0),('pbkdf2_sha256$150000$oI6jsQn6z9LB$9m2/W/sbHgOY/qI3ypQZ/AJFwkuourpididWphTg1gY=','2019-11-06 03:09:28.472000',0,2,'csh3695@snu.ac.kr','Kent','','Choi','Seonghwan',0,1,0),('pbkdf2_sha256$150000$woVLk6NrGg1K$+bxR9wmpvzLY/ueM/ko3KtUSzhffUCWmdCISsdcebMo=','2019-11-06 01:46:50.432000',0,3,'graysea@daum.net','Kaiser','','Seo','Yeongho',0,1,0),('pbkdf2_sha256$150000$aWVCpeQ3FAVD$SqlzJt2WYvAPb4GjG/1UTEq4a6DbLNvRcpUy7eI1lAw=','2019-11-06 02:29:19.081000',0,4,'sanggggg@wafflestudio.com','sanggggg','','Kim','Sangmin',119,1,0),('pbkdf2_sha256$150000$vAPI20Zlja75$MDSqjQ7fXp9isEi1QLkMgvc6ThccEq3U9xAsCX2A+dk=','2019-11-06 03:16:09.601000',0,5,'sonmath43@gmail.com','dhdroid','','Donghyun','Son',105,1,0),('pbkdf2_sha256$120000$XcAW0Bw73nVX$99AfxyG3+T39Y4vkG7Tu12tJDZUwXHyIIw99lqmgsJo=','2019-11-23 19:54:30.162723',0,6,'csh3695@naver.com','Kentaro','','Seonghwan','Choi',1822,1,0),('pbkdf2_sha256$120000$ITmnVmA5KN1q$WTKBPak3Xyr60hwP3g5DC5Sq4zT9Zcqw5J4JF/CNRQQ=','2019-11-22 21:41:51.743187',0,7,'test@test.com','Kentarou','','Seonghwan','Choi',0,1,0);
/*!40000 ALTER TABLE `adit_adituser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_adituser_groups`
--

DROP TABLE IF EXISTS `adit_adituser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_adituser_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adituser_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adit_adituser_groups_adituser_id_group_id_1e03270f_uniq` (`adituser_id`,`group_id`),
  KEY `adit_adituser_groups_group_id_c099ef8b_fk_auth_group_id` (`group_id`),
  CONSTRAINT `adit_adituser_groups_adituser_id_8b2ab399_fk_adit_adituser_id` FOREIGN KEY (`adituser_id`) REFERENCES `adit_adituser` (`id`),
  CONSTRAINT `adit_adituser_groups_group_id_c099ef8b_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adituser_groups`
--

LOCK TABLES `adit_adituser_groups` WRITE;
/*!40000 ALTER TABLE `adit_adituser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `adit_adituser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_adituser_tags`
--

DROP TABLE IF EXISTS `adit_adituser_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_adituser_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adituser_id` int(11) NOT NULL,
  `interestedtags_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adit_adituser_tags_adituser_id_interestedtags_id_9a45937c_uniq` (`adituser_id`,`interestedtags_id`),
  KEY `adit_adituser_tags_interestedtags_id_6e583d2d_fk_adit_inte` (`interestedtags_id`),
  CONSTRAINT `adit_adituser_tags_adituser_id_f9730879_fk_adit_adituser_id` FOREIGN KEY (`adituser_id`) REFERENCES `adit_adituser` (`id`),
  CONSTRAINT `adit_adituser_tags_interestedtags_id_6e583d2d_fk_adit_inte` FOREIGN KEY (`interestedtags_id`) REFERENCES `adit_interestedtags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adituser_tags`
--

LOCK TABLES `adit_adituser_tags` WRITE;
/*!40000 ALTER TABLE `adit_adituser_tags` DISABLE KEYS */;
INSERT INTO `adit_adituser_tags` VALUES (2,1,1),(3,1,2),(5,2,1),(6,2,2),(4,2,32),(7,2,39),(8,2,40),(9,2,41),(10,2,42),(11,2,43),(12,3,1),(13,3,2),(14,3,8),(15,3,9),(16,3,10),(17,3,11),(18,3,12),(19,4,1),(20,4,2),(21,4,16),(22,4,17),(23,4,18),(25,5,1),(26,5,2),(27,5,16),(28,5,30),(29,5,31),(24,5,32),(42,6,22),(40,6,51),(38,6,52),(39,6,53),(41,6,55),(36,7,22),(37,7,23),(34,7,32),(35,7,51);
/*!40000 ALTER TABLE `adit_adituser_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_adituser_user_permissions`
--

DROP TABLE IF EXISTS `adit_adituser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_adituser_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adituser_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adit_adituser_user_permi_adituser_id_permission_i_e186cc39_uniq` (`adituser_id`,`permission_id`),
  KEY `adit_adituser_user_p_permission_id_006311fc_fk_auth_perm` (`permission_id`),
  CONSTRAINT `adit_adituser_user_p_adituser_id_2fce34b1_fk_adit_adit` FOREIGN KEY (`adituser_id`) REFERENCES `adit_adituser` (`id`),
  CONSTRAINT `adit_adituser_user_p_permission_id_006311fc_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adituser_user_permissions`
--

LOCK TABLES `adit_adituser_user_permissions` WRITE;
/*!40000 ALTER TABLE `adit_adituser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `adit_adituser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_adpost`
--

DROP TABLE IF EXISTS `adit_adpost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_adpost` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `subtitle` varchar(64) NOT NULL,
  `content` longtext NOT NULL,
  `ad_link` longtext NOT NULL,
  `closed` tinyint(1) NOT NULL,
  `target_views` int(11) NOT NULL,
  `total_views` int(11) NOT NULL,
  `upload_date` datetime(6) NOT NULL,
  `expiry_date` date NOT NULL,
  `owner_id` int(11) NOT NULL,
  `thumbnail_id` int(11) NOT NULL,
  `open_for_all` tinyint(1) NOT NULL,
  `view_by_date` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adit_adpost_owner_id_aeefbf06_fk_adit_adituser_id` (`owner_id`),
  KEY `adit_adpost_thumbnail_id_a0142f77_fk_adit_postimage_id` (`thumbnail_id`),
  CONSTRAINT `adit_adpost_owner_id_aeefbf06_fk_adit_adituser_id` FOREIGN KEY (`owner_id`) REFERENCES `adit_adituser` (`id`),
  CONSTRAINT `adit_adpost_thumbnail_id_a0142f77_fk_adit_postimage_id` FOREIGN KEY (`thumbnail_id`) REFERENCES `adit_postimage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adpost`
--

LOCK TABLES `adit_adpost` WRITE;
/*!40000 ALTER TABLE `adit_adpost` DISABLE KEYS */;
INSERT INTO `adit_adpost` VALUES (1,'React Study','Let study React!','리액트 3개월 단기 속성 강좌!\n\n3개월 만에 나만의 웹사이트를 만들어보아요!\n\n정원 20명\n\n수강료 310만원','https://ko.reactjs.org/',0,5000,0,'2019-11-06 01:49:46.818000','2019-11-29',3,1,1,''),(2,'서영메의 기타 콘서트','한국 기타의 전설, 서영배 단독 콘서트','\"대한민국이 낳은 최고의 기타리스트\"\n\n\"역시 서영메 선배님, 무대를 뒤집어 놓으셨다!\"\n\n19년 연륜에서 흘러나오는 감동적인 연주\n올 해 12월 5일 서울대학교 가온홀에서 만나보세요\n\n일시 2019년 12월 5일\n장소 서울대학교 가온홀\n\n연락처 010-1234-5678','https://ko.wikipedia.org/wiki/%EC%A7%80%EB%AF%B8_%ED%97%A8%EB%93%9C%EB%A6%AD%EC%8A%A4',0,2000,8,'2019-11-06 02:00:03.474000','2019-12-05',3,2,1,''),(3,'보성말차, 함께 마셔요','함께해요 보성말차 페스티벌','대한민국 국민음료 보성말차와 함께하는 페스티벌!\n\n말차 컨테스트, 미스 말차 선발대회, 말차 많이 마시기 대회 등 다양한 행사를 함께하세요!\n\n일시 2019.11.30\n장소 보성 어딘가\n입장료 4400원','http://www.dongwonmall.com/product/detail.do?productId=000833516',0,3000,5,'2019-11-06 02:08:32.315000','2019-11-30',4,3,1,''),(4,'와플스튜디오리크루팅','와플스튜디오 18기를 모집합니다','서울대학교 웹/앱 개발 동아리 와플 스튜디오에서 신입 개발자를 모집합니다\n\n지원 기간 : ~2019.11.20\n\n자기소개서 : 페이지 참조','https://www.facebook.com/wafflestudio',0,100,49,'2019-11-06 02:14:23.687000','2019-11-20',4,4,1,''),(5,'Android Study','관악구 안드 1타 손동현의 맞춤 강의','2019년 하반기, 그가 돌아왔다!\n\n안드로이드 강좌의 대가 손동현이 준비한 3개월 단기 맞춤형 안드로이드 강좌를 단돈 400원에 들어보세요!\n\n강의료 400원','https://www.android.com/intl/ko_kr/',0,100,0,'2019-11-06 02:22:07.736000','2019-11-28',5,5,1,''),(6,'학사vs석사vs교수 농구대회','쌓여있던 울분, 코트위에서 풀어보세요!','서울대학교 컴퓨터 공학부가 주최하는\n학사vs석사vs교수 농구대회!\n\n강의에서, 랩실에서 쌓여있던 분노들, 코트위에서 방출해 보세요\n\n참가신청 ~2019.12.30\n대회장소 예선 소프트웨어실습실, 본선 하드웨어 실습실\n','https://watch.nba.com/',0,49,1,'2019-11-06 02:26:39.462000','2019-12-30',5,6,1,''),(7,'최성환의 깨춤교실','꺠춤 인간문화재 최성환의 깨춤교실','삶이 무료하신가요? 취미가 필요하신가요? 탄탄한 허리근육을 만들고 싶으신가요?\n\n그런 당신을 위해 준비했습니다!\n\n2019 all new 최성환의 꺠춤교실!!\n\n','https://ko.dict.naver.com/small_detail.nhn?docid=6194600',0,392,15,'2019-11-06 03:15:00.122000','2019-11-29',2,7,1,''),(8,'[태그] 어쩌구','어쩌구 저쩌구','배가 고프네!','http://www.naver.com',0,120,84,'2019-11-22 22:46:08.344833','2019-12-20',6,8,1,''),(9,'t','s','d','http://www.naver.com',0,0,0,'2019-11-22 23:28:45.160146','2019-12-26',6,9,0,''),(10,'test_title','test_subtitle','describe','http://www.naver.com',0,0,0,'2019-11-22 23:35:12.446224','2019-12-12',6,10,0,''),(11,'ttl','sub','add','http://www.naver.com/',0,0,0,'2019-11-22 23:50:30.448105','2019-12-05',6,11,0,''),(12,'a','a','a','https://www.naver.com/',0,0,0,'2019-11-22 23:52:58.316821','2019-12-28',6,12,0,''),(13,'a','a','a','https://www.naver.com/',0,0,0,'2019-11-22 23:57:40.810464','2019-12-28',6,13,0,''),(14,'a','a','a','https://www.naver.com/',0,0,0,'2019-11-23 00:00:09.463415','2019-12-12',6,14,0,''),(15,'dks','dks','dks','http://www.naver.com',0,0,0,'2019-11-23 00:01:19.568805','2019-12-13',6,15,0,''),(16,'hello','helll','helll','https://www.naver.com/',0,0,0,'2019-11-23 00:02:35.792960','2019-12-21',6,16,0,''),(17,'ajkd','zdjkl','dsaf','http://www.naver.com/',0,0,0,'2019-11-23 00:03:43.381608','2019-12-21',6,17,0,'');
/*!40000 ALTER TABLE `adit_adpost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_adpost_image`
--

DROP TABLE IF EXISTS `adit_adpost_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_adpost_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adpost_id` int(11) NOT NULL,
  `postimage_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adit_adpost_image_adpost_id_postimage_id_8185779e_uniq` (`adpost_id`,`postimage_id`),
  KEY `adit_adpost_image_postimage_id_13fd1dbe_fk_adit_postimage_id` (`postimage_id`),
  CONSTRAINT `adit_adpost_image_adpost_id_917e81a1_fk_adit_adpost_id` FOREIGN KEY (`adpost_id`) REFERENCES `adit_adpost` (`id`),
  CONSTRAINT `adit_adpost_image_postimage_id_13fd1dbe_fk_adit_postimage_id` FOREIGN KEY (`postimage_id`) REFERENCES `adit_postimage` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adpost_image`
--

LOCK TABLES `adit_adpost_image` WRITE;
/*!40000 ALTER TABLE `adit_adpost_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `adit_adpost_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_adpost_tags`
--

DROP TABLE IF EXISTS `adit_adpost_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_adpost_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adpost_id` int(11) NOT NULL,
  `interestedtags_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adit_adpost_tags_adpost_id_interestedtags_id_7c2df8cd_uniq` (`adpost_id`,`interestedtags_id`),
  KEY `adit_adpost_tags_interestedtags_id_edee47ed_fk_adit_inte` (`interestedtags_id`),
  CONSTRAINT `adit_adpost_tags_adpost_id_3375e3c5_fk_adit_adpost_id` FOREIGN KEY (`adpost_id`) REFERENCES `adit_adpost` (`id`),
  CONSTRAINT `adit_adpost_tags_interestedtags_id_edee47ed_fk_adit_inte` FOREIGN KEY (`interestedtags_id`) REFERENCES `adit_interestedtags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adpost_tags`
--

LOCK TABLES `adit_adpost_tags` WRITE;
/*!40000 ALTER TABLE `adit_adpost_tags` DISABLE KEYS */;
INSERT INTO `adit_adpost_tags` VALUES (1,1,2),(2,1,11),(3,1,12),(4,1,13),(5,2,1),(7,2,9),(8,2,14),(6,2,15),(9,3,18),(10,3,19),(11,3,20),(12,3,21),(13,3,22),(14,3,23),(15,4,1),(16,4,2),(17,4,16),(18,4,24),(19,4,25),(20,4,26),(21,4,27),(22,4,28),(23,4,29),(29,5,16),(24,5,33),(25,5,34),(26,5,35),(27,5,36),(28,5,37),(31,6,1),(32,6,2),(33,6,30),(30,6,38),(34,7,32),(35,7,44),(36,7,45),(37,7,46),(41,8,27),(38,8,52),(39,8,53),(40,8,54),(42,9,56),(43,9,57),(44,9,58),(45,9,59),(46,9,60),(47,9,61),(48,10,62),(49,10,63),(50,10,64),(51,10,65),(55,11,1),(56,11,52),(54,11,58),(52,11,66),(53,11,67),(57,11,68),(58,13,69),(59,13,70),(60,13,71),(61,13,72),(62,13,73),(63,14,69),(64,14,70),(65,14,71),(66,14,72),(67,14,73),(68,15,47),(70,15,50),(69,15,74),(71,15,75),(72,15,76),(73,16,77),(74,16,78),(75,16,79),(76,16,80),(77,16,81),(78,16,82),(79,16,83),(80,16,84),(81,16,85),(82,16,86),(83,16,87),(84,16,88),(85,16,89),(86,16,90),(87,16,91),(88,16,92),(89,16,93),(90,16,94),(91,16,95),(92,16,96),(93,16,97),(94,16,98),(95,16,99),(96,16,100),(97,16,101),(98,16,102),(99,16,103),(100,16,104),(101,16,105),(102,16,106),(103,16,107),(104,16,108),(105,16,109),(106,16,110),(107,16,111),(108,16,112),(109,16,113),(110,16,114),(111,16,115),(112,16,116),(120,17,77),(115,17,79),(116,17,80),(119,17,83),(113,17,88),(121,17,90),(114,17,91),(117,17,117),(118,17,118),(122,17,119),(123,17,120),(124,17,121);
/*!40000 ALTER TABLE `adit_adpost_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_adreception`
--

DROP TABLE IF EXISTS `adit_adreception`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_adreception` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `views` int(11) NOT NULL,
  `unique_link` longtext NOT NULL,
  `closed` tinyint(1) NOT NULL,
  `recept_time` datetime(6) NOT NULL,
  `adpost_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adit_adreception_adpost_id_93b35a94_fk_adit_adpost_id` (`adpost_id`),
  KEY `adit_adreception_owner_id_ba20ede4_fk_adit_adituser_id` (`owner_id`),
  CONSTRAINT `adit_adreception_adpost_id_93b35a94_fk_adit_adpost_id` FOREIGN KEY (`adpost_id`) REFERENCES `adit_adpost` (`id`),
  CONSTRAINT `adit_adreception_owner_id_ba20ede4_fk_adit_adituser_id` FOREIGN KEY (`owner_id`) REFERENCES `adit_adituser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adreception`
--

LOCK TABLES `adit_adreception` WRITE;
/*!40000 ALTER TABLE `adit_adreception` DISABLE KEYS */;
INSERT INTO `adit_adreception` VALUES (1,17,'http://localhost:3000/redirectfrom=Ko93RDMycqhA',0,'2019-11-06 02:14:59.284000',2,4),(2,0,'http://localhost:3000/redirectfrom=LpW3Rqp9SNsj',0,'2019-11-06 02:27:13.179000',4,5),(3,1,'http://localhost:3000/redirectfrom=z8YMo33kSRho',0,'2019-11-06 02:30:07.926000',2,5),(4,1,'http://localhost:3000/redirectfrom=2pDKE0n1SVi9',0,'2019-11-06 02:34:27.672000',3,5),(5,13,'http://localhost:3000/redirectfrom=Ov63RNZLHZCP',0,'2019-11-06 03:16:13.852000',7,5),(6,44,'http://localhost:3000/redirectfrom=kxXyZXP0FYs8',0,'2019-11-23 19:48:36.759415',4,6),(7,2,'http://localhost:3000/redirectfrom=9zYlQwYmtNC1',0,'2019-11-23 22:16:29.263361',7,6),(8,1,'http://localhost:3000/redirectfrom=LpWL8klpTQug',0,'2019-11-23 22:18:54.109773',6,6);
/*!40000 ALTER TABLE `adit_adreception` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_interestedtags`
--

DROP TABLE IF EXISTS `adit_interestedtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_interestedtags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(20) NOT NULL,
  `usercount` int(11) NOT NULL,
  `postcount` int(11) NOT NULL,
  `created_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_interestedtags`
--

LOCK TABLES `adit_interestedtags` WRITE;
/*!40000 ALTER TABLE `adit_interestedtags` DISABLE KEYS */;
INSERT INTO `adit_interestedtags` VALUES (1,'서울대학교',5,5,'2019-11-24 23:13:07.169226'),(2,'컴퓨터공학부',5,3,'2019-11-24 23:13:07.169226'),(8,'기타',1,0,'2019-11-24 23:13:07.169226'),(9,'콘서트',1,1,'2019-11-24 23:13:07.169226'),(10,'이문세',1,0,'2019-11-24 23:13:07.169226'),(11,'프론트엔드',1,1,'2019-11-24 23:13:07.169226'),(12,'리액트',1,1,'2019-11-24 23:13:07.169226'),(13,'페이스북',1,0,'2019-11-24 23:13:07.169226'),(14,'깃',1,0,'2019-11-24 23:13:07.169226'),(15,'가온홀',1,0,'2019-11-24 23:13:07.169226'),(16,'안드',2,2,'2019-11-24 23:13:07.169226'),(17,'마술',1,0,'2019-11-24 23:13:07.169226'),(18,'일본말차',1,1,'2019-11-24 23:13:07.169226'),(19,'축제',1,0,'2019-11-24 23:13:07.169226'),(20,'음료',1,0,'2019-11-24 23:13:07.169226'),(21,'보성말차',1,0,'2019-11-24 23:13:07.169226'),(22,'말차',4,0,'2019-11-24 23:13:07.169226'),(23,'녹차',3,0,'2019-11-24 23:13:07.169226'),(24,'와플스튜디오',1,0,'2019-11-24 23:13:07.169226'),(25,'웹',1,0,'2019-11-24 23:13:07.169226'),(26,'앱',1,0,'2019-11-24 23:13:07.169226'),(27,'동아리',1,1,'2019-11-24 23:13:07.169226'),(28,'신규',1,0,'2019-11-24 23:13:07.169226'),(29,'신입모집',1,0,'2019-11-24 23:13:07.169226'),(30,'농구',1,1,'2019-11-24 23:13:07.169226'),(31,'게임',1,0,'2019-11-24 23:13:07.169226'),(32,'깨춤',4,1,'2019-11-24 23:13:07.169226'),(33,'좋잔아요',1,0,'2019-11-24 23:13:07.169226'),(34,'강좌',1,0,'2019-11-24 23:13:07.169226'),(35,'손동현',1,0,'2019-11-24 23:13:07.169226'),(36,'과제',1,0,'2019-11-24 23:13:07.169226'),(37,'손손이',1,0,'2019-11-24 23:13:07.169226'),(38,'대회',1,0,'2019-11-24 23:13:07.169226'),(39,'비요뜨',1,0,'2019-11-24 23:13:07.169226'),(40,'민주당',1,0,'2019-11-24 23:13:07.169226'),(41,'사진',1,0,'2019-11-24 23:13:07.169226'),(42,'ML',1,0,'2019-11-24 23:13:07.169226'),(43,'백엔드',1,0,'2019-11-24 23:13:07.169226'),(44,'춤',1,0,'2019-11-24 23:13:07.169226'),(45,'운동',1,0,'2019-11-24 23:13:07.169226'),(46,'요가',1,0,'2019-11-24 23:13:07.169226'),(47,'안녕',1,1,'2019-11-24 23:13:07.169226'),(48,'저의',1,0,'2019-11-24 23:13:07.169226'),(49,'이름',1,0,'2019-11-24 23:13:07.169226'),(50,'이다',1,1,'2019-11-24 23:13:07.169226'),(51,'안드로이드',3,0,'2019-11-24 23:13:07.169226'),(52,'서울대',2,1,'2019-11-24 23:13:07.169226'),(53,'밴드',2,0,'2019-11-24 23:13:07.169226'),(54,'공연',1,0,'2019-11-24 23:13:07.169226'),(55,'연주회',1,0,'2019-11-24 23:13:07.169226'),(56,'바보',1,0,'2019-11-24 23:13:07.169226'),(57,'섹스',1,0,'2019-11-24 23:13:07.169226'),(58,'배고파',1,1,'2019-11-24 23:13:07.169226'),(59,'노트북',1,0,'2019-11-24 23:13:07.169226'),(60,'랩탑',1,0,'2019-11-24 23:13:07.169226'),(61,'갈아만든배',1,0,'2019-11-24 23:13:07.169226'),(62,'아기상어',1,0,'2019-11-24 23:13:07.169226'),(63,'아빠상어',1,0,'2019-11-24 23:13:07.169226'),(64,'상어',1,0,'2019-11-24 23:13:07.169226'),(65,'작살',1,0,'2019-11-24 23:13:07.169226'),(66,'안녕',1,0,'2019-11-24 23:13:07.169226'),(67,'반갑습니다',1,0,'2019-11-24 23:13:07.169226'),(68,'yns',1,0,'2019-11-24 23:13:07.169226'),(69,'가',1,1,'2019-11-24 23:13:07.169226'),(70,'나',1,1,'2019-11-24 23:13:07.169226'),(71,'다',1,1,'2019-11-24 23:13:07.169226'),(72,'라',1,1,'2019-11-24 23:13:07.169226'),(73,'마',1,1,'2019-11-24 23:13:07.169226'),(74,'it',1,0,'2019-11-24 23:13:07.169226'),(75,'me',1,0,'2019-11-24 23:13:07.169226'),(76,'fuck',1,0,'2019-11-24 23:13:07.169226'),(77,'김치',1,2,'2019-11-24 23:13:07.169226'),(78,'정치',1,0,'2019-11-24 23:13:07.169226'),(79,'사회',1,1,'2019-11-24 23:13:07.169226'),(80,'인사',1,1,'2019-11-24 23:13:07.169226'),(81,'공연',1,0,'2019-11-24 23:13:07.169226'),(82,'6',1,0,'2019-11-24 23:13:07.169226'),(83,'7',1,1,'2019-11-24 23:13:07.169226'),(84,'8',1,0,'2019-11-24 23:13:07.169226'),(85,'결혼',1,0,'2019-11-24 23:13:07.169226'),(86,'10',1,0,'2019-11-24 23:13:07.169226'),(87,'행사',1,0,'2019-11-24 23:13:07.169226'),(88,'12',1,1,'2019-11-24 23:13:07.169226'),(89,'13',1,0,'2019-11-24 23:13:07.169226'),(90,'14',1,1,'2019-11-24 23:13:07.169226'),(91,'메모리',1,1,'2019-11-24 23:13:07.169226'),(92,'삼성',1,0,'2019-11-24 23:13:07.169226'),(93,'날씨',1,0,'2019-11-24 23:13:07.169226'),(94,'18',1,0,'2019-11-24 23:13:07.169226'),(95,'제약',1,0,'2019-11-24 23:13:07.169226'),(96,'20',1,0,'2019-11-24 23:13:07.169226'),(97,'음료',1,0,'2019-11-24 23:13:07.169226'),(98,'22',1,0,'2019-11-24 23:13:07.169226'),(99,'기계',1,0,'2019-11-24 23:13:07.169226'),(100,'24',1,0,'2019-11-24 23:13:07.169226'),(101,'계란',1,0,'2019-11-24 23:13:07.169226'),(102,'26',1,0,'2019-11-24 23:13:07.169226'),(103,'창업',1,0,'2019-11-24 23:13:07.169226'),(104,'28',1,0,'2019-11-24 23:13:07.169226'),(105,'29',1,0,'2019-11-24 23:13:07.169226'),(106,'30',1,0,'2019-11-24 23:13:07.169226'),(107,'전쟁',1,0,'2019-11-24 23:13:07.169226'),(108,'32',1,0,'2019-11-24 23:13:07.169226'),(109,'이혼',1,0,'2019-11-24 23:13:07.169226'),(110,'박람',1,0,'2019-11-24 23:13:07.169226'),(111,'35',1,0,'2019-11-24 23:13:07.169226'),(112,'박람회',1,0,'2019-11-24 23:13:07.169226'),(113,'커피',1,0,'2019-11-24 23:13:07.169226'),(114,'38',1,0,'2019-11-24 23:13:07.169226'),(115,'소주',1,0,'2019-11-24 23:13:07.169226'),(116,'40',1,0,'2019-11-24 23:13:07.169226'),(117,'54',1,0,'2019-11-24 23:13:07.169226'),(118,'6786',1,0,'2019-11-24 23:13:07.169226'),(119,'78',1,0,'2019-11-24 23:13:07.169226'),(120,'4564',1,0,'2019-11-24 23:13:07.169226'),(121,'657354',1,0,'2019-11-24 23:13:07.169226'),(122,'여행',0,0,'2019-11-25 01:25:08.201319'),(123,'컴퓨터',0,0,'2019-11-25 01:25:08.212072'),(124,'연극',0,0,'2019-11-25 01:25:08.219819'),(125,'휴대폰',0,0,'2019-11-25 01:25:08.226591'),(126,'노래',0,0,'2019-11-25 01:25:08.241184'),(127,'책',0,0,'2019-11-25 01:25:08.250538'),(128,'영화',0,0,'2019-11-25 01:25:08.258866'),(129,'구인',0,0,'2019-11-25 01:25:08.269104'),(130,'구직',0,0,'2019-11-25 01:25:08.277820'),(131,'과외',0,0,'2019-11-25 01:25:08.286333'),(132,'이벤트',0,0,'2019-11-25 01:25:08.295776');
/*!40000 ALTER TABLE `adit_interestedtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_ipaddressduplication`
--

DROP TABLE IF EXISTS `adit_ipaddressduplication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_ipaddressduplication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(16) NOT NULL,
  `created` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_ipaddressduplication`
--

LOCK TABLES `adit_ipaddressduplication` WRITE;
/*!40000 ALTER TABLE `adit_ipaddressduplication` DISABLE KEYS */;
/*!40000 ALTER TABLE `adit_ipaddressduplication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_postimage`
--

DROP TABLE IF EXISTS `adit_postimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_postimage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_postimage`
--

LOCK TABLES `adit_postimage` WRITE;
/*!40000 ALTER TABLE `adit_postimage` DISABLE KEYS */;
INSERT INTO `adit_postimage` VALUES (1,'image/adpost/postimage/temp_XZCsPHt.png'),(2,'image/adpost/postimage/temp_hh0whJI.jpeg'),(3,'image/adpost/postimage/temp_f1Uf4yv.jpeg'),(4,'image/adpost/postimage/temp_EndAf9a.png'),(5,'image/adpost/postimage/temp_L2EMGb3.png'),(6,'image/adpost/postimage/temp_VvidgCQ.png'),(7,'image/adpost/postimage/temp_RhiKB05.jpeg'),(8,'image/adpost/postimage/temp_faTuDxl.jpeg'),(9,'image/adpost/postimage/temp_bxYDsjc.jpeg'),(10,'image/adpost/postimage/temp_k32chdS.jpeg'),(11,'image/adpost/postimage/temp_rJnriAn.jpeg'),(12,'image/adpost/postimage/temp_Y9vfKyS.jpeg'),(13,'image/adpost/postimage/temp_AV0cKOw.jpeg'),(14,'image/adpost/postimage/temp_0Hyhu5e.jpeg'),(15,'image/adpost/postimage/temp_RjSe84H.jpeg'),(16,'image/adpost/postimage/temp_DmlqxBm.jpeg'),(17,'image/adpost/postimage/temp_112NGlI.jpeg');
/*!40000 ALTER TABLE `adit_postimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_question`
--

DROP TABLE IF EXISTS `adit_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `checked` tinyint(1) NOT NULL,
  `adpost_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adit_question_adpost_id_5007ad58_fk_adit_adpost_id` (`adpost_id`),
  KEY `adit_question_owner_id_345d69d1_fk_adit_adituser_id` (`owner_id`),
  CONSTRAINT `adit_question_adpost_id_5007ad58_fk_adit_adpost_id` FOREIGN KEY (`adpost_id`) REFERENCES `adit_adpost` (`id`),
  CONSTRAINT `adit_question_owner_id_345d69d1_fk_adit_adituser_id` FOREIGN KEY (`owner_id`) REFERENCES `adit_adituser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_question`
--

LOCK TABLES `adit_question` WRITE;
/*!40000 ALTER TABLE `adit_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `adit_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add adit user',1,'add_adituser'),(2,'Can change adit user',1,'change_adituser'),(3,'Can delete adit user',1,'delete_adituser'),(4,'Can view adit user',1,'view_adituser'),(5,'Can add ad post',2,'add_adpost'),(6,'Can change ad post',2,'change_adpost'),(7,'Can delete ad post',2,'delete_adpost'),(8,'Can view ad post',2,'view_adpost'),(9,'Can add ad reception',3,'add_adreception'),(10,'Can change ad reception',3,'change_adreception'),(11,'Can delete ad reception',3,'delete_adreception'),(12,'Can view ad reception',3,'view_adreception'),(13,'Can add interested tags',4,'add_interestedtags'),(14,'Can change interested tags',4,'change_interestedtags'),(15,'Can delete interested tags',4,'delete_interestedtags'),(16,'Can view interested tags',4,'view_interestedtags'),(17,'Can add post image',5,'add_postimage'),(18,'Can change post image',5,'change_postimage'),(19,'Can delete post image',5,'delete_postimage'),(20,'Can view post image',5,'view_postimage'),(21,'Can add question',6,'add_question'),(22,'Can change question',6,'change_question'),(23,'Can delete question',6,'delete_question'),(24,'Can view question',6,'view_question'),(25,'Can add log entry',7,'add_logentry'),(26,'Can change log entry',7,'change_logentry'),(27,'Can delete log entry',7,'delete_logentry'),(28,'Can view log entry',7,'view_logentry'),(29,'Can add permission',8,'add_permission'),(30,'Can change permission',8,'change_permission'),(31,'Can delete permission',8,'delete_permission'),(32,'Can view permission',8,'view_permission'),(33,'Can add group',9,'add_group'),(34,'Can change group',9,'change_group'),(35,'Can delete group',9,'delete_group'),(36,'Can view group',9,'view_group'),(37,'Can add content type',10,'add_contenttype'),(38,'Can change content type',10,'change_contenttype'),(39,'Can delete content type',10,'delete_contenttype'),(40,'Can view content type',10,'view_contenttype'),(41,'Can add session',11,'add_session'),(42,'Can change session',11,'change_session'),(43,'Can delete session',11,'delete_session'),(44,'Can view session',11,'view_session'),(45,'Can add ip address duplication',12,'add_ipaddressduplication'),(46,'Can change ip address duplication',12,'change_ipaddressduplication'),(47,'Can delete ip address duplication',12,'delete_ipaddressduplication'),(48,'Can view ip address duplication',12,'view_ipaddressduplication');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_adit_adituser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_adit_adituser_id` FOREIGN KEY (`user_id`) REFERENCES `adit_adituser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'adit','adituser'),(2,'adit','adpost'),(3,'adit','adreception'),(4,'adit','interestedtags'),(12,'adit','ipaddressduplication'),(5,'adit','postimage'),(6,'adit','question'),(7,'admin','logentry'),(9,'auth','group'),(8,'auth','permission'),(10,'contenttypes','contenttype'),(11,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2019-11-21 17:11:23.356921'),(2,'contenttypes','0002_remove_content_type_name','2019-11-21 17:11:23.474999'),(3,'auth','0001_initial','2019-11-21 17:11:23.883185'),(4,'auth','0002_alter_permission_name_max_length','2019-11-21 17:11:23.910347'),(5,'auth','0003_alter_user_email_max_length','2019-11-21 17:11:23.932281'),(6,'auth','0004_alter_user_username_opts','2019-11-21 17:11:23.953229'),(7,'auth','0005_alter_user_last_login_null','2019-11-21 17:11:23.971611'),(8,'auth','0006_require_contenttypes_0002','2019-11-21 17:11:23.977377'),(9,'auth','0007_alter_validators_add_error_messages','2019-11-21 17:11:23.987105'),(10,'auth','0008_alter_user_username_max_length','2019-11-21 17:11:23.998359'),(11,'auth','0009_alter_user_last_name_max_length','2019-11-21 17:11:24.007469'),(12,'adit','0001_initial','2019-11-21 17:11:25.979464'),(13,'admin','0001_initial','2019-11-21 17:11:26.134216'),(14,'admin','0002_logentry_remove_auto_add','2019-11-21 17:11:26.151283'),(15,'admin','0003_logentry_add_action_flag_choices','2019-11-21 17:11:26.168460'),(16,'sessions','0001_initial','2019-11-21 17:11:26.218351'),(17,'adit','0002_adpost_open_for_all','2019-11-22 18:10:34.731481'),(18,'adit','0003_adpost_view_by_date','2019-11-24 23:13:07.138904'),(19,'adit','0004_interestedtags_created_time','2019-11-24 23:13:07.256456');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('2h9x54ws41fq2rbz9dnixzrzsebda3z0','YmUxZTc1ZDhhNDYzNzRlMjgwZDJkNzFlYmRhOGI2Nzc1MjkyYzM0NDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxNTlhZWMyOThjYTdlZWY5NDEzYjRhYWU4YTkxNzQ5NWYyMmNiMzg4In0=','2019-12-05 17:11:55.287000'),('4nfzdb160z6ag7jvjbam7d5rkc1dq2gw','OTI5Yzk1ZjIxYjRmNzFjNzI2NTY5NGU3NWZiNDJkYTA5YjIyYjUxNDp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5NzEwYjUxZTAxZjRjMjE2MjdkOWJlYmI5NDU1OTE4MzA1ZTk0NWM0In0=','2019-12-06 21:41:51.750310'),('h0jh445f3shbp1owyf1c90lk0oth6q63','Y2I2NTBmZDhmNjFiYTdlYjRmZTFjYjAyYmRlN2ExY2ZlYzU0NDgzODp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlNWY1NDRlYWUzMjdmYmVmN2RlYWQ4NWFhYmE3Yjg5ODg5NTg5ODg2In0=','2019-12-07 19:54:30.175102'),('ixqqkp4xgmihpu7aw2z5uu28ekhvi97j','OTI5Yzk1ZjIxYjRmNzFjNzI2NTY5NGU3NWZiNDJkYTA5YjIyYjUxNDp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5NzEwYjUxZTAxZjRjMjE2MjdkOWJlYmI5NDU1OTE4MzA1ZTk0NWM0In0=','2019-12-06 21:40:40.087181');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-25  2:46:45
