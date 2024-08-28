// Hàm để lấy thông tin địa lý và hiển thị giờ
async function fetchTimeAndLocation() {
    try {
        // Gọi API ipinfo để lấy thông tin địa lý dựa trên địa chỉ IP
        const response = await fetch('https://api.ip.sb/geoip');
        const data = await response.json();

        // Lấy múi giờ từ thông tin địa lý
        const timezone = data.timezone;

        // Hiển thị thông tin vị trí
        document.getElementById('location').innerText = `Location: ${data.city}, ${data.region}, ${data.country}`;

        // Cập nhật giờ theo múi giờ của người dùng
        updateTime(timezone);
    } catch (error) {
        console.error('Error fetching time and location:', error);
        document.getElementById('location').innerText = 'Unable to load location.';
    }
}

// Hàm để cập nhật và hiển thị giờ
function updateTime(timezone) {
    // Sử dụng thư viện Luxon để lấy giờ theo múi giờ
    const { DateTime } = luxon;
    setInterval(() => {
        const time = DateTime.now().setZone(timezone).toLocaleString(DateTime.TIME_WITH_SECONDS);
        document.getElementById('clock').innerText = time;
    }, 1000);
}

// Gọi hàm để bắt đầu quá trình
fetchTimeAndLocation();
