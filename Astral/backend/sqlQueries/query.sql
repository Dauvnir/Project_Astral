-- List of users with books and chapter
SELECT u.username, m.title, um.user_chapter
FROM UserManhwa um
JOIN Users u ON um.user_id = u.user_id
JOIN Manhwa m ON um.manhwa_id = m.manhwa_id;
--User roles relation
SELECT ur.role_id
FROM user_roles ur
 WHERE ur.user_id = $1;
 -- User book table
 CREATE TABLE UserManhwa (
    user_id INT,
    manhwa_id INT,
    user_chapter INT,
    PRIMARY KEY (user_id, manhwa_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (manhwa_id) REFERENCES manhwa(manhwa_id)
);
--Manhwa table
CREATE TABLE manhwa (
    id SERIAL PRIMARY KEY,manhwa_id serial unique, 
    title VARCHAR(255) NOT NULL,
    chapter VARCHAR(255),
    scanlation_site VARCHAR(255) NOT NULL,
    websiteurl VARCHAR(255) NOT NULL,
    srcimg TEXT NOT NULL
);
--User roles table
CREATE TABLE user_roles (
    user_id INT REFERENCES users(user_id),
    role_id INT REFERENCES roles(role_id),
    PRIMARY KEY (user_id, role_id)
);
-- User table 
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--Check if user exists 
SELECT 1
        FROM UserManhwa um
        JOIN Users u ON um.user_id = u.user_id
        WHERE u.username = $1
        LIMIT 1;

--Insert into db library 
Insert into UserManhwa (user_id, manhwa_id, user_chapter) values (7, 1 ,1);