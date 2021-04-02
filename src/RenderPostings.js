import React from 'react';
import RenderTable from './RenderTable';
class RenderPostings extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            postingFetched: false,
            selectedPostings : []
        }
    }
    fetchJobPostings (source) {
        fetch(`/jobpostings?source=${source.selectedJob}`, {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        })
        .then((response) => response.json())
        .then(data => data.map(jobs => (
            {
                id: `${jobs.ID}`,
                title: `${jobs.JOB_TITLE}`,
                company : `${jobs.COMPANY_NAME}`,
                url : `${jobs.JOB_URL}`,
                source : `${jobs.JOB_SOURCE}`
            }
        )))
        .then(alljobs => this.setState(
            {
                postingFetched: true,
                selectedPostings : alljobs
            }
        ))
        .catch(err => alert(err))
      }
    //   componentWillUnmount() {
    //     this.setState({
    //         postingsFetched: false
    //     })
    //   }
    render(){
        const selectedCard = this.props;
        const {postingFetched, selectedPostings} = this.state;
        return(
        <div>
            {!postingFetched ? this.fetchJobPostings(selectedCard) : null}
            {postingFetched? <RenderTable selectedPostings = {selectedPostings} /> : null}
        </div>
        );
    };
}
export default RenderPostings;