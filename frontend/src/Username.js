import { useState, useEffect } from 'react'
import axios from 'axios'
import './Username.css'

function Username(props) {
  const [username, setUsername] = useState('')
  const [userpic, setUserpic] = useState('https://thiscatdoesnotexist.com/')

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get('https://api.spotify.com/v1/me/', {
        headers: {
          Authorization: `Bearer ${props.authkey}`
        }
      })
      if (data.images[0].url) {
        setUserpic(data.images[0].url)
      }
      setUsername(data.display_name)
    }
    fetchUserData()

  }, [props.authkey])

  return (
    <div className='user-outer'>
      <img className='user-pfp' src={userpic} alt="User's profile pic"/>
      <h3 className='user-name'>{username}</h3>
    </div>
  )
}

export default Username