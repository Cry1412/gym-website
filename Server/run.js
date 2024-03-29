const express = require('express')
const cors = require('cors');
const mysql = require('mysql2')

const app = express();
app.use(cors())
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "s0ctho1881",
  database: "gymwebsite"
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// app.get("/exercises", (req, res) => {
//   const sql = "SELECT * FROM exercises LIMIT 1";
//   db.query(sql, (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data)
//   })
// })

function convertExerciseName(urlName) {
  // Loại bỏ dấu gạch dưới và chuyển đổi các chữ cái thành chữ in hoa
  return urlName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

app.get("/exercises/:exerciseName", (req, res) => {
  const urlName = req.params.exerciseName; // Lấy tên bài tập từ URL
  const exerciseName = convertExerciseName(urlName); // Chuyển đổi tên bài tập
  const sql = "SELECT * FROM exercises WHERE name = ?";
  db.query(sql, [exerciseName], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.listen(2000, () => {
  console.log("Running...");
})

// const express = require('express');
// const mysql = require('mysql2');

// const app = express();
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "s0ctho1881",
//   database: "gymwebsite"
// });

// // Kết nối đến cơ sở dữ liệu
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to database');
// });
