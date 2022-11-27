import './LoggedIn.css'
import Username from './Username'

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
					<button onClick={() => props.changeList('tops')}>Pokaż top utwory</button>
					<button onClick={() => props.changeList('hist')}>Pokaż historię odtwarzania</button>
					<button onClick={() => props.changeList('recs')}>Generuj rekomendacje</button>
					<button onClick={props.logout}>Wyloguj</button>
				</div>

				<h1>{props.loadedState ? props.songs[0].name : 'ładowanie'}</h1>

			</div>

		</div>

	)
}

export default LoggedIn