-- list users
SELECT id, email, username FROM users;

-- list roles
SELECT id, name, note FROM roles;

-- list permissions
SELECT id, name, note FROM permissions;

SELECT * FROM users_roles;

SELECT * FROM roles_permissions;