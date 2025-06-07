document.addEventListener('DOMContentLoaded', function() {
    // 요소 선택
    var header = document.querySelector('.main-header');
    var menuItems = document.querySelectorAll('.main-menu > li');
    var dropdown = document.querySelector('.dropdown-container');
    var columns = document.querySelectorAll('.menu-column');
    var logoImg = document.querySelector('.logo img');
    var loginImg = document.querySelector('.util-icon:nth-child(1) img');
    var siteImg = document.querySelector('.util-icon:nth-child(2) img');
    var menuImg = document.querySelector('.menu-button img');
    var menuBtn = document.querySelector('.menu-button');
    var mobileMenu = document.querySelector('.mobile-menu-container');
    var mobileOverlay = document.querySelector('.mobile-menu-overlay');
    var mobileClose = document.querySelector('.mobile-close-button');
    var isMobileMenuOpen = false;
    var activeMenuIndex = -1;

    // 메뉴 아이템에 마우스 이벤트 추가
    for(var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('mouseenter', function() {
            activeMenuIndex = Array.prototype.indexOf.call(menuItems, this);
            
            // 헤더 스타일 변경
            changeToDarkHeader();
            
            // 메뉴 활성화
            setActiveMenuItem(this);
            
            // 해당 메뉴의 컬럼 활성화
            setActiveColumn(activeMenuIndex);
            
            // 드롭다운 표시
            showDropdown();
        });
        
        menuItems[i].addEventListener('mouseleave', function(e) {
            if (e.relatedTarget && (dropdown.contains(e.relatedTarget) || 
                e.relatedTarget.closest('.main-menu > li') === this)) {
                return;
            }
            closeDropdown();
        });
    }

    // 드롭다운 메뉴에 마우스 이벤트 추가
    dropdown.addEventListener('mouseenter', function() {
        if(activeMenuIndex >= 0) {
            header.classList.add('header-hover');
            dropdown.style.display = 'block';
        }
    });

    dropdown.addEventListener('mouseleave', function(e) {
        if(e.relatedTarget && e.relatedTarget.closest('.main-menu > li')) {
            return;
        }
        closeDropdown();
    });

    // 메뉴 컬럼에 마우스 이벤트 추가
    for(var i = 0; i < columns.length; i++) {
        columns[i].addEventListener('mouseenter', function() {
            var columnIndex = Array.prototype.indexOf.call(columns, this);
            
            // 모든 메뉴 아이템 비활성화
            for(var j = 0; j < menuItems.length; j++) {
                menuItems[j].classList.remove('active');
            }
            
            // 현재 컬럼에 해당하는 메뉴 아이템 활성화
            menuItems[columnIndex].classList.add('active');
            
            // 모든 컬럼 비활성화
            for(var j = 0; j < columns.length; j++) {
                columns[j].classList.remove('active');
            }
            
            // 현재 컬럼 활성화
            this.classList.add('active');
        });
        
        // 서브 링크 이벤트 처리
        var subLinks = columns[i].querySelectorAll('.menu-list a');
        for(var k = 0; k < subLinks.length; k++) {
            subLinks[k].addEventListener('mouseenter', function() {
                var parentCol = this.closest('.menu-column');
                if (parentCol) {
                    var title = parentCol.querySelector('.menu-title');
                    if (title) {
                        title.style.borderBottom = '1px solid transparent';
                    }
                }
            });
            
            subLinks[k].addEventListener('mouseleave', function() {
                var parentCol = this.closest('.menu-column');
                if (parentCol && !parentCol.matches(':hover')) {
                    var title = parentCol.querySelector('.menu-title');
                    if (title) {
                        title.style.borderBottom = '';
                    }
                }
            });
        }
    }

    // 헤더 스타일을 어두운 배경용으로 변경
    function changeToDarkHeader() {
        header.classList.add('header-hover');
        logoImg.src = 'images/header/logo_black.svg';
        loginImg.src = 'images/header/login_icon_black.png';
        siteImg.src = 'images/header/site_icon_black.png';
        menuImg.src = 'images/header/menu_icon_black.png';
    }
    
    // 메뉴 아이템 활성화
    function setActiveMenuItem(item) {
        for(var j = 0; j < menuItems.length; j++) {
            menuItems[j].classList.remove('active');
        }
        item.classList.add('active');
    }
    
    // 특정 컬럼 활성화
    function setActiveColumn(index) {
        for(var j = 0; j < columns.length; j++) {
            columns[j].classList.remove('active');
        }
        if(columns[index]) {
            columns[index].classList.add('active');
        }
    }
    
    // 드롭다운 메뉴 표시
    function showDropdown() {
        if (dropdown.style.display !== 'block') {
            dropdown.style.height = '0';
            dropdown.style.display = 'block';
        }
        
        setTimeout(function() {
            var maxHeight = 350;
            for(var k = 0; k < columns.length; k++) {
                if(columns[k].scrollHeight > maxHeight) {
                    maxHeight = columns[k].scrollHeight;
                }
            }
            
            for(var k = 0; k < columns.length; k++) {
                columns[k].style.height = "100%";
            }
            
            dropdown.style.height = (maxHeight + 20) + 'px';
        }, 10);
    }

    // 드롭다운 메뉴 닫기
    function closeDropdown() {
        activeMenuIndex = -1;
        header.classList.remove('header-hover');
        logoImg.src = 'images/header/logo.svg';
        loginImg.src = 'images/header/login_icon.png';
        siteImg.src = 'images/header/site_icon.png';
        menuImg.src = 'images/header/menu_icon.png';
        
        for(var i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('active');
        }
        
        dropdown.style.display = 'none';
        dropdown.style.height = '0';
    }

    // 모바일 메뉴 버튼 클릭 이벤트
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.innerWidth <= 1020) {
            toggleMobileMenu();
        }
    });

    // 모바일 메뉴 닫기 버튼 이벤트
    mobileClose.addEventListener('click', function() {
        closeMobileMenu();
    });

    // 모바일 메뉴 오버레이 클릭 이벤트
    mobileOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });

    // 화면 크기 변경 이벤트
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1020 && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // 모바일 메뉴 토글 함수
    function toggleMobileMenu() {
        if (!isMobileMenuOpen) {
            document.body.classList.add('mobile-menu-active');
            isMobileMenuOpen = true;
        } else {
            document.body.classList.remove('mobile-menu-active');
            isMobileMenuOpen = false;
        }
    }
    
    // 모바일 메뉴 닫기 함수
    function closeMobileMenu() {
        document.body.classList.remove('mobile-menu-active');
        isMobileMenuOpen = false;
    }
});