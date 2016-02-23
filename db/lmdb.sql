/*
Navicat MySQL Data Transfer

Source Server         : lmdb
Source Server Version : 50517
Source Host           : localhost:3306
Source Database       : lmdb

Target Server Type    : MYSQL
Target Server Version : 50517
File Encoding         : 65001

Date: 2016-02-18 13:08:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tb_user`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` varchar(40) DEFAULT NULL COMMENT '主键ID',
  `login_name` varchar(50) DEFAULT NULL COMMENT '用户名，登录使用',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户姓名',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `sex` int(1) DEFAULT '1' COMMENT '性别，男：1，女：2',
  `avatar` varchar(100) DEFAULT NULL COMMENT '头像，保存图片地址',
  `profile` varchar(500) DEFAULT NULL COMMENT '个人简介'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('5a6ad57f23514e9aa075d25870d5f013', 'lmroot', '风雨共济', '7ce386f00f5e35b84e310f69e9fb8ff00f8fe6f2', '1', null, '风雨共济，笑看人生');

-- ----------------------------
-- Table structure for `tb_whisper`
-- ----------------------------
DROP TABLE IF EXISTS `tb_whisper`;
CREATE TABLE `tb_whisper` (
  `id` varchar(40) DEFAULT NULL COMMENT '主键',
  `content` longtext COMMENT '内容',
  `ip` varchar(20) DEFAULT NULL COMMENT '用户ip',
  `create_time` decimal(15,0) DEFAULT NULL COMMENT '创建时间',
  `is_hidden` int(1) DEFAULT NULL COMMENT '是否隐藏，1：是，0：否',
  `user_id` varchar(40) DEFAULT NULL COMMENT '发布人ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_whisper
-- ----------------------------
INSERT INTO `tb_whisper` VALUES ('d7eb12bc64bc40d6b1048cc23ee579b7', '测试', '124.65.133.38', '1455761117234', '0', '5a6ad57f23514e9aa075d25870d5f013');
