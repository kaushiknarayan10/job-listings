import React from 'react';
import { Card, Button , CardColumns} from 'react-bootstrap';
import RenderPostings from './RenderPostings';
import './Styles.css';
class RenderCards extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cardClicked: false,
      jobSourceName : ''
    }
  }

  handleClick(sourceName){
    this.setState({
      cardClicked: true,
      jobSourceName: sourceName
    });
  }
  
  uncheckCard(){
    this.setState({
      cardClicked: false
    });
  }

  renderCard(job, index){
  return (
          <div onClick={ () => this.handleClick(job.sourceName)} key = {index}>
            <Card border="primary" key = {index} className="card-content">
              <Card.Img variant="top" src={job.sourceLogo} className="card-logo"/>
              <Card.Header>{job.sourceName}</Card.Header>
              <Card.Body className="card-body">
                Job Source Description :
                <Card.Subtitle className="mb-2 text-muted">{job.sourceDescription}</Card.Subtitle>
                <Card.Text className="card-text">Job Source Rating : {job.sourceRating}</Card.Text>
                <Card.Link className="card-link"href={job.sourceName}>Link to Job Posting</Card.Link>
              </Card.Body>
            </Card>
          </div>
        );
  }
  render(){
    const jobSources = this.props;
    const {cardClicked, jobSourceName} = this.state;
    return(
    <div>
      <Button variant="outline-dark"onClick={this.uncheckCard.bind(this)}>
        Show Listings
      </Button>
      { !cardClicked ? <CardColumns>{jobSources.source.map(this.renderCard.bind(this)) }</CardColumns>: null}
      {cardClicked ? <RenderPostings selectedJob = {jobSourceName} /> : null}
    </div>


    );
  }
}

export default RenderCards;