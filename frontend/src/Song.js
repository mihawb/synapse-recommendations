
function Song(props) {

  return (
    <tr>
        <td>{props.index}</td>
        <td>{props.song.name}</td>
        <td>{props.song.artists[0].name}</td>
    </tr>
  )
}

export default Song