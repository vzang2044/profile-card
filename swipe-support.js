// swipe-support.js - Thêm hỗ trợ cử chỉ vuốt cho thiết bị di động
document.addEventListener('DOMContentLoaded', function() {
    // Chỉ áp dụng phát hiện vuốt trên thiết bị di động
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Biến để theo dõi vị trí chạm
        let touchStartY = 0;
        let touchEndY = 0;
        let touchStartTime = 0;
        let touchEndTime = 0;
        const minSwipeDistance = 50; // Khoảng cách tối thiểu cho một cử chỉ vuốt (pixel)
        const maxSwipeTime = 300; // Thời gian tối đa cho một cử chỉ vuốt (mili giây)
        let isProcessingSwipe = false; // Cờ để ngăn nhiều cử chỉ vuốt cùng lúc
        
        // Lấy tham chiếu đến container tab
        const tabContainer = document.querySelector('.tab-container');
        
        // Thêm trình nghe sự kiện chạm
        tabContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        tabContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Xử lý sự kiện bắt đầu chạm
        function handleTouchStart(event) {
            touchStartY = event.touches[0].clientY;
            touchStartTime = new Date().getTime();
        }
        
        // Xử lý sự kiện kết thúc chạm
        function handleTouchEnd(event) {
            // Nếu đang xử lý một cử chỉ vuốt, bỏ qua cái này
            if (isProcessingSwipe) return;
            
            touchEndY = event.changedTouches[0].clientY;
            touchEndTime = new Date().getTime();
            
            // Tính toán khoảng cách và thời gian vuốt
            const swipeDistance = touchEndY - touchStartY;
            const swipeTime = touchEndTime - touchStartTime;
            
            // Kiểm tra xem cử chỉ chạm có phải là vuốt hợp lệ không (đủ nhanh và đủ dài)
            if (Math.abs(swipeDistance) >= minSwipeDistance && swipeTime <= maxSwipeTime) {
                isProcessingSwipe = true;
                
                // Truy cập chức năng chuyển tab hiện có
                const menuItems = document.querySelectorAll('.menu-item');
                const tabContents = document.querySelectorAll('.tab-content');
                
                // Tìm chỉ mục tab hiện tại
                let currentTabIndex = 0;
                menuItems.forEach((item, index) => {
                    if (item.classList.contains('active')) {
                        currentTabIndex = index;
                    }
                });
                
                // Xác định hướng vuốt và chuyển tab tương ứng
                if (swipeDistance < 0) {
                    // Vuốt lên - chuyển đến tab tiếp theo
                    if (currentTabIndex < tabContents.length - 1) {
                        switchTab(currentTabIndex + 1);
                    }
                } else {
                    // Vuốt xuống - chuyển đến tab trước đó
                    if (currentTabIndex > 0) {
                        switchTab(currentTabIndex - 1);
                    }
                }
                
                // Đặt lại cờ xử lý sau một độ trễ
                setTimeout(() => {
                    isProcessingSwipe = false;
                }, 500); // Cùng độ trễ như trong trình xử lý sự kiện wheel
            }
        }
        
        // Hàm để chuyển tab - sử dụng hàm switchTab hiện có từ script.js
        function switchTab(index) {
            // Lấy hàm switchTab từ phạm vi toàn cục
            if (typeof window.switchTab === 'function') {
                window.switchTab(index);
            } else {
                // Triển khai dự phòng nếu hàm toàn cục không khả dụng
                const menuItems = document.querySelectorAll('.menu-item');
                const tabContents = document.querySelectorAll('.tab-content');
                
                if (index < 0 || index >= tabContents.length) return;
                
                // Xóa lớp active từ tất cả các mục menu và nội dung tab
                menuItems.forEach(item => item.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Thêm lớp active vào mục menu và nội dung tab đã chọn
                menuItems[index].classList.add('active');
                tabContents[index].classList.add('active');
                
                // Làm mới hoạt ảnh AOS
                setTimeout(() => {
                    if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
                        AOS.refresh();
                    }
                }, 100);
            }
        }
        
        console.log('Đã khởi tạo hỗ trợ vuốt cho thiết bị di động');
        
        // Cập nhật nút cuộn lên đầu trang khi vuốt
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (scrollToTopBtn) {
            tabContainer.addEventListener('touchend', function() {
                // Hiển thị nút khi không ở tab đầu tiên
                const currentTabIndex = Array.from(document.querySelectorAll('.menu-item')).findIndex(item => item.classList.contains('active'));
                if (currentTabIndex > 0) {
                    scrollToTopBtn.classList.add('active');
                } else {
                    scrollToTopBtn.classList.remove('active');
                }
            });
        }
    }
});