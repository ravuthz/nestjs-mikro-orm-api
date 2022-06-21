-- list users
SELECT id, email, username FROM users ORDER BY id;

-- list roles
SELECT id, name, note FROM roles  ORDER BY id;

-- list permissions
SELECT id, name, note FROM permissions  ORDER BY id;

SELECT * FROM users_roles;

SELECT * FROM roles_permissions;