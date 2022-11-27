import './SongList.css'
import Song from './Song'
import Loading from './Loading'

// listType={props.listType}
// loadedState={props.loadedState}
// songs={props.songs}

const SongList = (props) => {
	return (
		<div className='song-list-outer'>
            <h2 className='song-list-title'>
			{props.listType === 'tops' ?
                'Twoje najczęściej odtwarzane utwory'
                : props.listType === 'hist' ?
                    'Twoje ostatnio odtwarzane utwory'
                    : 'Nasze rekomendacje'
            }
            </h2>

            <div className='song-list-inner'>
                {props.loadedState ?
                    props.songs.map(s => <Song data={s}/>)
                    : <Loading/>
                }
                
            </div>
		</div>
	)
}

export default SongList