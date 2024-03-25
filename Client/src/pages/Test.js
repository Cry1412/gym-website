function fetchDataFromWebsite(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.text();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Sử dụng hàm
var url = "https://www.simplyfitness.com/pages/seated-calf-raise";
fetchDataFromWebsite(url)
    .then(data => {
        console.log("Data fetched successfully:", data);
        // Xử lý dữ liệu ở đây
    });