USE [synapse-recommendations-DB] 
GO

IF NOT EXISTS (
	SELECT 1 FROM sysobjects o 
		WHERE o.[name]= N'SPOTIFY_DATA' AND (OBJECTPROPERTY(o.[ID],N'IsUserTable')=1) 
)
BEGIN
	CREATE TABLE SPOTIFY_DATA ( 
		track_id INT NOT NULL IDENTITY CONSTRAINT PK_SONG PRIMARY KEY,
		artists NVARCHAR(600) NOT NULL,
		album_name NVARCHAR(300) NOT NULL,
		track_name NVARCHAR(600) NOT NULL,
		popularity INT NOT NULL,
		duration_ms INT NOT NULL,
		explicitlang BIT NOT NULL,
		danceability FLOAT NOT NULL,
		energy FLOAT NOT NULL,
		musickey INT NOT NULL,
		loudness FLOAT NOT NULL,
		mode BIT NOT NULL,
		speechiness FLOAT NOT NULL,
		acousticness FLOAT NOT NULL,
		instrumentalness FLOAT NOT NULL,
		liveness FLOAT NOT NULL,
		valence FLOAT NOT NULL,
		tempo FLOAT NOT NULL,
		time_signature INT NOT NULL,
		track_genere NVARCHAR(100) NOT NULL
	)
END
GO
