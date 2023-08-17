SELECT bands.name, albums.title FROM bands
JOIN albums ON (bands.id = albums.band_id);

SELECT bands.name, albums.title FROM albums
JOIN bands ON (albums.band_id = bands.id);

SELECT bands.name FROM albums
  JOIN bands ON (albums.band_id = bands.id)
  WHERE albums.num_sold < 20000;