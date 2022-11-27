import './Song.css'

// data={s} 

const Song = (props) => {
	return (
		<div className='song-outer'>
			<img className='album-cover' src={props.data.album.images[0].url} alt='album cover'/>
			<div className='song-info'>
				<p className='primary-info'>{props.data.name}</p>
				<p className='secondary-info'>{props.data.artists.map(a => a.name).join(', ')} • {props.data.album.name}</p>
			</div>
		</div>
	)
}

export default Song