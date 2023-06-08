const express = require("express");
var mysql = require('mysql');
var cors = require('cors')
let app = express()
app.use(express.json())
app.use(cors())

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'RaGuL@08',
  database: 'formflow'
});
// app.get('/getcompany/:id', (req, res) => {

//     connection.query(`select * from company where id = ?`, [req.params.id], function (error, results) {
  
//       if (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }
//       else {
  
//         res.json(results);
//       }
  
//     });
//   });
app.get('/getuser/:id', (req, res) => {

  connection.query(`select * from formentry where id = ?`, [req.params.id], function (error, results) {

    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    else {
      // res.end(JSON.stringify(results));

      res.json(results);
    }

  });
});
    app.post('/signup', (req, res) => {
      const { firstName, lastName, email, mobileNumber, userName, password } = req.body;
      
      const sql = 'INSERT INTO formentry (firstName, lastName, email, mobileNumber, userName, password) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(sql, [firstName, lastName, email, mobileNumber, userName, password], (error, results) => {
        if (error) {
                 console.error(error);
                   res.status(500).json({ error: 'Internal server error' });
                   return;
                 }
                 else {
            
                   res.json(results);
                 }
      });
    });
    app.post('/login', (req, res) => {
      const { userName, password } = req.body;
      
      const sql = 'SELECT id,firstName, lastName, email, mobileNumber,userName,Password FROM formentry WHERE userName = ? and password=?';
      connection.query(sql, [userName,password], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        
        if (results.length === 0) {
          // No matching username and password found
          res.status(401).json({ error: 'Invalid credentials' });
          return;
        }
        // if(password != results[0].password){
        //   res.status(401).json({ error: 'Invalid credentials' });
        //   return;
        // }
        // Username and password match
        res.json(results);
      });
    });
    
    
  app.listen(3002, () => {
    console.log("listening on  port 3002")
  })
