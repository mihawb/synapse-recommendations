import { useEffect, useState } from 'react'
import axios from 'axios'
import Song from './Song'
import Row from 'react-bootstrap/Row';

function SongsList(props) {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const fetchSongs = async () => {
      const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: `Bearer ${props.authkey}`
        },
        params: {
            limit: 50
        }
      })
      setSongs(data.items.map( (song, index) => <Song song={song} index={index+1} key={index} />))
    }
    fetchSongs()
  }, [props.authkey])

  let generateRows = (n) => {
    let i = 0;
    let rows = [];
    while(i<songs.length) {
      rows.push(songs.slice(i,i+n))
      i = i + n
    }
    return rows.map( row => <Row className="g-4 mb-4">{row}</Row>)
  }

  return (
    <>{generateRows(4)}</>
  )
}

export default SongsList