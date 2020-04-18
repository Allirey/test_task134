create database if not exists Users;

use Users;

create table if not exists users
(
    id     serial primary key,
    name   varchar(64) not null,
    email  varchar(64) not null,
    status boolean     not null default false,
    phone  varchar(32),
    mobile varchar(32)
);

create table if not exists courses
(
    id   serial primary key,
    name varchar(64) not null,
    code varchar(16) not null
);

create table if not exists users_courses
(
    id        serial primary key,
    user_id   INTEGER not null references users (id) on UPDATE cascade on DELETE cascade,
    course_id INTEGER not null references courses (id) on UPDATE cascade on DELETE cascade
);

-- add default courses
INSERT INTO courses (id, name, code)
VALUES (1, 'Python-Base', 'P012345'),
       (2, 'Python-Database', 'P234567'),
       (3, 'HTML', 'H345678'),
       (4, 'Java-Base', 'J456789'),
       (5, 'JavaScript-Base', 'JS43210');

delimiter $$

-- Create user
CREATE PROCEDURE add_user(u_name VARCHAR(64), u_email VARCHAR(64), u_status BOOLEAN, u_phone VARCHAR(32),
                          u_mobile VARCHAR(32))
BEGIN
    INSERT INTO users(id, name, email, status, phone, mobile)
    VALUES (DEFAULT, u_name, u_email, u_status, u_phone, u_mobile);
END $$

-- Select user
CREATE PROCEDURE get_user(u_id INT)
BEGIN
    SELECT * FROM users WHERE users.id = u_id;
END $$

-- Update user
CREATE PROCEDURE update_user(u_id INTEGER, u_name VARCHAR(64), u_email VARCHAR(64), u_status BOOLEAN,
                             u_phone VARCHAR(32), u_mobile VARCHAR(32))
BEGIN
    UPDATE users
    SET name=u_name,
        email=u_email,
        status=u_status,
        phone=u_phone,
        mobile=u_mobile
    WHERE users.id = u_id;
END $$

-- Delete user
CREATE PROCEDURE delete_user(u_id INTEGER)
BEGIN
    DELETE FROM users WHERE users.id = u_id;
END $$

-- Select all users
CREATE PROCEDURE get_users()
BEGIN
    SELECT * FROM users ORDER BY users.id DESC;
END $$

-- Select all courses
CREATE PROCEDURE get_courses()
BEGIN
    SELECT * FROM courses;
END $$

-- Select user courses
CREATE PROCEDURE get_user_courses(u_id INTEGER)
BEGIN
    SELECT *
    FROM users_courses,
         courses
    WHERE users_courses.user_id = u_id
      AND users_courses.course_id = courses.id;
END $$

-- Delete user courses
CREATE PROCEDURE delete_user_courses(u_id INTEGER)
BEGIN
    DELETE FROM users_courses WHERE users_courses.id = u_id;
END $$

-- Add user course
CREATE PROCEDURE add_user_course(u_id INTEGER, c_id INTEGER)
BEGIN
    INSERT INTO users_courses (id, user_id, course_id) VALUES (DEFAULT, u_id, c_id);
END $$

DELIMITER ;
