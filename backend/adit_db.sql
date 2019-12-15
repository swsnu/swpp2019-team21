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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adituser`
--

LOCK TABLES `adit_adituser` WRITE;
/*!40000 ALTER TABLE `adit_adituser` DISABLE KEYS */;
INSERT INTO `adit_adituser` VALUES ('pbkdf2_sha256$150000$rMEYB2515WLb$Cw9RXxTDoybA9jag8W+Cbop97u3/p4+AkbjEfFy0F7s=','2019-11-06 01:40:01.543000',0,1,'user@snu.ac.kr','user','/image/avatar/default_avatar.png','First','Last',100000,1,0),('pbkdf2_sha256$150000$oI6jsQn6z9LB$9m2/W/sbHgOY/qI3ypQZ/AJFwkuourpididWphTg1gY=','2019-11-06 03:09:28.472000',0,2,'csh3695@snu.ac.kr','Kent','/image/avatar/default_avatar.png','Choi','Seonghwan',100000,1,0),('pbkdf2_sha256$150000$woVLk6NrGg1K$+bxR9wmpvzLY/ueM/ko3KtUSzhffUCWmdCISsdcebMo=','2019-11-06 01:46:50.432000',0,3,'graysea@daum.net','Kaiser','/image/avatar/default_avatar.png','Seo','Yeongho',100000,1,0),('pbkdf2_sha256$150000$aWVCpeQ3FAVD$SqlzJt2WYvAPb4GjG/1UTEq4a6DbLNvRcpUy7eI1lAw=','2019-11-06 02:29:19.081000',0,4,'sanggggg@wafflestudio.com','sanggggg','/image/avatar/default_avatar.png','Kim','Sangmin',100000,1,0),('pbkdf2_sha256$150000$vAPI20Zlja75$MDSqjQ7fXp9isEi1QLkMgvc6ThccEq3U9xAsCX2A+dk=','2019-11-06 03:16:09.601000',0,5,'sonmath43@gmail.com','dhdroid','/image/avatar/default_avatar.png','Donghyun','Son',100000,1,0),('pbkdf2_sha256$120000$XcAW0Bw73nVX$99AfxyG3+T39Y4vkG7Tu12tJDZUwXHyIIw99lqmgsJo=','2019-12-13 17:08:54.119927',0,6,'csh3695@naver.com','Kentaro','/image/avatar/default_avatar.png','Seonghwan','Choi',8961000,1,0),('pbkdf2_sha256$120000$ITmnVmA5KN1q$WTKBPak3Xyr60hwP3g5DC5Sq4zT9Zcqw5J4JF/CNRQQ=','2019-11-22 21:41:51.743187',0,7,'test@test.com','Kentarou','/image/avatar/default_avatar.png','Seonghwan','Choi',100000,1,0),('pbkdf2_sha256$120000$CC1gcXLpMXUu$9qZ551NHKMP2LWg4BUJLjaCF1pGdcRoFZv9pQKYokCg=','2019-12-15 21:18:16.076242',0,8,'graysea2@snu.ac.kr','digdhg','image/avatar/default_avatar.png','YeongHo','Seo',119,1,0),('pbkdf2_sha256$120000$Km3oAxEij5mG$YQj6fpxfkeUKfiSTX9z68SGw+tPv0J1TD3JGGrwMuJg=','2019-12-15 22:11:40.936149',0,9,'ksme6776@gmail.com','sangG','image/avatar/default_avatar.png','Sangmin','Kim',60063,1,0),('pbkdf2_sha256$120000$omKHNTg9hFiy$Sp7PzFpe+70ym+clxL3Y1OwJTcRX8qel4x3xnwQ+A2I=','2019-12-15 21:59:32.252578',0,10,'sangtest@gmail.com','TestSang','image/avatar/default_avatar.png','Test','Sang',35,1,0),('pbkdf2_sha256$120000$zH5RMUCnyLrB$SQz9ruy/p2UfV7vtDYzaZfTq45bWBMZqcPmuEv0eBbY=','2019-12-15 22:11:31.784684',0,11,'aditmanager@google.com','Adit','image/avatar/default_avatar.png','Ad','it',1011111121,1,0),('pbkdf2_sha256$120000$8CBEouf1rDtF$mPtR8L3S7aeMHZLc910bMPiwA/j1s02KIQzIEP1HS50=','2019-12-15 22:12:52.567835',0,12,'m.seo1999@gmail.com','bowibowi','image/avatar/default_avatar.png','Seo','Bowi',0,1,0),('pbkdf2_sha256$120000$lp4dtkOjquOL$UWv6PcYTZIGrC2Hzukjk/b1Rn6VUa5nv/scfbG3wcIk=','2019-12-15 23:05:49.638894',0,13,'happydh1@naver.com','dhdroid!','image/avatar/default_avatar.png','donghyun','son',14,1,0),('pbkdf2_sha256$120000$ku23kf3Mj3Xr$z+gp3L1r0onO0/a0wjLfZJMhKhN64X5yD8AgzAgVxUU=','2019-12-15 23:09:12.775019',0,14,'stella990315@naver.com','jomjung','image/avatar/default_avatar.png','Cho','Minjeong',0,1,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adituser_tags`
--

LOCK TABLES `adit_adituser_tags` WRITE;
/*!40000 ALTER TABLE `adit_adituser_tags` DISABLE KEYS */;
INSERT INTO `adit_adituser_tags` VALUES (44,6,1),(47,6,27),(45,6,52),(46,6,151),(65,8,160),(64,8,179),(54,9,1),(55,9,2),(56,9,25),(57,9,209),(52,10,1),(51,10,199),(53,10,200),(62,13,1),(61,13,2),(60,13,3),(58,13,27),(59,13,52);
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adpost`
--

LOCK TABLES `adit_adpost` WRITE;
/*!40000 ALTER TABLE `adit_adpost` DISABLE KEYS */;
INSERT INTO `adit_adpost` VALUES (21,'[와플스튜디오] 18기 리크루팅','서울대학교 웹/앱 개발 동아리 와플스튜디오 리크루팅','서울대학교 컴퓨터공학부 웹/앱 개발 동아리 와플스튜디오의\n\n18기 리크루팅을 진행합니다!\n\n- 모집 대상 분야 : 기획 / 개발 / 디자인\n- 지원기간 : 19/12/31\n\n많은 참여 바랍니다:)','https://recruit.wafflestudio.com/',0,1500,849,'2019-11-15 18:08:55.262172','2019-12-31',6,23,0,'{\"date\":\"2019-11-15\",\"view\":7}, {\"date\":\"2019-11-16\",\"view\":27}, {\"date\":\"2019-11-17\",\"view\":54}, {\"date\":\"2019-11-18\",\"view\":114}, {\"date\":\"2019-11-19\",\"view\":133}, {\"date\":\"2019-11-20\",\"view\":140}, {\"date\":\"2019-11-21\",\"view\":169}, {\"date\":\"2019-11-22\",\"view\":207}, {\"date\":\"2019-11-23\",\"view\":229}, {\"date\":\"2019-11-24\",\"view\":248}, {\"date\":\"2019-11-25\",\"view\":296}, {\"date\":\"2019-11-26\",\"view\":307}, {\"date\":\"2019-11-27\",\"view\":313}, {\"date\":\"2019-11-28\",\"view\":354}, {\"date\":\"2019-11-29\",\"view\":389}, {\"date\":\"2019-11-30\",\"view\":391}, {\"date\":\"2019-11-31\",\"view\":439}, {\"date\":\"2019-12-1\",\"view\":469}, {\"date\":\"2019-12-2\",\"view\":481}, {\"date\":\"2019-12-3\",\"view\":485}, {\"date\":\"2019-12-4\",\"view\":496}, {\"date\":\"2019-12-5\",\"view\":524}, {\"date\":\"2019-12-6\",\"view\":527}, {\"date\":\"2019-12-7\",\"view\":589}, {\"date\":\"2019-12-8\",\"view\":621}, {\"date\":\"2019-12-9\",\"view\":658}, {\"date\":\"2019-12-10\",\"view\":721}, {\"date\":\"2019-12-11\",\"view\":729}, {\"date\":\"2019-12-12\",\"view\":782}, {\"date\":\"2019-12-13\",\"view\":849}, '),(22,'[서울대 총학생회] 2020 중앙집행위원 모집','<2020 단과대연석회의 중앙집행위원 모집>','<2020 단과대연석회의 중앙집행위원 모집>\n\n모집기간 : 12월 9일(월)~12월 12일(목)\n링크 : bit.ly/2020연석회의중집\n\n안녕하세요! 2020 단과대연석회의 의장단입니다.\n\n지난 12월 1일부터 시작된 단과대연석회의의 중앙집행위원을 모집합니다!\n\n연석회의 운영위원회에서 결정된 사안과 서울대학교 학생사회의 다채로운 행사들을 함께 하실 분들이 절실하게 필요합니다.\n\n(팀 구성 가안)\n// 장학금 대응 / 회칙개정 / 인권사안대응팀 / 사업기획팀\n// 사무국 + 홍보국\n\n함께 일하기 전 서로 이야기를 나눌 시간을 갖기 위해 금요일, 토요일 중 가능하신 시간을 수합받을 예정입니다.\n\n서울대학교 학생사회가 발전해나갈 수 있도록 학우여러분의 많은 관심과 지원 부탁드리겠습니다.\n\n감사합니다.','https://www.facebook.com/snuchong/',1,200,120,'2019-12-05 18:13:54.503117','2019-12-12',6,24,0,'{\"date\":\"2019-12-5\",\"view\":2}, {\"date\":\"2019-12-6\",\"view\":25}, {\"date\":\"2019-12-7\",\"view\":26}, {\"date\":\"2019-12-8\",\"view\":34}, {\"date\":\"2019-12-9\",\"view\":35}, {\"date\":\"2019-12-10\",\"view\":113}, {\"date\":\"2019-12-11\",\"view\":115}, {\"date\":\"2019-12-12\",\"view\":120}, '),(23,'[총학] 전국대학 학생회 캠프','제6회 전국대학 학생회 캠프에 초대합니다!','제6회 전국대학 학생회 캠프에 초대합니다\n\n일시 l 2019년 12월 28일 (토) 오후 1시 – 12월 29일 (일) 오후 8시\n장소 l 서울 소재 대학교 (협의중) - 서울시 여성플라자\n\n★★★ 캠프 참가 신청 링크 : bit.ly/6th_hakcam\n★★★ 캠프제안서(기획안 포함) pdf 파일 링크 : bit.ly/6th_hakcam_manual\n\n임기를 마치며 한 해를 돌아보는 학생회 대표자 및 집행부, 설레는 마음으로 2020년 학생회와 학생사회를 고민하고 계시는 학생회 신임 대표자와 집행부 모두를 <제6회 전국대학 학생회캠프>에 초대합니다\n\n학생회 대표자 / 집행부 간의 교류와 소통과 더불어 전국 대학 문제와 학생회들의 대응 현황들을 공유하고, 앞으로의 대학·학생 사회의 방향에 대하여 함께 논의하는 학생회 캠프에 각 대학 학생회의 많은 참여와 관심을 부탁드립니다\n\n※ 참가 신청 인원 제한 : 150명\n※ 회비 : 가입단위 3만원 / 미가입단위 3만 5천원 (숙식, 자료집 비용 등 포함)\n※ 입금계좌 : 3333122828420 카카오뱅크 (전대넷 학캠)\n\n- 전국대학학생회네트워크 -','https://bit.ly/6th_hakcam',0,1200,800,'2019-12-01 18:18:21.116510','2019-12-25',6,27,0,'{\"date\":\"2019-12-1\",\"view\":2}, {\"date\":\"2019-12-2\",\"view\":260}, {\"date\":\"2019-12-3\",\"view\":274}, {\"date\":\"2019-12-4\",\"view\":329}, {\"date\":\"2019-12-5\",\"view\":354}, {\"date\":\"2019-12-6\",\"view\":366}, {\"date\":\"2019-12-7\",\"view\":396}, {\"date\":\"2019-12-8\",\"view\":443}, {\"date\":\"2019-12-9\",\"view\":599}, {\"date\":\"2019-12-10\",\"view\":601}, {\"date\":\"2019-12-11\",\"view\":647}, {\"date\":\"2019-12-12\",\"view\":717}, {\"date\":\"2019-12-13\",\"view\":800}, '),(24,'인천시교육청 SNS 온라인(만족도) 설문조사','인천시교육청 SNS 만족도 조사','[안하면 후회하는 설문조사] 인천시교육청 SNS 온라인(만족도) 설문조사\n\n기간: 이천십구년 십일월 이십팔일 부터\n이천십구년 십이월 십이일 십칠시까지\n\n내용: 인천시교육청 SNS 어땠어?\n\n설문에 정성껏 응해주신 60명을 추첨하여 도서문화상품권을 팡팡 드림!','https://moaform.com/q/tjbzgn',1,3000,2400,'2019-11-27 18:23:06.503189','2019-12-12',6,29,1,'{\"date\":\"2019-11-27\",\"view\":14}, {\"date\":\"2019-11-28\",\"view\":365}, {\"date\":\"2019-11-29\",\"view\":373}, {\"date\":\"2019-11-30\",\"view\":393}, {\"date\":\"2019-11-31\",\"view\":437}, {\"date\":\"2019-12-1\",\"view\":663}, {\"date\":\"2019-12-2\",\"view\":1071}, {\"date\":\"2019-12-3\",\"view\":1125}, {\"date\":\"2019-12-4\",\"view\":1142}, {\"date\":\"2019-12-5\",\"view\":1221}, {\"date\":\"2019-12-6\",\"view\":1456}, {\"date\":\"2019-12-7\",\"view\":1673}, {\"date\":\"2019-12-8\",\"view\":2004}, {\"date\":\"2019-12-9\",\"view\":2038}, {\"date\":\"2019-12-10\",\"view\":2128}, {\"date\":\"2019-12-11\",\"view\":2147}, {\"date\":\"2019-12-12\",\"view\":2400}, '),(25,'고공행진! 속부터 상쾌한 잇퓸 런칭','런칭 되자마자 완판된 신개념 입냄새 제거제!','런칭 되자마자 바로 완판 된 미x 입냄새 없애준다함\n입냄새 넘 심한 사람은 이거 하나면,, 충분 ,,,\n가격도 5천원 밖에 안함,,, 또 완판 되기전에 겟해','https://bit.ly/2pUWMoc',0,30000,20517,'2019-11-01 18:26:21.681700','2019-12-31',6,30,1,'{\"date\":\"2019-11-1\",\"view\":391}, {\"date\":\"2019-11-2\",\"view\":861}, {\"date\":\"2019-11-3\",\"view\":984}, {\"date\":\"2019-11-4\",\"view\":1272}, {\"date\":\"2019-11-5\",\"view\":1488}, {\"date\":\"2019-11-6\",\"view\":1706}, {\"date\":\"2019-11-7\",\"view\":2162}, {\"date\":\"2019-11-8\",\"view\":2729}, {\"date\":\"2019-11-9\",\"view\":3028}, {\"date\":\"2019-11-10\",\"view\":3683}, {\"date\":\"2019-11-11\",\"view\":3992}, {\"date\":\"2019-11-12\",\"view\":4233}, {\"date\":\"2019-11-13\",\"view\":4766}, {\"date\":\"2019-11-14\",\"view\":4952}, {\"date\":\"2019-11-15\",\"view\":5058}, {\"date\":\"2019-11-16\",\"view\":6437}, {\"date\":\"2019-11-17\",\"view\":7201}, {\"date\":\"2019-11-18\",\"view\":8032}, {\"date\":\"2019-11-19\",\"view\":8539}, {\"date\":\"2019-11-20\",\"view\":8832}, {\"date\":\"2019-11-21\",\"view\":10110}, {\"date\":\"2019-11-22\",\"view\":10376}, {\"date\":\"2019-11-23\",\"view\":10520}, {\"date\":\"2019-11-24\",\"view\":11050}, {\"date\":\"2019-11-25\",\"view\":11266}, {\"date\":\"2019-11-26\",\"view\":12766}, {\"date\":\"2019-11-27\",\"view\":12971}, {\"date\":\"2019-11-28\",\"view\":13514}, {\"date\":\"2019-11-29\",\"view\":13745}, {\"date\":\"2019-11-30\",\"view\":14122}, {\"date\":\"2019-11-31\",\"view\":14216}, {\"date\":\"2019-12-1\",\"view\":14244}, {\"date\":\"2019-12-2\",\"view\":14636}, {\"date\":\"2019-12-3\",\"view\":15640}, {\"date\":\"2019-12-4\",\"view\":15667}, {\"date\":\"2019-12-5\",\"view\":15843}, {\"date\":\"2019-12-6\",\"view\":16159}, {\"date\":\"2019-12-7\",\"view\":17218}, {\"date\":\"2019-12-8\",\"view\":17399}, {\"date\":\"2019-12-9\",\"view\":17704}, {\"date\":\"2019-12-10\",\"view\":18396}, {\"date\":\"2019-12-11\",\"view\":19473}, {\"date\":\"2019-12-12\",\"view\":20341}, {\"date\":\"2019-12-13\",\"view\":20517}, '),(26,'★ 지니신맞고 신규 런칭 이벤트 2탄','지니 신맞고 신규 런칭!','★ 지니신맞고 신규 런칭 이벤트 2탄 ★\n\n오늘은 대망의 런칭 날 ! KT 739번 접속해봐용!!!\n　\n시니어를 위한 게임의 등장! \n리모콘으로 즐기는 맞고 한판!!!\n\n　　\n참여방법\n1) 지니게임 페이지 좋아요 누르기 ♡\n2) KT TV 채널 739번 접속\n3) 지니신맞고 게임 열심히 하고 화면을 찍기!\n4) 게임 화면 스샷을 댓글로 인증하기!\n\n참여 및 게시글 공유하면 당첨 확률이 up up !\n　\n　\n이벤트 기간\n19년 12월 04일 ~ 19년 12월 12일까지\n　\n경품\n추첨을 통하여 백화점상품권 50,000원 지급!\n\n당첨자 발표\n19년 12월 16일 이후 페이지에 발표 후 messenger 를 통하여 개별 연락을 드릴 예정이며, [성함/연락처/개인정보동의여부] 회신을 요청드립니다.\n　\n　\n유의사항\nmessenger를 이용 부탁드리며, messenger를 이용하지 않아 연락을 드릴 수 없는 경우 당첨이 취소 될 수 있으며, 12월 20일까지 받으실 전화번호에 대해 회신이 이루어지지 않을 경우 당첨이 취소 될 수 있음을 안내드립니다.','https://www.adit.shop/article/26/',0,50000,12050,'2019-12-13 18:30:00.807150','2019-12-31',6,31,1,'{\"date\":\"2019-12-1\",\"view\":339}, {\"date\":\"2019-12-2\",\"view\":960}, {\"date\":\"2019-12-3\",\"view\":2435}, {\"date\":\"2019-12-4\",\"view\":3457}, {\"date\":\"2019-12-5\",\"view\":3530}, {\"date\":\"2019-12-6\",\"view\":5035}, {\"date\":\"2019-12-7\",\"view\":5040}, {\"date\":\"2019-12-8\",\"view\":5364}, {\"date\":\"2019-12-9\",\"view\":8138}, {\"date\":\"2019-12-10\",\"view\":8489}, {\"date\":\"2019-12-11\",\"view\":9889}, {\"date\":\"2019-12-12\",\"view\":10451}, {\"date\":\"2019-12-13\",\"view\":12045}, '),(27,'서울대생의 모든 고민을 한 곳에!','스누보이스 신규 런칭','서울대생의 모든 고민과 고충을 한 곳에!\n\n내 이야기를 들어 주는 유일한 친구\n\nSNUVOICE를 소개합니다!','https://snuvoice.site/',0,2000,1000,'2019-12-01 18:40:06.513616','2019-12-31',6,32,0,'{\"date\":\"2019-12-1\",\"view\":31}, {\"date\":\"2019-12-2\",\"view\":42}, {\"date\":\"2019-12-3\",\"view\":113}, {\"date\":\"2019-12-4\",\"view\":326}, {\"date\":\"2019-12-5\",\"view\":384}, {\"date\":\"2019-12-6\",\"view\":410}, {\"date\":\"2019-12-7\",\"view\":546}, {\"date\":\"2019-12-8\",\"view\":740}, {\"date\":\"2019-12-9\",\"view\":748}, {\"date\":\"2019-12-10\",\"view\":752}, {\"date\":\"2019-12-11\",\"view\":899}, {\"date\":\"2019-12-12\",\"view\":952}, {\"date\":\"2019-12-13\",\"view\":999}, '),(28,'쿠키런 시즌3 대규모 업데이트!','쿠키런 대규모 업데이트 기념 이벤트','지금 차트 역주행 중인 쿠키런 ㄷㄷ \n\n이벤트로 다이아 엄청 뿌리고 있다던데 ㅋㅋㅋ\n접속만 해도 2000개는 그냥 먹고 시작함 ','https://bit.ly/2IuzDk9',0,2000,1567,'2019-12-01 18:44:59.919648','2019-12-31',6,33,1,'{\"date\":\"2019-12-1\",\"view\":19}, {\"date\":\"2019-12-2\",\"view\":107}, {\"date\":\"2019-12-3\",\"view\":180}, {\"date\":\"2019-12-4\",\"view\":256}, {\"date\":\"2019-12-5\",\"view\":344}, {\"date\":\"2019-12-6\",\"view\":371}, {\"date\":\"2019-12-7\",\"view\":667}, {\"date\":\"2019-12-8\",\"view\":740}, {\"date\":\"2019-12-9\",\"view\":804}, {\"date\":\"2019-12-10\",\"view\":807}, {\"date\":\"2019-12-11\",\"view\":843}, {\"date\":\"2019-12-12\",\"view\":1528}, {\"date\":\"2019-12-13\",\"view\":1560}, '),(29,'[Apple] 아이폰 11 Pro 공개','[AppleKorea] 아이폰 11 프로 공개','전격 프로 선언.\n복잡함은 빼고 엄청난 성능만을 더해 사진 촬영의 개념 자체를 바꾸는 트리플 카메라 시스템. 배터리 사용 시간의 전례 없는 도약. 머신 러닝의 잠재력을 더욱 끌어올리고, 스마트폰의 영역을 확장하는 가공할 성능의 칩. Pro라는 이름에 전혀 손색 없는 강력한 최초의 iPhone, 지금 소개합니다.','https://www.apple.com/kr/iphone-11-pro/',0,20000,1565,'2019-12-01 18:48:09.585105','2019-12-31',6,34,1,'{\"date\":\"2019-12-1\",\"view\":19}, {\"date\":\"2019-12-2\",\"view\":107}, {\"date\":\"2019-12-3\",\"view\":180}, {\"date\":\"2019-12-4\",\"view\":256}, {\"date\":\"2019-12-5\",\"view\":344}, {\"date\":\"2019-12-6\",\"view\":371}, {\"date\":\"2019-12-7\",\"view\":667}, {\"date\":\"2019-12-8\",\"view\":740}, {\"date\":\"2019-12-9\",\"view\":804}, {\"date\":\"2019-12-10\",\"view\":807}, {\"date\":\"2019-12-11\",\"view\":843}, {\"date\":\"2019-12-12\",\"view\":1528}, {\"date\":\"2019-12-13\",\"view\":1560}, '),(30,'[모집]\'서울대에서 꿈꾸는 나의 미래\' 멘토 모집','서울대 재학생 멘토 모집','서울대에서 꿈꾸는 나의 미래에 함께할 서울대 재학생 멘토를 모집합니다.\n\n프로그램 상세내용은 아래 첨부자료 및 서울대학교 평생교육원 홈페이지 공지사항을 참고하여 주시기 바랍니다.\n\n관심있는 재학생 여러분의 많은 참여 바랍니다.\n\n감사합니다.\n\n','https://snui.snu.ac.kr/el/info/info_notice_view_form.acl?ARTL_NUM=140&b=G01&t=2&start=1&display=10&SCH_VAL=',0,2000,324,'2019-12-08 18:51:48.003675','2019-12-24',6,35,0,'{\"date\":\"2019-12-8\",\"view\":19}, {\"date\":\"2019-12-9\",\"view\":78}, {\"date\":\"2019-12-10\",\"view\":78}, {\"date\":\"2019-12-11\",\"view\":82}, {\"date\":\"2019-12-12\",\"view\":122}, {\"date\":\"2019-12-13\",\"view\":324}, '),(31,'헌혈러브레터 만족도 조사','대한적십자사 혈액관리본부 헌혈러브레터 만족도','혈액관리본부는 헌혈러브레터 소식지 내용개선을 위해 헌혈자분들의 소중한 의견을 받고자 하니 많은 참여 바랍니다.\n\n설문기간 : 2019.12.11.~2019.12.27.(17일간)','https://forms.gle/BwWmBRKa6oXYtzcL7',0,2000,165,'2019-12-10 18:56:31.987273','2019-12-27',6,36,0,'{\"date\":\"2019-12-10\",\"view\":29}, {\"date\":\"2019-12-11\",\"view\":35}, {\"date\":\"2019-12-12\",\"view\":164}, {\"date\":\"2019-12-13\",\"view\":165}, '),(32,'19th 보성말차 페스티벌','올 겨울, 보성말차와 함께 하세요!','\"다시 돌아온 보성말차 페스티벌, 여러분과 함께합니다!\"\n\n올 겨울 깔끔한 보성말차 한잔 어떠세요?\n\n서울대학교 301동 314호에서 진행됩니다!!\n\n- 보성말차 많이 마시기 대회\n- 미스/미스터 말차 선발대회\n- 그 외 다양한 행사가 진행됩니다!\n\n장소 : 서울대학교 301동 314호\n일시 : 2019.12.30 ~ 2020.1.2\n입장료 : 무료','https://ko.wikipedia.org/wiki/%EB%A7%90%EC%B0%A8',0,1000,2,'2019-12-15 21:49:00.678516','2020-01-02',9,37,1,''),(33,'무신사 신규회원을 위한 12월 특별 혜택','신규 가입 시, 15% 쿠폰 3,000원 적립금 지급','::회원 가입 EVENT. 신규 가입 시, 15% 쿠폰 3,000원 적립금 지급 / 무신사 스탠다드 이벤트 상품 990원 구매 기회 제공::\n\n#혜택 01 무신사 스토어의 인기 상품을 990원부터!\n회원 가입 시 아래 상품 중 한 가지를 990원부터 구입할 수 있습니다.\n\n#혜택 02 신규 가입 시 바로 지급\n가입하신 신규 회원 모두에게 15% 할인 쿠폰과 적립금 3,000원을 드립니다!\n\n#혜택 03 무신사 회원만의 강력한 혜택\n무신사 회원이면 누구나 누릴 수 있는 강력한 혜택을 확인해 보세요.','https://store.musinsa.com/app/content/s/usr/membership',0,3000,3,'2019-12-15 21:55:04.146906','2020-01-05',9,38,1,''),(34,'Adit을 사용해보세요','소문내세요, 당신의 일상 속에서','adit은 \"광고 중계 서비스\" 플랫폼입니다!\n\n누구나 자신만의 광고를 올릴 수 있고,\n누구나 다른 사용자의 광고를 퍼뜨려 돈을 벌 수 있습니다!','https://www.adit.shop/home',0,9999999,10,'2019-12-15 22:11:25.126840','2020-12-18',11,39,1,'');
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
) ENGINE=InnoDB AUTO_INCREMENT=226 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adpost_tags`
--

LOCK TABLES `adit_adpost_tags` WRITE;
/*!40000 ALTER TABLE `adit_adpost_tags` DISABLE KEYS */;
INSERT INTO `adit_adpost_tags` VALUES (146,21,1),(152,21,2),(148,21,24),(149,21,25),(150,21,26),(147,21,27),(151,21,149),(153,21,150),(154,22,1),(155,22,151),(156,22,152),(157,22,153),(158,22,154),(159,22,155),(160,22,156),(164,23,154),(161,23,157),(162,23,158),(163,23,159),(165,24,160),(166,24,161),(167,24,162),(168,24,163),(169,24,164),(170,25,165),(171,25,166),(172,25,167),(173,25,168),(177,26,169),(178,26,170),(179,26,171),(180,27,1),(181,27,52),(182,27,172),(183,27,173),(185,28,31),(184,28,174),(186,28,175),(187,28,176),(188,28,177),(189,29,178),(190,29,179),(191,29,180),(192,29,181),(193,30,1),(194,30,182),(195,30,183),(196,30,184),(197,30,185),(199,31,163),(198,31,186),(206,32,52),(207,32,192),(208,32,193),(209,32,194),(210,32,195),(211,32,196),(212,33,197),(213,33,198),(214,33,199),(215,33,200),(216,33,201),(217,33,202),(218,33,203),(219,33,204),(223,34,208),(224,34,209),(225,34,210);
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_adreception`
--

LOCK TABLES `adit_adreception` WRITE;
/*!40000 ALTER TABLE `adit_adreception` DISABLE KEYS */;
INSERT INTO `adit_adreception` VALUES (9,5,'https://www.adit.shop/redirectfrom=KoE2l2jKiyTn',0,'2019-12-15 03:51:31.553573',26,8),(10,0,'https://www.adit.shop/redirectfrom=1o7nknZkiJSO',0,'2019-12-15 03:52:01.471714',25,8),(11,7,'https://www.adit.shop/redirectfrom=mzXnm9wRuBc3',0,'2019-12-15 21:20:56.148965',28,8),(12,5,'https://www.adit.shop/redirectfrom=5v0rkzqGUEfl',0,'2019-12-15 21:38:45.560089',29,8),(13,3,'https://www.adit.shop/redirectfrom=3qJpgqljtMtp',0,'2019-12-15 21:59:37.356071',33,10),(14,2,'https://www.adit.shop/redirectfrom=kxMlknOohBsD',0,'2019-12-15 22:02:04.194152',32,10),(15,9,'https://www.adit.shop/redirectfrom=rG7vrxxgFzuL',0,'2019-12-15 22:09:54.737416',34,9),(16,1,'https://www.adit.shop/redirectfrom=VDZkqB9JsEug',0,'2019-12-15 23:03:26.503250',34,13),(17,1,'https://www.adit.shop/redirectfrom=wNgAzBLmS5UA',0,'2019-12-15 23:07:15.016703',27,13);
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
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_interestedtags`
--

LOCK TABLES `adit_interestedtags` WRITE;
/*!40000 ALTER TABLE `adit_interestedtags` DISABLE KEYS */;
INSERT INTO `adit_interestedtags` VALUES (1,'서울대학교',4,4,'2019-11-24 23:13:07.169226'),(2,'컴퓨터공학부',2,1,'2019-11-24 23:13:07.169226'),(3,'여행',1,0,'2019-11-01 19:15:01.637445'),(4,'컴퓨터',0,0,'2019-11-01 19:15:01.637445'),(5,'공연',0,0,'2019-11-01 19:15:01.637445'),(6,'연극',0,0,'2019-11-01 19:15:01.637445'),(7,'휴대폰',0,0,'2019-11-01 19:15:01.637445'),(8,'운동',0,0,'2019-11-01 19:15:01.637445'),(9,'춤',0,0,'2019-11-01 19:15:01.637445'),(10,'노래',0,0,'2019-11-01 19:15:01.637445'),(11,'책',0,0,'2019-11-01 19:15:01.637445'),(12,'영화',0,0,'2019-11-01 19:15:01.637445'),(13,'구인',0,0,'2019-11-01 19:15:01.637445'),(14,'구직',0,0,'2019-11-01 19:15:01.637445'),(15,'과외',0,0,'2019-11-01 19:15:01.637445'),(16,'요가',0,0,'2019-11-01 19:15:01.637445'),(17,'이벤트',0,0,'2019-11-01 19:15:01.637445'),(18,'밴드',0,0,'2019-11-01 19:15:01.637445'),(24,'와플스튜디오',0,1,'2019-11-24 23:13:07.169226'),(25,'웹',1,1,'2019-11-24 23:13:07.169226'),(26,'앱',0,1,'2019-11-24 23:13:07.169226'),(27,'동아리',2,1,'2019-11-24 23:13:07.169226'),(31,'게임',0,1,'2019-11-24 23:13:07.169226'),(52,'서울대',2,2,'2019-11-24 23:13:07.169226'),(149,'개발',0,1,'2019-12-13 18:08:55.416017'),(150,'리크루팅',0,1,'2019-12-13 18:08:55.457541'),(151,'총학생회',1,1,'2019-12-13 18:13:54.552397'),(152,'중앙집행위원',0,1,'2019-12-13 18:13:54.574654'),(153,'중집',0,1,'2019-12-13 18:13:54.606039'),(154,'총학',0,2,'2019-12-13 18:13:54.625075'),(155,'중앙집행부',0,1,'2019-12-13 18:13:54.643584'),(156,'단과대연석회의',0,1,'2019-12-13 18:13:54.662632'),(157,'전국대학학생회캠프',0,1,'2019-12-13 18:18:21.157015'),(158,'학생회캠프',0,1,'2019-12-13 18:18:21.176121'),(159,'학생회',0,1,'2019-12-13 18:18:21.196646'),(160,'인천시교육청',1,1,'2019-12-13 18:23:06.553784'),(161,'SNS온라인설문',0,1,'2019-12-13 18:23:06.574377'),(162,'설문조사',0,1,'2019-12-13 18:23:06.594179'),(163,'만족도조사',0,2,'2019-12-13 18:23:06.616937'),(164,'문화상품권',0,1,'2019-12-13 18:23:06.636279'),(165,'잇퓸',0,1,'2019-12-13 18:26:21.721671'),(166,'입냄새',0,1,'2019-12-13 18:26:21.741381'),(167,'완판',0,1,'2019-12-13 18:26:21.766699'),(168,'런칭',0,1,'2019-12-13 18:26:21.786465'),(169,'지니신맞고',0,1,'2019-12-13 18:29:21.139468'),(170,'지니게임',0,1,'2019-12-13 18:29:21.159832'),(171,'신규런칭',0,1,'2019-12-13 18:29:21.179546'),(172,'스누보이스',0,1,'2019-12-13 18:40:06.597888'),(173,'SNUVOICE',0,1,'2019-12-13 18:40:06.622661'),(174,'쿠키런',0,1,'2019-12-13 18:44:59.966805'),(175,'쿠키런forkakao',0,1,'2019-12-13 18:45:00.012593'),(176,'대규모업데이트',0,1,'2019-12-13 18:45:00.032482'),(177,'업데이트',0,1,'2019-12-13 18:45:00.056359'),(178,'애플',0,1,'2019-12-13 18:48:09.620790'),(179,'Apple',1,1,'2019-12-13 18:48:09.642129'),(180,'Iphone',0,1,'2019-12-13 18:48:09.663166'),(181,'아이폰',0,1,'2019-12-13 18:48:09.682524'),(182,'평생교육원',0,1,'2019-12-13 18:51:48.068898'),(183,'청소년방학과정',0,1,'2019-12-13 18:51:48.089025'),(184,'멘토',0,1,'2019-12-13 18:51:48.108225'),(185,'재학생멘토',0,1,'2019-12-13 18:51:48.127660'),(186,'헌혈',0,1,'2019-12-13 18:56:32.032939'),(192,'말차',1,0,'2019-12-15 21:49:01.184580'),(193,'음료',1,0,'2019-12-15 21:49:01.231589'),(194,'축제',1,0,'2019-12-15 21:49:01.278038'),(195,'페스티벌',1,0,'2019-12-15 21:49:01.372106'),(196,'녹차',1,0,'2019-12-15 21:49:01.434197'),(197,'무신사',0,1,'2019-12-15 21:55:04.185396'),(198,'신규회원',0,1,'2019-12-15 21:55:04.253219'),(199,'의류',1,1,'2019-12-15 21:55:04.288532'),(200,'패션',1,1,'2019-12-15 21:55:04.335671'),(201,'스트릿패션',0,1,'2019-12-15 21:55:04.383212'),(202,'무신사스토어',0,1,'2019-12-15 21:55:04.445194'),(203,'멀티샵',0,1,'2019-12-15 21:55:04.491438'),(204,'할인',0,1,'2019-12-15 21:55:04.539218'),(208,'광고',1,0,'2019-12-15 22:11:25.252396'),(209,'아딧',2,0,'2019-12-15 22:11:25.294753'),(210,'플랫폼',1,0,'2019-12-15 22:11:25.342027');
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_postimage`
--

LOCK TABLES `adit_postimage` WRITE;
/*!40000 ALTER TABLE `adit_postimage` DISABLE KEYS */;
INSERT INTO `adit_postimage` VALUES (23,'image/adpost/postimage/temp.png'),(24,'image/adpost/postimage/temp.jpeg'),(25,'image/adpost/postimage/temp_X7WbwTF.png'),(26,'image/adpost/postimage/temp_WvGF448.png'),(27,'image/adpost/postimage/temp_oVmDlIb.png'),(28,'image/adpost/postimage/temp_p5qj4JD.jpeg'),(29,'image/adpost/postimage/temp_Mb7FzNh.jpeg'),(30,'image/adpost/postimage/temp_2yOniwT.jpeg'),(31,'image/adpost/postimage/temp_jkJDZdR.jpeg'),(32,'image/adpost/postimage/temp_A7cEj5u.png'),(33,'image/adpost/postimage/temp_KDTsIrA.jpeg'),(34,'image/adpost/postimage/temp_YixchgI.jpeg'),(35,'image/adpost/postimage/temp_W48hbCv.jpeg'),(36,'image/adpost/postimage/temp_uXqm5z8.jpeg'),(37,'image/adpost/postimage/temp_4WTZpGD.jpeg'),(38,'image/adpost/postimage/temp_Or5mfwF.png'),(39,'image/adpost/postimage/temp_ClePp6k.png');
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
-- Table structure for table `adit_suggestpending`
--

DROP TABLE IF EXISTS `adit_suggestpending`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_suggestpending` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adit_suggestpending_post_id_47d32b25_fk_adit_adpost_id` (`post_id`),
  CONSTRAINT `adit_suggestpending_post_id_47d32b25_fk_adit_adpost_id` FOREIGN KEY (`post_id`) REFERENCES `adit_adpost` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_suggestpending`
--

LOCK TABLES `adit_suggestpending` WRITE;
/*!40000 ALTER TABLE `adit_suggestpending` DISABLE KEYS */;
/*!40000 ALTER TABLE `adit_suggestpending` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adit_visitedip`
--

DROP TABLE IF EXISTS `adit_visitedip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adit_visitedip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(16) NOT NULL,
  `created` datetime(6) NOT NULL,
  `adreception_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adit_visitedip_adreception_id_7e8eff9b_fk_adit_adreception_id` (`adreception_id`),
  CONSTRAINT `adit_visitedip_adreception_id_7e8eff9b_fk_adit_adreception_id` FOREIGN KEY (`adreception_id`) REFERENCES `adit_adreception` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adit_visitedip`
--

LOCK TABLES `adit_visitedip` WRITE;
/*!40000 ALTER TABLE `adit_visitedip` DISABLE KEYS */;
INSERT INTO `adit_visitedip` VALUES (1,'211.44.55.92','2019-12-15 20:27:21.277686',9),(2,'175.197.34.171','2019-12-15 20:28:58.128382',9),(3,'175.223.18.5','2019-12-15 20:28:59.080380',9),(4,'211.44.55.92','2019-12-15 20:32:08.945887',9),(5,'211.44.55.92','2019-12-15 21:17:49.384492',9),(6,'211.44.55.92','2019-12-15 21:22:15.621169',11),(7,'39.7.28.26','2019-12-15 21:22:25.226331',11),(8,'223.62.204.126','2019-12-15 21:25:31.828416',11),(9,'175.223.18.36','2019-12-15 21:29:47.997068',11),(10,'147.46.113.63','2019-12-15 21:30:55.245500',11),(11,'147.46.113.63','2019-12-15 21:31:06.676273',11),(12,'119.202.86.187','2019-12-15 21:44:42.738809',12),(13,'211.44.55.92','2019-12-15 21:44:46.967162',12),(14,'121.185.49.230','2019-12-15 21:44:48.026767',12),(15,'211.44.55.92','2019-12-15 22:01:12.298171',13),(16,'175.223.30.154','2019-12-15 22:01:46.617451',12),(17,'211.44.55.92','2019-12-15 22:02:29.993063',14),(18,'114.71.101.200','2019-12-15 22:02:47.887988',14),(19,'39.7.46.67','2019-12-15 22:05:01.795531',13),(20,'147.47.7.69','2019-12-15 22:07:57.773249',11),(21,'211.44.55.92','2019-12-15 22:10:32.896836',15),(22,'147.47.7.69','2019-12-15 22:10:38.007157',15),(23,'124.49.60.147','2019-12-15 22:10:47.231253',15),(24,'211.177.11.189','2019-12-15 22:11:04.404345',15),(25,'114.71.101.200','2019-12-15 22:13:15.880300',15),(26,'223.62.169.158','2019-12-15 22:14:30.365747',15),(27,'106.251.125.216','2019-12-15 22:15:51.723530',15),(28,'175.223.18.36','2019-12-15 22:24:39.354888',15),(29,'1.235.47.95','2019-12-15 22:30:29.025621',12),(30,'117.111.26.208','2019-12-15 22:33:28.613570',13),(31,'117.111.26.208','2019-12-15 22:33:49.156653',15),(32,'39.7.28.26','2019-12-15 23:07:01.085711',16),(33,'211.44.55.92','2019-12-15 23:07:48.449973',17);
/*!40000 ALTER TABLE `adit_visitedip` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add adit user',1,'add_adituser'),(2,'Can change adit user',1,'change_adituser'),(3,'Can delete adit user',1,'delete_adituser'),(4,'Can view adit user',1,'view_adituser'),(5,'Can add ad post',2,'add_adpost'),(6,'Can change ad post',2,'change_adpost'),(7,'Can delete ad post',2,'delete_adpost'),(8,'Can view ad post',2,'view_adpost'),(9,'Can add ad reception',3,'add_adreception'),(10,'Can change ad reception',3,'change_adreception'),(11,'Can delete ad reception',3,'delete_adreception'),(12,'Can view ad reception',3,'view_adreception'),(13,'Can add interested tags',4,'add_interestedtags'),(14,'Can change interested tags',4,'change_interestedtags'),(15,'Can delete interested tags',4,'delete_interestedtags'),(16,'Can view interested tags',4,'view_interestedtags'),(17,'Can add post image',5,'add_postimage'),(18,'Can change post image',5,'change_postimage'),(19,'Can delete post image',5,'delete_postimage'),(20,'Can view post image',5,'view_postimage'),(21,'Can add question',6,'add_question'),(22,'Can change question',6,'change_question'),(23,'Can delete question',6,'delete_question'),(24,'Can view question',6,'view_question'),(25,'Can add log entry',7,'add_logentry'),(26,'Can change log entry',7,'change_logentry'),(27,'Can delete log entry',7,'delete_logentry'),(28,'Can view log entry',7,'view_logentry'),(29,'Can add permission',8,'add_permission'),(30,'Can change permission',8,'change_permission'),(31,'Can delete permission',8,'delete_permission'),(32,'Can view permission',8,'view_permission'),(33,'Can add group',9,'add_group'),(34,'Can change group',9,'change_group'),(35,'Can delete group',9,'delete_group'),(36,'Can view group',9,'view_group'),(37,'Can add content type',10,'add_contenttype'),(38,'Can change content type',10,'change_contenttype'),(39,'Can delete content type',10,'delete_contenttype'),(40,'Can view content type',10,'view_contenttype'),(41,'Can add session',11,'add_session'),(42,'Can change session',11,'change_session'),(43,'Can delete session',11,'delete_session'),(44,'Can view session',11,'view_session'),(45,'Can add ip address duplication',12,'add_ipaddressduplication'),(46,'Can change ip address duplication',12,'change_ipaddressduplication'),(47,'Can delete ip address duplication',12,'delete_ipaddressduplication'),(48,'Can view ip address duplication',12,'view_ipaddressduplication'),(49,'Can add suggest pending',13,'add_suggestpending'),(50,'Can change suggest pending',13,'change_suggestpending'),(51,'Can delete suggest pending',13,'delete_suggestpending'),(52,'Can view suggest pending',13,'view_suggestpending'),(53,'Can add visited ip',14,'add_visitedip'),(54,'Can change visited ip',14,'change_visitedip'),(55,'Can delete visited ip',14,'delete_visitedip'),(56,'Can view visited ip',14,'view_visitedip');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'adit','adituser'),(2,'adit','adpost'),(3,'adit','adreception'),(4,'adit','interestedtags'),(12,'adit','ipaddressduplication'),(5,'adit','postimage'),(6,'adit','question'),(13,'adit','suggestpending'),(14,'adit','visitedip'),(7,'admin','logentry'),(9,'auth','group'),(8,'auth','permission'),(10,'contenttypes','contenttype'),(11,'sessions','session');
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
INSERT INTO `django_session` VALUES ('2h9x54ws41fq2rbz9dnixzrzsebda3z0','YmUxZTc1ZDhhNDYzNzRlMjgwZDJkNzFlYmRhOGI2Nzc1MjkyYzM0NDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxNTlhZWMyOThjYTdlZWY5NDEzYjRhYWU4YTkxNzQ5NWYyMmNiMzg4In0=','2019-12-05 17:11:55.287000'),('2y54c0x5p97w3awe78ad5tk1w11a0602','Y2I2NTBmZDhmNjFiYTdlYjRmZTFjYjAyYmRlN2ExY2ZlYzU0NDgzODp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlNWY1NDRlYWUzMjdmYmVmN2RlYWQ4NWFhYmE3Yjg5ODg5NTg5ODg2In0=','2019-12-17 16:29:03.527343'),('4nfzdb160z6ag7jvjbam7d5rkc1dq2gw','OTI5Yzk1ZjIxYjRmNzFjNzI2NTY5NGU3NWZiNDJkYTA5YjIyYjUxNDp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5NzEwYjUxZTAxZjRjMjE2MjdkOWJlYmI5NDU1OTE4MzA1ZTk0NWM0In0=','2019-12-06 21:41:51.750310'),('9qcvoqyhub2blhtuewy7wb1591wuwadc','YWFjMjFkNzMxMWZmZGMyYjA2ZTA1YmY5NDY5MWQ1YmIyYmU0NzhhMjp7Il9hdXRoX3VzZXJfaWQiOiIxMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiMDBiN2JkNTg0OTcxOTBhNTAzMTcwZWFhNjU1YmFiNjA0YjdlYmJkNSJ9','2019-12-29 23:05:49.655084'),('a6gpc5uravq2bykywcn2qpmgpbqkjkpp','ZGQ3YjE1MDM2OGFmNjZmNWRmODBiNDI1NTljNjVjOWVhM2Q2NjIzMTp7Il9hdXRoX3VzZXJfaWQiOiIxNCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNmMzZTgxYTk4NWM1MjZlYzRlMjkwZjNkMGRlMTAzMDZhNTM1YmFkNyJ9','2019-12-29 23:09:12.787608'),('h0jh445f3shbp1owyf1c90lk0oth6q63','Y2I2NTBmZDhmNjFiYTdlYjRmZTFjYjAyYmRlN2ExY2ZlYzU0NDgzODp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlNWY1NDRlYWUzMjdmYmVmN2RlYWQ4NWFhYmE3Yjg5ODg5NTg5ODg2In0=','2019-12-07 19:54:30.175102'),('ixqqkp4xgmihpu7aw2z5uu28ekhvi97j','OTI5Yzk1ZjIxYjRmNzFjNzI2NTY5NGU3NWZiNDJkYTA5YjIyYjUxNDp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5NzEwYjUxZTAxZjRjMjE2MjdkOWJlYmI5NDU1OTE4MzA1ZTk0NWM0In0=','2019-12-06 21:40:40.087181'),('l5ows0bbvih3quj6pysnti9qb6g8lzrh','MjdkYWI4NzdmZGU3YTViOTYyZjE1ODJiYmNiYmY1MDIzYWRkMzFhZDp7Il9hdXRoX3VzZXJfaWQiOiI4IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3NWI2N2QwNTZhNWYxZWQ3NTFkZTUwYTFmOTA2ZmYwMWNkYjM5ZTQxIn0=','2019-12-29 21:18:16.085312'),('lqep990jx3pp0zhza0tzhjm2ejybdduz','Y2I2NTBmZDhmNjFiYTdlYjRmZTFjYjAyYmRlN2ExY2ZlYzU0NDgzODp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlNWY1NDRlYWUzMjdmYmVmN2RlYWQ4NWFhYmE3Yjg5ODg5NTg5ODg2In0=','2019-12-27 17:08:54.125506'),('w4phxklakhdn1y4a2pt30tca3ync2a5f','YWFjMjFkNzMxMWZmZGMyYjA2ZTA1YmY5NDY5MWQ1YmIyYmU0NzhhMjp7Il9hdXRoX3VzZXJfaWQiOiIxMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiMDBiN2JkNTg0OTcxOTBhNTAzMTcwZWFhNjU1YmFiNjA0YjdlYmJkNSJ9','2019-12-29 23:00:01.248076'),('yfb0ye8gryftp8mkd870idklhyn732rh','YzkwNTM5ZGQwZDYwNDEyNGM2ZGYxNzQ2NmVmOTAwMzZkMWMyOTJlNzp7Il9hdXRoX3VzZXJfaWQiOiIxMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNWI0NGMzNjIyMzYxOTlhZTEwMzY4MGJjNDBiNWE2YzRmYzE4MjBiMSJ9','2019-12-29 22:12:52.576802');
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

-- Dump completed on 2019-12-15 14:50:59
