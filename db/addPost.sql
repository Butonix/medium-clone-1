INSERT INTO posts (title, body, categories) VALUES ($1, $2, $3) RETURNING *;