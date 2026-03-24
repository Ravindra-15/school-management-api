
-- School Management Database Setup
-- Run this in phpMyAdmin > SQL tab


-- 1. Create the database
CREATE DATABASE IF NOT EXISTS school_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE school_db;

-- 2. Create the schools table
CREATE TABLE IF NOT EXISTS schools (
  id        INT           NOT NULL AUTO_INCREMENT,
  name      VARCHAR(255)  NOT NULL,
  address   VARCHAR(500)  NOT NULL,
  latitude  FLOAT         NOT NULL,
  longitude FLOAT         NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. (Optional) Seed sample data for testing
INSERT INTO schools (name, address, latitude, longitude) VALUES
  ('Delhi Public School',      'Mathura Road, New Delhi, 110003',    28.5562, 77.2410),
  ('Kendriya Vidyalaya No. 1', 'Sector 8, R.K. Puram, New Delhi',   28.5672, 77.1881),
  ('Ryan International School','Mayur Vihar Phase 1, Delhi, 110091', 28.6072, 77.2968),
  ('Modern School',            'Barakhamba Road, New Delhi, 110001', 28.6289, 77.2230);
