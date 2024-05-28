--  mysql --user="root" --database="mysql" --password="root" < "schema.sql"
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aadhaar_number VARCHAR(12) NOT NULL,
  name VARCHAR(255) NOT NULL,
  dob DATE NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  address TEXT,
  email VARCHAR(255),
  signature TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE IF NOT EXISTS candidates (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   aadhaar_number VARCHAR(12) NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   dob DATE NOT NULL,
--   phone_number VARCHAR(15) NOT NULL,
--   party VARCHAR(255) NOT NULL,
--   address TEXT,
--   email VARCHAR(255),
--   signature TEXT,
--     state varchar(255),
--     education TEXT,
--     background TEXT,
--     experience TEXT,

--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE IF NOT EXISTS candidates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aadhaar_number VARCHAR(12) NOT NULL,
  name VARCHAR(255) NOT NULL,
  dob DATE NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  party VARCHAR(255) NOT NULL,
  address TEXT,
  email VARCHAR(255),
  signature TEXT,
  state VARCHAR(255),
  education TEXT,
  background TEXT,
  experience TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
