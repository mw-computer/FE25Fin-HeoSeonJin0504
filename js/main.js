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
    var isMobileOpen = false;
    var nowMenu = -1;

    for(var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('mouseenter', function() {
            nowMenu = Array.prototype.indexOf.call(menuItems, this);
            header.classList.add('header-hover');
            logoImg.src = 'images/header/logo_black.svg';
            loginImg.src = 'images/header/login_icon_black.png';
            siteImg.src = 'images/header/site_icon_black.png';
            menuImg.src = 'images/header/menu_icon_black.png';
            for(var j = 0; j < menuItems.length; j++) {
                menuItems[j].classList.remove('active');
            }
            this.classList.add('active');
            for(var j = 0; j < columns.length; j++) {
                columns[j].classList.remove('active');
            }
            if(columns[nowMenu]) {
                columns[nowMenu].classList.add('active');
            }
            if (dropdown.style.display !== 'block') {
                dropdown.style.height = '0';
                dropdown.style.display = 'block';
            }
            setTimeout(function() {
                var maxH = 350;
                for(var k = 0; k < columns.length; k++) {
                    if(columns[k].scrollHeight > maxH) {
                        maxH = columns[k].scrollHeight;
                    }
                }
                for(var k = 0; k < columns.length; k++) {
                    columns[k].style.height = "100%";
                }
                dropdown.style.height = (maxH + 20) + 'px';
            }, 10);
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
        if(nowMenu >= 0) {
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
            var idx = Array.prototype.indexOf.call(columns, this);
            for(var j = 0; j < menuItems.length; j++) {
                menuItems[j].classList.remove('active');
            }
            menuItems[idx].classList.add('active');
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

    function closeDropdown() {
        nowMenu = -1;
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
            if (!isMobileOpen) {
                document.body.classList.add('mobile-menu-active');
                isMobileOpen = true;
            } else {
                document.body.classList.remove('mobile-menu-active');
                isMobileOpen = false;
            }
        }
    });

    mobileClose.addEventListener('click', function() {
        document.body.classList.remove('mobile-menu-active');
        isMobileOpen = false;
    });

    mobileOverlay.addEventListener('click', function() {
        document.body.classList.remove('mobile-menu-active');
        isMobileOpen = false;
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1020 && isMobileOpen) {
            document.body.classList.remove('mobile-menu-active');
            isMobileOpen = false;
        }
    });
});