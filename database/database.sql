CREATE DATABASE IF NOT EXISTS task_management_system;
USE task_management_system;

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in_progress', 'completed') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);

-- Demo hashes are placeholders. Replace them with real bcrypt hashes if you want seeded accounts to be login-ready.
INSERT INTO users (name, email, password) VALUES
('Demo User', 'demo@example.com', '$2b$10$DemoHashReplaceBeforeUseInProduction1234567890abcd'),
('Project Admin', 'admin@example.com', '$2b$10$AdminHashReplaceBeforeUseInProduction1234567890abcd');

INSERT INTO tasks (user_id, title, description, status) VALUES
(1, 'Set up task workflow', 'Complete the initial onboarding and configure the application.', 'completed'),
(1, 'Review dashboard metrics', 'Check task completion trends and workload distribution.', 'in_progress'),
(2, 'Prepare release notes', 'Draft the first release note for the task management platform.', 'pending');