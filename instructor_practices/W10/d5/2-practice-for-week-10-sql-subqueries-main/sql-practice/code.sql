-- Q1
SELECT * FROM cats
JOIN toys ON (toys.cat_id = cats.id)
WHERE cats.name = 'Garfield';


SELECT * FROM toys
WHERE cat_id = (
	SELECT id FROM cats
	WHERE name = 'Garfield'
);

-- Q2

INSERT INTO toys (name, cat_id)
VALUES
('Pepperoni', (
	SELECT id FROM cats
	WHERE name = 'Garfield'
));