
import logo from './pathrise.png'
import React from 'react';
import RenderCards from './RenderCards'
import { Button } from 'react-bootstrap';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      csvFileLoaded: false,
      jobSourceSelected: '',
      datafetched: false,
      jobPostings : [],
      jobSources : []
    }
  }
  fetchJobSource(){
    fetch(`/jobsource`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then((response) => response.json())
    .then(data => data.map(jobs => (
      {
        sourceName : `${jobs.name}`,
        sourceRating: `${jobs.rating}`,
        sourceDomain: `${jobs.root_domain}`,
        sourceLogo: `${jobs.logo_file}`,
        sourceDescription: `${jobs.description}`,
      }
    )))
    .then(sources => this.setState(
      {
        datafetched : true,
        jobSources : sources
    }))
    .catch(err => alert(err))
  }

  loadCSV(){
    fetch(`/addjobs`,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'text/json'
      }
    })
    .then((response) => console.log(response))
    .catch(err => console.log(err))
  }

  render(){
    const{datafetched, jobSources} = this.state;
    return(
      <div className="App">
        <header>
          <h2>Pathrise Job Postings</h2>
        </header>
        <div className="App">
          <Button variant="outline-dark" onClick={this.loadCSV}>
            Load CSV File to Database
          </Button>
        </div>
        <Button variant="outline-dark" onClick={this.fetchJobSource.bind(this)}>
            Show Job Source
        </Button>
        <div className="App">
          {datafetched ? <RenderCards source = {jobSources}/>: null}
        </div>
      </div>
    );
  };

}

export default App;
