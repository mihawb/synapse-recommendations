import './LoggedIn.css'
import Username from './Username'
import SongList from './SongList'

// authkey={token} 
// logout={logout} 
// changeList={changeList} 
// loadedState={listLoaded}
// songs={songsData}

const LoggedIn = (props) => {
	return (
		<div className='logged-in-outer'>

			<div className='logo-n-login'>
				<h1 className='logo'>Spotify Recommendations</h1>
				<Username authkey={props.authkey}/>
			</div>

			<div className='logged-in-inner'>
				<div className='navbar'>
					<div className='spacer'></div>
					<button className='option-btn' onClick={() => props.changeList('tops')}>Pokaż top utwory</button>
					<button className='option-btn' onClick={() => props.changeList('hist')}>Pokaż historię odtwarzania</button>
					<button className='option-btn' onClick={() => props.changeList('recs')}>Generuj rekomendacje</button>
					<button className='option-btn' onClick={props.logout}>Wyloguj</button>
				</div>

				{/* <h1>{props.loadedState ? props.songs[0].name : 'ładowanie'}</h1> */}

				<SongList 
					listType={props.listType}
					loadedState={props.loadedState}
					songs={props.songs}
				/>

			</div>

		</div>

	)
}

export default LoggedIn