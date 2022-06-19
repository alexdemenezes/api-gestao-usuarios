CREATE DATABASE USERS_MANAGER;

USE USERS_MANAGER;


CREATE TABLE users (
  id INT AUTO_iNCREMENT NOT NULL,
  username VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  role INT DEFAULT 0,
  verified INT DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE ps_recovery (
  id INT AUTO_INCREMENT NOT NULL,
  token VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  used INT DEFAULT 0,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);