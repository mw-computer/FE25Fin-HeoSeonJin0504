document.addEventListener('DOMContentLoaded', function() {
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

    for(var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('mouseenter', function() {
            activeMenuIndex = Array.prototype.indexOf.call(menuItems, this);
            changeToDarkHeader();
            setActiveMenuItem(this);
            setActiveColumn(activeMenuIndex);
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

    for(var i = 0; i < columns.length; i++) {
        columns[i].addEventListener('mouseenter', function() {
            var columnIndex = Array.prototype.indexOf.call(columns, this);
            for(var j = 0; j < menuItems.length; j++) {
                menuItems[j].classList.remove('active');
            }
            menuItems[columnIndex].classList.add('active');
            for(var j = 0; j < columns.length; j++) {
                columns[j].classList.remove('active');
            }
            this.classList.add('active');
        });
        
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

    function changeToDarkHeader() {
        header.classList.add('header-hover');
        logoImg.src = 'images/header/logo_black.svg';
        loginImg.src = 'images/header/login_icon_black.png';
        siteImg.src = 'images/header/site_icon_black.png';
        menuImg.src = 'images/header/menu_icon_black.png';
    }
    
    function setActiveMenuItem(item) {
        for(var j = 0; j < menuItems.length; j++) {
            menuItems[j].classList.remove('active');
        }
        item.classList.add('active');
    }
    
    function setActiveColumn(index) {
        for(var j = 0; j < columns.length; j++) {
            columns[j].classList.remove('active');
        }
        if(columns[index]) {
            columns[index].classList.add('active');
        }
    }
    
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

    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.innerWidth <= 1020) {
            toggleMobileMenu();
        }
    });

    mobileClose.addEventListener('click', function() {
        closeMobileMenu();
    });

    mobileOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1020 && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    function toggleMobileMenu() {
        if (!isMobileMenuOpen) {
            document.body.classList.add('mobile-menu-active');
            isMobileMenuOpen = true;
        } else {
            document.body.classList.remove('mobile-menu-active');
            isMobileMenuOpen = false;
        }
    }
    
    function closeMobileMenu() {
        document.body.classList.remove('mobile-menu-active');
        isMobileMenuOpen = false;
    }

    document.querySelector('.top-btn').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});