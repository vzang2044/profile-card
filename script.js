// Liên kết đến trang mạng xã hội của bạn
const links = {
    facebook: "https://www.facebook.com/itsvzang/",
    instagram: "https://www.instagram.com/zangpeodzai/",
    tiktok: "https://www.tiktok.com/@zangpeo_04",
    github: "https://github.com/vzang2044"
};

// Gán sự kiện click cho các icon mạng xã hội
document.getElementById("facebook").href = links.facebook;
document.getElementById("instagram").href = links.instagram;
document.getElementById("tiktok").href = links.tiktok;
document.getElementById("github").href = links.github;

// Xử lý sự kiện click cho nút Contact Me
document.addEventListener("DOMContentLoaded", function () {
    const contactBtn = document.querySelector(".contact-btn");

    contactBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định

        // Kiểm tra nếu là thiết bị di động
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.location.href = "tel:+84946039187"; // Gọi số điện thoại của bạn
        } else {
            window.location.href = "ms-call:+84946039187"; // Mở ứng dụng Phone trên máy tính
        }
    });
});
