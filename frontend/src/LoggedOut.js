import './LoggedOut.css'
const LoggedOut = (props) => {
	return (
		<div className='logged-out-outer'>
			<div className='logged-out-inner'>
				<h1>Spotify Recommendations</h1>
				<p>Find new music based on your listening history</p>
				<a href={props.loginhref}>Log in with Spotify</a>
			</div>
		
		</div>
	)
}

export default LoggedOut