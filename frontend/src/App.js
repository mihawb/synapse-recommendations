import { useState, useEffect } from 'react'
import axios from 'axios'
import config from './config'
import './App.css'
import LoggedOut from './LoggedOut'
import LoggedIn from './LoggedIn'



function App() {
  const [token, setToken] = useState('null')
  const [listType, setListType] = useState('tops') // tops, hist, recs
  const [listLoaded, setListLoaded] = useState(false)
  const [songsData, setSongsData] = useState([])

  const accAuthUrl = config.auth_endpoint + '?' +
    'client_id=' + config.client_id +
    '&redirect_uri=' + config.redirect_uri +
    '&response_type=' + config.res_type +
    '&scope=' + config.scopes.join('%20')

  const logout = () => {
    setToken('null')
    window.localStorage.removeItem('token')
  }

  const changeList = (list) => {
    setListLoaded(false)
    setListType(list)
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

  useEffect(() => {
    const getSpotifySongList = async () => {
      if (listType === 'recs') {
        const currentIDs = songsData.map(s => s.id).join(',')

        // tutaj tworzenie zapytania z currIDs concat + token 
        // odpytanie funkcji
        // dostajemy z powrotem tez IDs concat z przecinkami jak wyzej
        // rozdzielamy i dla kazdego ID odpytujemy api spotify
        // czyli nizej nie currIDs tyllko neuIDs

        const { data } = await axios.get('https://sr-calc.azurewebsites.net/api/CalcRecommendations', {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: { ids: currentIDs }
        })

        const res = []
        for (const ID of data) {
          const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${ID}`, {
          headers: { Authorization: `Bearer ${token}` }
          })
          res.push(data)
        }
        setSongsData(res)
        setListLoaded(true)
      }
      else if (listType === 'tops') {
        const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
          headers: { Authorization: `Bearer ${token}` },
          params: { limit: 50 }
        })
        setSongsData(data.items)
        setListLoaded(true)
      }
      else if (listType === 'hist') {
        const { data } = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
          headers: { Authorization: `Bearer ${token}` },
          params: { limit: 50 }
        })
        const res = data.items.map(i => i.track)
        setSongsData(res)
        setListLoaded(true)
      }
    }
    getSpotifySongList()            // eslint-disable-next-line
  }, [token, listType, listLoaded]) // songsData should NOT be included in dependency array

  return (
    <div className='App'>
      { token !== 'null' && token !== null ?       // jesli token inny niz null
        <LoggedIn 
          authkey={token} 
          logout={logout} 
          changeList={changeList} 
          listType={listType}
          loadedState={listLoaded}
          songs={songsData}
        />                                         // to znaczy ze zalogowany
        : <LoggedOut loginhref={accAuthUrl}/>      // wpp. niezalogowany - ekran startowy
      }
    </div>
  );
}

export default App
