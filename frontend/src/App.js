import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios'
import config from './config'
import './App.css';
import Username from './Username';
import SongsList from './SongsList';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';


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
    let token = window.localStorage.getItem('token')


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
      <Nav className='mt-4 mb-5 align-self-lg-start' fill bg="dark" style= {{width: "100%"}}>
        <Nav.Item className='d-flex justify-content-start ms-4 col-3' >Spotify Recommendations</Nav.Item>
        <Nav.Item className='d-flex justify-content-start col-7'>
        { token !==  'null' && token !== null ?<Username authkey={token} /> : <></>}
        </Nav.Item>
        <Nav.Item className='d-flex justify-content-end me-5 col-1'>
          {token === 'null' || token === null ?
           <Button variant="primary" href={accAuthUrl} >Log in</Button> :
            <Button variant="primary" onClick={logout}>Logout</Button>}
        </Nav.Item>
    </Nav>

        { token !==  'null' && token !== null ? <SongsList authkey={token}/> : <></>}
      </header>
    </div>
  );
}

export default App;
