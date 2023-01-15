const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(cors())
app.use(express.json());
app.listen(port, () => {
    console.log("Services have been started running on port 3001...");
})
const sql = require('mssql/msnodesqlv8');
const config = {
    database: 'issue_tracker',
    server: 'APPALANAIDUP',
    driver: 'msnodesqlv8',
    user: 'pythonservices',
    password: 'admin',
    options: {
        trustedConnection: true
    }
};



app.get('/getIssues', (req, res) => {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
        let request = new sql.Request();
        request.query('select * from active_issues', function (err, resultset) {
            if (err) {
                console.log(err);
            } else {
                // console.log((resultset.recordset[0].issue_created_date).toString())
                // console.log(resultset);
                res.send(resultset.recordset)
            }
        });
    });
});

app.post('/addIssue',(req,res)=>{
    console.log(req.body)
   let {toolName,operatorName,comments,toolType} = req.body;
   sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
         let request = new sql.Request();       
        let queryString = "INSERT INTO active_issues (issue_name, operator_name, comments, issue_type) VALUES ('"+toolName+"', '"+operatorName+"', '"+comments+"', '"+toolType+"')";
         request.query(queryString, function (err, result) {
          if (err) throw err;
          /*Use the result object to get the id:*/
          console.log(Object.entries(result))
          res.send("1 record inserted, ID: " + result.rowsAffected);
        });
    });       
 });

 app.get('/getIssue/:issue_id',(req,res)=>{
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
         let request = new sql.Request();       
        let queryString = `SELECT * FROM active_issues WHERE issue_id = ${req.params.issue_id}`;
        request.query(queryString, function (err, result) {
          if (err) throw err;
          console.log(result)
          res.send(result.recordset);
        });
    });
  });
  
  app.post('/updateIssue/:issue_id',(req,res)=>{
    let {toolName,operatorName,comments,toolType} = req.body;
      sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
         let request = new sql.Request();       
        let queryString = "UPDATE active_issues SET issue_name='"+toolName+"',operator_name='"+operatorName+"',comments='"+comments+"',issue_type='"+toolType+"' WHERE issue_id ='"+req.params.issue_id+"'";
        request.query(queryString, function (err, result) {
          if (err) throw err;
          console.log(result)
          res.send(result.recordset);
        });

    });
  });
  
  app.delete('/deleteIssue/:issue_id',(req,res)=>{
 sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
         let request = new sql.Request();       
        let queryString = `DELETE FROM active_issues WHERE issue_id = ${req.params.issue_id}`;
        request.query(queryString, function (err, result) {
          if (err) throw err;
          console.log(result)
          res.send(result.recordset);
        });

    });
  });