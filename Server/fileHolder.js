const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Đọc tệp name.txt
const names = fs.readFileSync('name.txt', 'utf8').split('\n').map(name => name.trim());

// Hàm lấy dữ liệu từ URL đã chỉ định
async function fetchData(name) {
  try {
    const url = `https://www.simplyfitness.com/pages/${name}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const exerciseData = {};

    // Lấy thông tin từ trang web
    const nameValue = $('header .exo-h1').text().trim();
    const descriptionValue = $('header .lead').text().trim();
    //const startingPositionValue = $('.exo-info div:nth-child(1) p').text().trim();
    const startingPositionValue = $('.exo-info div:nth-child(1) h3:contains("Starting position")').nextUntil('h3').filter('p').text().trim();

    //const executionValue = $('.exo-info div:nth-child(1) p').first().nextUntil('h3').text().trim();
    //const executionValue = $('.exo-info div:nth-child(1) h3:contains("Execution")').next('p').text().trim();
    const executionValue = $('.exo-info div:nth-child(1) h3:contains("Execution")').nextUntil('h3').text().trim();

    //const executionValue = $('.exo-info div:nth-child(1) p').nextUntil('h3').text().trim();
    //const executionValue = $('.exo-info div:nth-child(1) p').nextUntil('h3').text().trim();
    const equipmentValue = $('.exo-info div:nth-child(2) h3:contains("Equipment required")').next('span').text().trim();
    const mainMusclesValue = $('.exo-info div:nth-child(2) span a').first().text().trim();
    const secondaryMusclesValue = $('.exo-info div:nth-child(2) span a').slice(1).map((i, el) => $(el).text()).get().join(', ');
    //const imageValue = $('header img').attr('src');
    const imageValue = $('.exo-h1').closest('.container').find('img').attr('src');

    // Đổ dữ liệu vào object
    exerciseData.Name = nameValue;
    exerciseData.Description = descriptionValue;
    exerciseData['Starting position'] = startingPositionValue;
    exerciseData.Execution = executionValue;
    exerciseData['Equipment required'] = equipmentValue;
    exerciseData['Main muscles'] = mainMusclesValue;
    exerciseData['Secondary muscles'] = secondaryMusclesValue;
    exerciseData.Image = imageValue;

    return exerciseData;
  } catch (error) {
    console.log(`Error fetching data for ${name}:`, error);
    return null;
  }
}

// Hàm chạy lần lượt và lưu dữ liệu vào tệp final.txt
async function run() {
  const finalData = [];

  for (const name of names) {
    const data = await fetchData(name);
    console.log(name);
    if (data) {
      finalData.push(data);
    }
  }

  // Lưu dữ liệu vào tệp final.txt
  const jsonData = JSON.stringify(finalData, null, 2);
  fs.writeFileSync('final1.txt', jsonData, 'utf8');
  console.log('All data has been written to final.txt successfully!');
}

// Gọi hàm run
run();
