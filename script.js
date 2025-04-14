// Khởi tạo AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Xử lý chuyển tab
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');
    let currentTabIndex = 0; // Theo dõi tab hiện tại

    // Hàm chuyển tab
    function switchTab(index) {
        if (index < 0 || index >= tabContents.length) return; // Giới hạn index

        // Xóa active class từ tất cả menu items và tab contents
        menuItems.forEach(item => item.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        // Thêm active class cho menu item và tab tương ứng
        menuItems[index].classList.add('active');
        tabContents[index].classList.add('active');

        // Cập nhật currentTabIndex
        currentTabIndex = index;

        // Kích hoạt lại AOS
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }

    // Xử lý click vào menu
    menuItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(index);
        });
    });

    // Xử lý lăn chuột để chuyển tab
    let isScrolling = false; // Tránh lăn chuột quá nhanh
    window.addEventListener('wheel', function(event) {
        if (isScrolling) return; // Nếu đang xử lý, bỏ qua

        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 500); // Thời gian chờ giữa các lần lăn (500ms)

        // Lăn xuống (deltaY > 0) thì chuyển tab tiếp theo
        if (event.deltaY > 0) {
            if (currentTabIndex < tabContents.length - 1) {
                switchTab(currentTabIndex + 1);
            }
        }
        // Lăn lên (deltaY < 0) thì chuyển tab trước đó
        else if (event.deltaY < 0) {
            if (currentTabIndex > 0) {
                switchTab(currentTabIndex - 1);
            }
        }
    });

    // Liên kết đến trang mạng xã hội của bạn
    const links = {
        facebook: "https://www.facebook.com/itsvzang/",
        instagram: "https://www.instagram.com/zangpeodzai/",
        tiktok: "https://www.tiktok.com/@zangpeo_04",
        github: "https://github.com/vzang2044",
        messenger: "https://m.me/itsvzang",
        telegram: "https://t.me/vzang04",
        email: "mailto:vzang204@gmail.com" 
    };

    // Gán sự kiện click cho các icon mạng xã hội ở tab Home
    document.getElementById("facebook").href = links.facebook;
    document.getElementById("instagram").href = links.instagram;
    document.getElementById("tiktok").href = links.tiktok;
    document.getElementById("github").href = links.github;

    // Gán sự kiện click cho các icon mạng xã hội ở tab Donate
    document.getElementById("author-facebook").href = links.facebook;
    document.getElementById("author-messenger").href = links.messenger;
    document.getElementById("author-telegram").href = links.telegram;
    document.getElementById("author-email").href = links.email;

    // Xử lý sự kiện click cho nút Contact Me
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

    // Xử lý nút cuộn lên đầu trang
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        // Hiển thị/ẩn nút khi chuyển tab
        window.addEventListener('wheel', function() {
            // Hiển thị nút khi không ở tab đầu tiên
            if (currentTabIndex > 0) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });

        // Xử lý sự kiện click để cuộn lên đầu (về tab Home)
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab(0); // Chuyển về tab Home
        });
    }
    
    // Đưa hàm switchTab ra global scope để swipe-support.js có thể sử dụng
    window.switchTab = switchTab;
});