import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const CustomCard = ({ campground }) => {
  // CHECK IF IMAGE EXISTS OTHERWISE RENDER DEFAULT IMAGE

  return (
    <CardGroup>
      <Card>
        <Card.Img variant="top" src={campground.images[0].url}/>
        <Card.Body>
          <Card.Title>{campground.title}</Card.Title>
          <Card.Text> {campground.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Updated by {campground.author.username} </small>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default CustomCard;