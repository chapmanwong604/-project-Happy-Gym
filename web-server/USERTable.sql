CREATE TABLE login_user (
    id SERIAL primary key
    ,username VARCHAR(255)
    ,password VARCHAR(255)
);

ALTER TABLE login_user ADD CONSTRAINT constraint_name UNIQUE(username);

ALTER TABLE login_user ADD COLUMN displayname VARCHAR(255);
ALTER TABLE login_user ADD COLUMN weight DECIMAL(3,2);
ALTER TABLE login_user ADD COLUMN height DECIMAL(3,2);
ALTER TABLE login_user ADD COLUMN gender CHAR(1);
ALTER TABLE login_user ADD COLUMN profilepic VARCHAR(255);
ALTER TABLE login_user ALTER COLUMN weight TYPE DECIMAL(5,2);
ALTER TABLE login_user ALTER COLUMN height TYPE DECIMAL(5,2);



/* Rename Table name */

ALTER TABLE login_user RENAME TO users;

ALTER TABLE users ALTER COLUMN weight,height,displayname set not null;