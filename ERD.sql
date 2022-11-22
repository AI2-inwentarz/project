CREATE TABLE `Users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `login` varchar(60),
  `password` varchar(128),
  `email` varchar(120),
  `firstname` varchar(60),
  `surname` varchar(60),
  `role` int,
  `job_title` varchar(200),
  `phone` varchar(12)
);

CREATE TABLE `Departament` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(200),
  `shortname` varchar(100),
  `description` text,
  `shortdescription` varchar(500),
  `adress` varchar(120),
  `affiliation` varchar(200),
  `owner_id` int
);

CREATE TABLE `Room` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100),
  `longname` varchar(200),
  `description` text,
  `tag` varchar(80),
  `department_id` int
);

CREATE TABLE `Item` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(200),
  `description` text,
  `inventory_tag` varchar(200),
  `category_id` int,
  `room_id` int,
  `department_id` int
);

CREATE TABLE `ItemCategory` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(200),
  `description` varchar(200),
  `inventory_tag` varchar(200),
  `department_id` int
);

CREATE TABLE `UserDepartmentRole` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `role` int,
  `user_id` int,
  `department_id` int
);

ALTER TABLE `Departament` ADD FOREIGN KEY (`owner_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Room` ADD FOREIGN KEY (`department_id`) REFERENCES `Departament` (`id`);

ALTER TABLE `Item` ADD FOREIGN KEY (`category_id`) REFERENCES `ItemCategory` (`id`);

ALTER TABLE `Item` ADD FOREIGN KEY (`room_id`) REFERENCES `Room` (`id`);

ALTER TABLE `Item` ADD FOREIGN KEY (`department_id`) REFERENCES `Departament` (`id`);

ALTER TABLE `ItemCategory` ADD FOREIGN KEY (`department_id`) REFERENCES `Departament` (`id`);

ALTER TABLE `UserDepartmentRole` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `UserDepartmentRole` ADD FOREIGN KEY (`department_id`) REFERENCES `Departament` (`id`);
