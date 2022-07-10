/* Insert these to create a new database and user in your PosgreSQL: */
CREATE USER happy_gym_user WITH PASSWORD '123456' SUPERUSER;
CREATE DATABASE happy_gym_db;

/* Login to your database "happy_gym_db" with password "123456": */
psql -U happy_gym_user -W -h localhost happy_gym_db;