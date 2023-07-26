CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255)
);

CREATE TABLE todos(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  completed BOOLEAN DEFAULT false,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shared_todos(
  id INT AUTO_INCREMENT PRIMARY KEY, 
  todo_id INT REFERENCES todos(id) ON DELETE CASCADE,-- to know which "todo" is being shared
  user_id INT REFERENCES users(id) ON DELETE CASCADE,--  to know who is that sharing it
  shared_with_id INT REFERENCES users(id) ON DELETE CASCADE --to know whit who the todo is shared 
);

--Insert two users into the users table

INSERT INTO users(name, email, password) VALUES("May","user1@example.com", "password1");
INSERT INTO users(name, email, password) VALUES("Ale","user2@example.com","password2");

--Selección de usuarios por su id
SELECT * FROM users WHERE id=1;

-- completado (verdadero) = 0 --- incompleto (falso) = 1
--Insert todos into the todos table, associated with the first user

INSERT INTO todos (title, user_id) 
VALUES 
("🏃‍♀️ Go for a morning run 🌄", 1),
("💻 Work on project presentation 💼", 1),
("🛒 Go grocery shopping 🛍️", 1),
("📚 Read 30 pages of book 📖", 1),
("🚴‍♂️ Ride bike to the park 🌳", 1),
("🍲 Cook dinner for family 🍴", 1),
("💆‍♂️ Practice yoga 🧘‍♂️", 1),
("🎧 Listen to a podcast 🎤", 1),
("🧹 Clean the house 🧼", 1),
("🛌 Get 8 hours of sleep 💤", 1);

--share todo 1 of user 1 whit user 2

INSERT INTO shared_todos(todo_id,user_id,shared_with_id)
VALUES (1,1,2);

-- Get todos including shared todos by id

SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id=[user_id] OR shared_todos.shared_with_id=[user_id];--show the "todo" that created the user_id and the "todo" that was shared whit it


-- Get todos of user 2, using a join
-- Get the shared todos for user 2
SELECT todos.* -- Select all columns from the todos table
FROM todos 
JOIN shared_todos ON todos.id = shared_todos.todo_id -- Join with the shared_todos table using the todo_id
WHERE shared_todos.user_id = 2; -- Filter only the shared todos assigned to user 2