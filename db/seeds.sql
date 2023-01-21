INSERT INTO department (name)
VALUES ("Parks and Recreation"),
       ("City Planning"),
       ("Health and Human Services"),
       ("Sanitation"),
       ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("City Planner", 80000.00, 2),
       ("Parks Director", 85000.00, 1),
       ("Health Director", 90000.00, 3),
       ("Sewage Director", 60000.00, 4),
       ("Nurse", 75000.00, 3),
       ("Office Manager", 65000.00, 1),
       ("Deputy Director", 77000.00, 1),
       ("Shoe-Shiner", 15000.00, 5),
       ("Intern", 5000.00, 1);

INSERT INTO role (first_name, last_name, role_id)
VALUES ("Andy", "Dwyer", 8),
       ("Leslie", "Knope", 7),
       ("Dennis", "Cooper", 3),
       ("Ron", "Swanson", 2),
       ("Ann", "Perkins", 5),
       ("Mark", "Brendanawicz", 1),
       ("April", "Ludgate", 9),
       ("Sewage", "Joe", 4),
       ("Donna", "Meagle", 6)
