const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
//import fetch from "node-fetch";

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

    const token = jwt.sign({ User_ID: User_ID }, '123', { 
      expiresIn: '1h', 
      }); 

    if (passwordMatch) {
      return res.status(200).json({ message: 'Đăng nhập thành công', token });
    } else {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
    }
  });
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, '123', (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next(); // Cho phép tiếp tục xử lý request
  });
}

// Sử dụng middleware authenticateToken khi cần xác thực
app.post('/create-month-exercises', authenticateToken, (req, res) => {
  // Dùng req.user để lấy thông tin user đã xác thực từ token
  const userId = req.user.User_ID;
  
  // Lấy ngày hiện tại
  const currentDate = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại dưới dạng 'YYYY-MM-DD'

  // Tạo câu truy vấn SQL
  const sqlQuery = `INSERT INTO user_tracking (User_ID, Monthset_ID, Starting_date) VALUES (${userId}, 1, '${currentDate}')`;

  // Thực thi câu truy vấn vào cơ sở dữ liệu
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("New record inserted successfully.");
      res.status(200).send("New record inserted successfully.");
    }
  });
});

app.get("/test", (req, res) => {
  const sql = "SELECT e.Name FROM exercises_in_dayset ed JOIN Exercises e ON ed.Exercise_ID = e.Exercise_ID WHERE ed.Dayset_ID = 1";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/test2", authenticateToken, (req, res) => {
  const userId = req.user.User_ID;
  const sql = `
SELECT
    DATE_ADD(ut.Starting_date, INTERVAL (d.Dayset_ID - 1) DAY) AS Day_Name,
    e.Name AS Exercise_Name
FROM
    gymwebsite.user_tracking ut
JOIN gymwebsite.monthset m ON ut.Monthset_ID = m.Monthset_ID
JOIN gymwebsite.dayset_in_monthset dm ON ut.Monthset_ID = dm.FK_Monthset_ID
JOIN gymwebsite.dayset d ON dm.FK_Dayset_ID = d.Dayset_ID
JOIN gymwebsite.exercises_in_dayset ed ON d.Dayset_ID = ed.Dayset_ID
JOIN gymwebsite.exercises e ON ed.Exercise_ID = e.Exercise_ID
WHERE
    ut.User_ID = ${userId};
`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.get("/gyms/:gymName", (req, res) => {
  const urlName = req.params.gymName; // Lấy tên bài tập từ URL
  const exerciseName = convertExerciseName(urlName); // Chuyển đổi tên bài tập
  const sql = `
  SELECT 
      gyms.Name, 
      gyms.Address, 
      gyms.Slogan, 
      GROUP_CONCAT(DISTINCT services.Name) AS Services,
      GROUP_CONCAT(images.Source) AS Images
  FROM 
      gymwebsite.gyms AS gyms
  LEFT JOIN 
      gymwebsite.gym_service AS gym_service ON gyms.Gym_ID = gym_service.FK_Gym_ID
  LEFT JOIN 
      gymwebsite.services AS services ON gym_service.FK_Service_ID = services.Service_ID
  LEFT JOIN 
      gymwebsite.images AS images ON gyms.Gym_ID = images.Gym_ID
  WHERE 
      gyms.Name = ?
  GROUP BY 
      gyms.Gym_ID;
`;
  db.query(sql, [exerciseName], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.get("/gym", (req, res) => {
  const sql = `
    SELECT 
      gyms.Name AS Name, 
      gyms.Address, 
      gyms.Slogan, 
      GROUP_CONCAT(DISTINCT services.Name) AS Services,
      SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT images.Source), ',', 1) AS Image
    FROM 
      gymwebsite.gyms AS gyms
    LEFT JOIN 
      gymwebsite.gym_service AS gym_service ON gyms.Gym_ID = gym_service.FK_Gym_ID
    LEFT JOIN 
      gymwebsite.services AS services ON gym_service.FK_Service_ID = services.Service_ID
    LEFT JOIN 
      gymwebsite.images AS images ON gyms.Gym_ID = images.Gym_ID
    GROUP BY 
      gyms.Gym_ID;
  `;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post('/health', authenticateToken, (req, res) => {
  // Lấy thông tin từ request body
  const { gender, weight, height, age, pushups } = req.body;

  // Lấy userId từ req.user.User_ID (giả sử đã được xác thực trước đó)
  const userId = req.user.User_ID;

  // Query SQL để thêm hoặc cập nhật dữ liệu vào cơ sở dữ liệu
  const sql = `
    INSERT INTO gymwebsite.body_index (FK_User_ID, Gender, Weight, Height, Age, Pushups)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    Gender = VALUES(Gender),
    Weight = VALUES(Weight),
    Height = VALUES(Height),
    Age = VALUES(Age),
    Pushups = VALUES(Pushups)
  `;
  db.query(sql, [userId, gender, weight, height, age, pushups], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
})

app.get('/checklogin', authenticateToken, (req, res) => {
  // Lấy userId từ req.user.User_ID (giả sử đã được xác thực trước đó)
  const userId = req.user.User_ID;

  // Query SQL để thêm hoặc cập nhật dữ liệu vào cơ sở dữ liệu
  const sql = `
    SELECT Pushups FROM gymwebsite.body_index
    Where FK_User_ID = ?;
  `;
  db.query(sql, [userId], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
})

app.listen(2000, () => {
  console.log("Running...");
})