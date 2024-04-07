const express = require('express')
const cors = require('cors');
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); 
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
  return urlName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
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
app.post('/signup', async(req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
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
      db.query('INSERT INTO users (Username, Email, Password, Create_time) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [username, email, hashedPassword], (err, result) => {
        if (err) {
          throw err;
        }
        return res.status(201).json({ message: 'Người dùng đã được tạo thành công' });
      });
    }
  });
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra xem các trường đã được cung cấp chưa
  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu' });
  }

  // Kiểm tra xem người dùng tồn tại trong cơ sở dữ liệu không
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      throw err;
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
    }

    // Lấy mật khẩu đã hash từ cơ sở dữ liệu
    const hashedPasswordFromDB = results[0].Password;
    const User_ID = results[0].User_ID

    // So sánh mật khẩu đã nhập với mật khẩu đã hash từ cơ sở dữ liệu
    const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

    const token = jwt.sign({ userId: User_ID }, 'your-secret-key', { 
      expiresIn: '1h', 
      }); 

    if (passwordMatch) {
      return res.status(200).json({ message: 'Đăng nhập thành công', token });
    } else {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
    }
  });
});


// app.post('/signin', (req, res) => {
//   const { username, password } = req.body;

//   // Kiểm tra xem các trường đã được cung cấp chưa
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu' });
//   }

//   // Kiểm tra xem người dùng tồn tại trong cơ sở dữ liệu không
//   db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
//     if (err) {
//       throw err;
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
//     } else {
//       return res.status(200).json({ message: 'Đăng nhập thành công' });
//     }
//   });
// });

// app.get('/test', (req, res) => {
//   // Thực hiện truy vấn SQL
//   connection.query('SELECT e.Name FROM exercises_in_dayset ed JOIN Exercises e ON ed.Exercise_ID = e.Exercise_ID WHERE ed.Dayset_ID = 1', (err, results) => {
//     if (err) {
//       console.error('Lỗi truy vấn SQL:', err);
//       res.status(500).send('Đã xảy ra lỗi khi thực hiện truy vấn SQL');
//       return;
//     }

//     // Gửi kết quả trả về dưới dạng JSON
//     res.json(results);
//   });
// });

app.get("/test", (req, res) => {
  const sql = "SELECT e.Name FROM exercises_in_dayset ed JOIN Exercises e ON ed.Exercise_ID = e.Exercise_ID WHERE ed.Dayset_ID = 1";
  db.query(sql, (err, data) => {
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
