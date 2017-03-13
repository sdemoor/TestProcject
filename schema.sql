CREATE DATABASE tester;

USE chatterbox;


CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  useremail NOT NULL varchar(255),
  password NOT NULL
  );

CREATE TABLE rooms (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  roomname varchar(255)
  );

  /* Describe your table here.*/


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 * mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/

