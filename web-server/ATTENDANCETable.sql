CREATE TABLE attendance_list (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    event_id INTEGER,
    FOREIGN KEY (event_id) REFERENCES events(id)
);