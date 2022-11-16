import { useState, useEffect } from 'react'
// import axios from 'axios'
import config from './config'
import './App.css';
import Username from './Username';

function App() {
  const [token, setToken] = useState('null')

  const accAuthUrl = config.auth_endpoint + '?' +
    'client_id=' + config.client_id +
    '&redirect_uri=' + config.redirect_uri +
    '&response_type=' + config.res_type +
    '&scope=' + config.scopes.join('%20')

  const logout = () => {
    setToken('null')
    window.localStorage.removeItem('token')
  }

  useEffect(() => {
    const hash = window.location.hash
    console.log(hash !== '')
    let token = window.localStorage.getItem('token')

    // token w location => token z location
    // token nie w location & token w local => token z local

    if (hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
    }

    window.location.hash = ''
    window.localStorage.setItem('token', token)

    setToken(token)

  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Spotify React</h1>

        {token !==  'null' ? <Username authkey={token} /> : <></>}

        {token === 'null' ?
          <a href={accAuthUrl}>Login to Spotify</a>
          : <button onClick={logout}>Logout</button>
        }

      </header>
    </div>
  );
}

export default App;
