USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sale Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Maddie", "Ludwig", 8, 5),
       ("Will", "Rainey", 2, NULL),
       ("Skillet", "McKnight", 1, 1),
       ("Baker", "McKnight", 3, 7),
       ("Rocky", "McKnight", 7, NULL),
       ("Charles", "Cone", 4, 1),
       ("Patrick", "Ingram", 1, 2),
       ("Hayden", "Noel", 5, NULL),
       ("Joe", "Don", 6, 4),
       ("Javi", "Derek", 7, NULL);
