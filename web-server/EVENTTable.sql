CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR (255) NOT NULL,
    event_date DATE,
    event_time TIME,
    event_max INTEGER,
    event_location VARCHAR (255) NOT NULL,
    create_user_id INTEGER NOT NULL,
    FOREIGN KEY (create_user_id) REFERENCES users(id)
);