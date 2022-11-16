module.exports = {
	auth_endpoint: 'https://accounts.spotify.com/authorize',
	client_id: 'b912b0b999c7436c8b3b302dc8f66d1a',
	redirect_uri: 'http://192.168.0.13:3000/',
	res_type: 'token',
	scopes: [
		'user-read-recently-played',
		'playlist-read-private',
		'playlist-modify-private',
		'playlist-modify-private',
		'user-top-read'
	]
}