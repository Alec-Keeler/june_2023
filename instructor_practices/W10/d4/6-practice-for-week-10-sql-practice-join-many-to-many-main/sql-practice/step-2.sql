-- Step 2
-- Just like with one-to-many relationships, you can filter one table by any
-- associated data on a conected table.
-- Your code here

SELECT musicians.first_name, musicians.last_name FROM musician_instruments
JOIN instruments ON (musician_instruments.instrument_id = instruments.id)
JOIN musicians ON (musician_instruments.musician_id = musicians.id)
WHERE instruments.type = 'piano';