SELECT * FROM puppies WHERE id = 9;
DELETE FROM puppies WHERE id = 9;

DELETE FROM puppies
WHERE microchipped = false;

--What happens if we try to delete puppy #9 a second time?