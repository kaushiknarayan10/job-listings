import React from 'react';
import { Table } from 'react-bootstrap';
import './Styles.css';
class RenderTable extends React.Component {

    renderTable(posting, index){
        return(
            <tr key={index}>
                <td>{posting.id}</td>
                <td>{posting.title}</td>
                <td>{posting.company}</td>
                <td><a href = {posting.url}>{posting.url}</a></td>
            </tr>
    );
}
    render(){
        const {selectedPostings} = this.props;
        return(
            <div>
                <Table bordered responsive className="table-content" >
                    <thead className="table-head">
                        <tr>
                            <th>ID</th>
                            <th>Job Title</th>
                            <th>Company Name</th>
                            <th>Job URL</th>
                        </tr>
                    </thead>
                    <tbody>
                    {selectedPostings.map(this.renderTable)}
                    </tbody>
                </Table>
            </div>
        );
    };
}

export default RenderTable;