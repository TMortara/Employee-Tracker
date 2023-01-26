INSERT INTO department (name)
VALUES ("Parks and Recreation"),
       ("City Planning"),
       ("Health and Human Services"),
       ("Sanitation"),
       ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("City Planner", 80000, 2),
       ("Parks Director", 85000, 1),
       ("Health Director", 90000, 3),
       ("Sewage Director", 60000, 4),
       ("Nurse", 75000, 3),
       ("Office Manager", 65000, 1),
       ("Deputy Director", 77000, 1),
       ("Shoe-Shiner", 15000, 5),
       ("Intern", 5000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Andy", "Dwyer", 8),
       ("Leslie", "Knope", 7),
       ("Dennis", "Cooper", 3),
       ("Ron", "Swanson", 2),
       ("Ann", "Perkins", 5),
       ("Mark", "Brendanawicz", 1),
       ("April", "Ludgate", 9),
       ("Sewage", "Joe", 4),
       ("Donna", "Meagle", 6);

UPDATE employee SET manager_id = 3 WHERE id = 5;
UPDATE employee SET manager_id = 4 WHERE id IN (1, 2, 7, 9);



