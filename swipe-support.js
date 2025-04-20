// swipe-support.js - Thêm hỗ trợ cử chỉ vuốt cho thiết bị di động
document.addEventListener('DOMContentLoaded', function() {
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        let touchStartY = 0;
        let touchEndY = 0;
        let touchStartTime = 0;
        let touchEndTime = 0;
        const minSwipeDistance = 50; // Tăng ngưỡng để yêu cầu vuốt mạnh hơn
        const maxSwipeTime = 300; // Giảm thời gian tối đa để đảm bảo vuốt nhanh
        let isProcessingSwipe = false;

        const tabContainer = document.querySelector('.tab-container');

        tabContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        tabContainer.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Chỉ ngăn cuộn khi có dấu hiệu vuốt mạnh
        tabContainer.addEventListener('touchmove', function(e) {
            const currentY = e.touches[0].clientY;
            const swipeDistance = Math.abs(currentY - touchStartY);
            const activeTab = document.querySelector('.tab-content.active');
            const isScrollable = activeTab.scrollHeight > activeTab.clientHeight;

            // Nếu tab có nội dung cuộn được và vuốt không quá mạnh, cho phép cuộn
            if (isScrollable && swipeDistance < minSwipeDistance) {
                return; // Không ngăn cuộn
            }
            e.preventDefault(); // Ngăn cuộn mặc định nếu vuốt mạnh
        }, { passive: false });

        function handleTouchStart(event) {
            touchStartY = event.touches[0].clientY;
            touchStartTime = new Date().getTime();
        }

        function handleTouchEnd(event) {
            if (isProcessingSwipe) return;

            touchEndY = event.changedTouches[0].clientY;
            touchEndTime = new Date().getTime();

            const swipeDistance = touchEndY - touchStartY;
            const swipeTime = touchEndTime - touchStartTime;
            const activeTab = document.querySelector('.tab-content.active');
            const isScrollable = activeTab.scrollHeight > activeTab.clientHeight;

            // Kiểm tra nếu tab có nội dung cuộn được
            if (isScrollable) {
                const isAtTop = activeTab.scrollTop === 0;
                const isAtBottom = activeTab.scrollTop + activeTab.clientHeight >= activeTab.scrollHeight;

                // Chỉ chuyển tab khi ở đầu hoặc cuối nội dung và vuốt hợp lệ
                if (
                    (swipeDistance < 0 && isAtBottom) || // Vuốt lên và ở cuối
                    (swipeDistance > 0 && isAtTop) // Vuốt xuống và ở đầu
                ) {
                    processSwipe(swipeDistance, swipeTime);
                }
            } else {
                // Nếu không có nội dung cuộn, xử lý vuốt bình thường
                processSwipe(swipeDistance, swipeTime);
            }
        }

        function processSwipe(swipeDistance, swipeTime) {
            if (Math.abs(swipeDistance) >= minSwipeDistance && swipeTime <= maxSwipeTime) {
                isProcessingSwipe = true;

                const menuItems = document.querySelectorAll('.menu-item');
                const tabContents = document.querySelectorAll('.tab-content');
                let currentTabIndex = 0;

                menuItems.forEach((item, index) => {
                    if (item.classList.contains('active')) {
                        currentTabIndex = index;
                    }
                });

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

                setTimeout(() => {
                    isProcessingSwipe = false;
                }, 500);
            }
        }

        function switchTab(index) {
            if (typeof window.switchTab === 'function') {
                window.switchTab(index);
            } else {
                const menuItems = document.querySelectorAll('.menu-item');
                const tabContents = document.querySelectorAll('.tab-content');

                if (index < 0 || index >= tabContents.length) return;

                menuItems.forEach(item => item.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));

                menuItems[index].classList.add('active');
                tabContents[index].classList.add('active');

                setTimeout(() => {
                    if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
                        AOS.refresh();
                    }
                }, 100);
            }
        }

        console.log('Đã khởi tạo hỗ trợ vuốt cho thiết bị di động');

        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (scrollToTopBtn) {
            tabContainer.addEventListener('touchend', function() {
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