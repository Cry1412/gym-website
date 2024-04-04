const express = require('express')
const cors = require('cors');
const mysql = require('mysql2')
const bodyParser = require('body-parser');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Đăng ký người dùng
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Kiểm tra xem các trường đã được cung cấp chưa
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp tên đăng nhập, email và mật khẩu' });
  }

  // Kiểm tra xem người dùng đã tồn tại chưa
  db.query('SELECT * FROM users WHERE Username = ? OR Email = ?', [username, email], (err, results) => {
    if (err) {
      throw err;
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'Tên đăng nhập hoặc email đã được sử dụng' });
    } else {
      // Thêm người dùng vào database
      db.query('INSERT INTO users (Username, Email, Password, Create_time) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [username, email, password], (err, result) => {
        if (err) {
          throw err;
        }
        return res.status(201).json({ message: 'Người dùng đã được tạo thành công' });
      });
    }
  });
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra xem các trường đã được cung cấp chưa
  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu' });
  }

  // Kiểm tra xem người dùng tồn tại trong cơ sở dữ liệu không
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      throw err;
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
    } else {
      return res.status(200).json({ message: 'Đăng nhập thành công' });
    }
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
