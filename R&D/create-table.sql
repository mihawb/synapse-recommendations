USE [synapse-recommendations-DB] 
GO

IF NOT EXISTS (
	SELECT 1 FROM sysobjects o 
		WHERE o.[name]= N'SONGS_INFO' AND (OBJECTPROPERTY(o.[ID],N'IsUserTable')=1) 
)
BEGIN
	CREATE TABLE dbo.SONGS_INFO ( 
		track_id NCHAR(22) NOT NULL CONSTRAINT PK_SONG_ID PRIMARY KEY,
		artists NVARCHAR(200) NOT NULL,
		album_name NVARCHAR(500) NOT NULL,
		track_name NVARCHAR(1000) NOT NULL,
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
		track_genre NVARCHAR(50) NOT NULL
	)
END
GO
