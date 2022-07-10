CREATE TABLE gym_room (
    id SERIAL PRIMARY KEY,
    district_en VARCHAR(255),
    name_en VARCHAR(255),
    address_en text,
    size_en VARCHAR(255),
    longitude DECIMAL,
    latitude DECIMAL
);


-- //"District_en": "Central & Western"
-- //"Name_en": "Hong Kong Park Sports Centre",
-- //"Address_en": "29 Cotton Tree Drive, Central",
-- //"Size_en": "121m<sup>2</sup>",
-- //"Longitude": "114-9-33",
-- //"Latitude": "22-16-38"

-- //Google Map Format
-- //22.2772222,114.1585481
