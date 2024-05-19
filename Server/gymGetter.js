const fs = require('fs');

// Đọc dữ liệu từ file JSON
const data = fs.readFileSync('gym.json');
const jsonData = JSON.parse(data);

// Tạo một mảng mới chứa thông tin cần lấy
const results = jsonData.results.map(result => {
    return {
        name: result.name,
        vicinity: result.vicinity
    };
});

// Chuyển mảng mới thành JSON
const newData = JSON.stringify(results, null, 2);

// Ghi dữ liệu vào file mới
fs.writeFileSync('gym_after.JSON', newData);

console.log('Filtered data has been saved to filtered_data.json');