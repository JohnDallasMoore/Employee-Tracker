INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Violet', 'Turner', 1) --add manager id later
       (2, 'Lionel', 'Cross', 2)
       (3, 'Phillipe', 'Hornesworth', 2)
       (4, 'Oakley', 'Cedar', 3)
       (5, 'Daphne', 'Delaney', 4)
       (6, 'Drew', 'Appleton', 4)
       (7, 'Scarlette', 'Andrews', 5)
       (8, 'Robin', 'Lueffner', 6)
       (9, 'Chet', 'Fallen', 6)
       (10, 'Urvin', 'Wright', 7)
       (11, 'Marques', 'Sloan', 8)
       (12, 'Wayne', 'Hammond', 8)



INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Lead', 100000, 1)
       (2, 'Salesperson', 75000, 1)
       (3, 'Account Manager', 160000, 2)
       (4, 'Accountant', 125000, 2)
       (5, 'Legal Team Lead', 250000, 3)
       (6, 'Lawyer', 190000, 3)
       (7, 'Lead Engineer', 150000, 4)
       (8, 'Software Engineer', 11100, 4) 



INSERT INTO department (id, name)
VALUES (1, 'Sales')
       (2, 'Finance')
       (3, 'Legal')
       (4, 'Engineering') 