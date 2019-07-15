-- Up
CREATE TABLE Projects (
    id       INTEGER PRIMARY KEY,
    name     TEXT    NOT NULL,
    duration INTEGER NOT NULL DEFAULT 0,
    started  DATE    DEFAULT NULL
);
INSERT INTO Projects (id, name, duration) VALUES (1, 'test', 2045);
INSERT INTO Projects (id, name, duration) VALUES (2, 'test2', 0);

-- Down
DROP TABLE Projects;
