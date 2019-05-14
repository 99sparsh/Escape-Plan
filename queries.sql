create database spotlight;

use spotlight;

-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `users`

CREATE TABLE `users`
(
 `id`         int PRIMARY KEY NOT NULL AUTO_INCREMENT ,
 `name`       varchar(255) NOT NULL ,
 `username`   varchar(255) NOT NULL ,
 `email`      varchar(255) NOT NULL ,
 `password`   varchar(255) NOT NULL ,
 `access`     int NOT NULL DEFAULT 10 ,
 `current`    int NOT NULL DEFAULT 1 ,
 `regno`      varchar(20) NOT NULL ,
 `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `phone`      varchar(20)
);




CREATE TABLE `questions`
(
 `qno`        int NOT NULL ,
 `body`       varchar(500) NOT NULL ,
 `answer`     varchar(500) NOT NULL ,
 `hint`       varchar(500) ,
 `visibility` tinyint NOT NULL DEFAULT 0 ,
PRIMARY KEY (`qno`)
);






-- ************************************** `submissions`

CREATE TABLE `submissions`
(
 `id`         int NOT NULL AUTO_INCREMENT ,
 `verdict`    varchar(10) NOT NULL ,
 `uid`        int NOT NULL ,
 `qno`        int NOT NULL ,
 `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
PRIMARY KEY (`id`),
KEY `fkIdx_26` (`uid`),
CONSTRAINT `FK_26` FOREIGN KEY `fkIdx_26` (`uid`) REFERENCES `users` (`id`),
KEY `fkIdx_29` (`qno`),
CONSTRAINT `FK_29` FOREIGN KEY `fkIdx_29` (`qno`) REFERENCES `questions` (`qno`)
);





