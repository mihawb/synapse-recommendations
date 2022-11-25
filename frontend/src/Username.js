import { useState, useEffect } from 'react'
import axios from 'axios'

function Username(props) {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const fetchUsername = async () => {
      const { data } = await axios.get('https://api.spotify.com/v1/me/', {
        headers: {
          Authorization: `Bearer ${props.authkey}`
        }
      })
      setUsername(data.display_name)
    }
    fetchUsername()

  }, [props.authkey])

  return (
    <>{username}</>
  )
}

export default Username