const express = require('express');
const mysql = require('mysql');

const fs = require("fs");
const fastcsv = require("fast-csv");
const { json } = require('express');

const app = express();
const port = 8000;
const table ='PATHRISE_JOBS';

const appRoot = process.cwd();

const resolveJobs = (jobsdata) => {
  let resolvedJobsData = [];
  let matchFound = false;
  let matchName = '';
  var jobBoardsJSON = require(appRoot+'/'+process.env.MY_JOB_SOURCES)
  let jobBoards = jobBoardsJSON['job_boards'];

  for (var i in jobsdata) {
    let temp = jobsdata[i];

    if(temp[3].includes(temp[2])){
      matchFound = true;
      matchName = 'Company Website';
    }

    for (var j=0; j<jobBoards.length; j++){
      let jobBoardName = jobBoards[j];
      if(temp[3].includes(jobBoardName.name.toLowerCase())){
        matchFound = true;
        matchName = jobBoardName.name;
        break;
      }
    }
    if(matchFound){
      temp.push(matchName);
    }
    else{
      matchName = 'Unknown';
      temp.push(matchName);
    }
    resolvedJobsData.push(temp);
    matchFound = false;
  }
  return resolvedJobsData;
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

app.get(`/addjobs`, (req,res) => {
  var data = fs.readFileSync(appRoot+'/'+process.env.MY_JOBS_FILE)
  .toString()
  .split('\n')
  .slice(1)
  .map(e => e.trim(' '))
  .map(e => e.toString())
  .map(e => e.replace('"',''))
  .map(e => e.replace('"',''))
  .map(e => e.replace(', ',' '))
  .map(e => e.replace(' ,',' '))
  .map(e => e.split(',').map(e => e.trim()));

  let resolvedJobsData = resolveJobs(data);
  


  let query = `INSERT INTO ${table} (ID, JOB_TITLE, COMPANY_NAME, JOB_URL, JOB_SOURCE) VALUES ?`;

  pool.query(query, [resolvedJobsData], (err, rows) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(rows);
    }
  });
});

app.get(`/jobsource`, (req, res) => {
  var jobBoardsJSON = require(appRoot+'/job_boards.json');
  let jobBoards = jobBoardsJSON['job_boards'];
  res.send(jobBoards);
});

app.get(`/jobpostings` , (req, res) => {
  const source = req.query.source;
  pool.query(`SELECT * FROM ${table} WHERE JOB_SOURCE = '${source}' `, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });

});