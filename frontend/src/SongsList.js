import { useEffect, useState } from 'react'
import axios from 'axios'
import Song from './Song'
import Table from 'react-bootstrap/Table';

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

  return (

    <Table className='mt-5' bordered striped variant="dark" responsive >
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Artist</th>
            </tr>
        </thead>
        <tbody>
            {songs}
        </tbody>
    </Table>

  )
}

export default SongsList