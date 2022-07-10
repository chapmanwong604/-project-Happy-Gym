/* Create Table Sports Log */
CREATE TABLE sports_log(
    id SERIAL PRIMARY KEY,
    timer VARCHAR(255) not null,
    date_create DATE ,
    sports_type VARCHAR(255) not null,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    deleted INTEGER
);

/* ALTER TABLE sports_log ALTER COLUMN timer INTEGER; */
ALTER TABLE users ALTER COLUMN weight,height,displayname set not null;

/* Alter the data type of column timer to INTEGER: */
ALTER TABLE sports_log ALTER COLUMN timer TYPE INTEGER USING timer::integer;
