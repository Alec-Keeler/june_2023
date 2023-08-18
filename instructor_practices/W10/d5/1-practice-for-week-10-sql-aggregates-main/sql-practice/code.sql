-- Q1
SELECT COUNT(*) FROM cats;

-- Q2
SELECT name, MIN(birth_year) AS oldest_cat FROM cats;

SELECT name, MAX(birth_year) AS youngest_cat FROM cats;

-- Q3
SELECT COUNT(*), cat_id FROM toys
GROUP BY cat_id;

-- Q4
SELECT COUNT(*), cat_id FROM toys
GROUP BY cat_id
HAVING COUNT(*) > 1;

 
SELECT COUNT(*), cats.name FROM toys
JOIN cats ON (cat_id = cats.id)
   GROUP BY cat_id
   HAVING COUNT(*) > 1;