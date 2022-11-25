import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
function Song(props) {
  return (
    <Col>
      <Card style={{ width: '18rem', height: "60vh" }} bg="dark" >
        <Card.Img variant="top dark" src={props.song.album.images[0].url}/>
        <Card.Body>
          <Card.Title>{props.song.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.song.artists[0].name}</Card.Subtitle>
          <Card.Link href={props.song.external_urls.spotify}>Spotify</Card.Link>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Song