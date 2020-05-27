-- drop if previous database exists
DROP DATABASE IF EXISTS employeeTracker_db;
-- create db
CREATE DATABASE employeeTracker_db;
-- create table for department
USE employeeTracker_db;
CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL
);
-- using this db create role table
USE employeeTracker_db;
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
-- create employee table
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
-- starting values for department
USE employeeTracker_db;
INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Legal'), ('Finance'), ('Administrative');
-- starting values for roles
USE employeeTracker_db;
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1), ('Salesperson', 80000, 1), ('Lead Engineer', 150000, 2), ('Software Engineer', 120000, 2), ('Accountant', 125000, 4), ('Legal Team Lead', 250000, 3), ('Lawyer', 190000, 3), ('Administrative Assistant', 45000, 5);
-- starting values for managers 
USE employeeTracker_db;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Brent', 'Black', 1, NULL), ('Amanda', 'Bloom', 3, NULL), ('Misty', 'Love', 5, NULL), ('Mike', 'Smith', 6, NULL);
-- starting values for employees 
USE employeeTracker_db;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nick', 'Hill', 2, 1), ('Matt', 'Shepherd', 2, 1), ('Isabel', 'Green', 4, 2), ('Susan', 'Dupster', 4, 2), ('Louie', 'Bernard', 8, 3), ('Indigo', 'Morris', 8, 3), ('Tyler', 'Doe', 7, 4);
-- view all employees 
USE employeeTracker_db;
SELECT employee.first_name AS "first name", employee.last_name AS "last name", department.name AS department, role.title, role.salary, CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id;
-- view all employees based on manager 
USE employeeTracker_db;
SELECT employee.first_name AS "first name", employee.last_name AS "last name", CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id;
-- add new employee
INSERT INTO employee SET ?,
    {
        first_name: `${first_name}`,
        last_name: `${last_name}`,
        role_id: `${employeeRole}`,
        manager_id: `${employeeManager}`
    },
-- grab new employees
USE employeeTracker_db;
SELECT * FROM employeetracker_db.employee;
-- grab new departments
USE employeeTracker_db;
SELECT * FROM employeetracker_db.department;
