/* Create Table Sports Log */
CREATE TABLE youtube (
    id SERIAL PRIMARY KEY,
    sports_type VARCHAR(255) NOT NULL,
    video_link text NOT NULL
);

/* INSERT youtube videos */
INSERT INTO youtube (sports_type, video_link) VALUES ('Yoga','tbz14K0lOZs');
INSERT INTO youtube (sports_type, video_link) VALUES ('Dance','8DZktowZo_k');
INSERT INTO youtube (sports_type, video_link) VALUES ('HIIT','LwFHrTrBnu0');
INSERT INTO youtube (sports_type, video_link) VALUES ('Skipping','1BZM2Vre5oc');
INSERT INTO youtube (sports_type, video_link) VALUES ('Body Stretching','ih072euhEFw');
INSERT INTO youtube (sports_type, video_link) VALUES ('Boxing','jCTEVKRTuS8');