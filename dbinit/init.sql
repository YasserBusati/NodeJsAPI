CREATE DATABASE IF NOT EXISTS patientsdb;
USE patirntsdb;

DROP TABLE IF EXISTS patients;

CREATE TABLE patients(
	id BIGINT UNSIGED NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(255) DEFAULT NULL,

	email VARCHAR(255) DEFAULT NULL,
	phone VARCHAR(255) DEFAULT NULL,
	address VARCHAR(255) DEFAULT NULL,
	diagnosis VARCHAR(255) DEFAULT NULL,
	image_url VARCHAR(255) DEFAULT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	CONSTRAINT UQ_Patirnts_Email UNIQUE (email)
);
