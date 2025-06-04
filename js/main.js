// 네비게이션 메뉴 동작을 처리
document.addEventListener('DOMContentLoaded', function() {
    const headPart = document.querySelector('.main-header');
    const menuList = document.querySelectorAll('.main-menu > li');
    const dropMenu = document.querySelector('.dropdown-container');
    const menuBoxes = document.querySelectorAll('.menu-column');
    
    headPart.addEventListener('mouseenter', function() {
        headPart.classList.add('header-hover');
        dropMenu.style.display = 'block';
        
        let maxHeight = 250;
        for(let i = 0; i < menuBoxes.length; i++) {
            if(menuBoxes[i].scrollHeight > maxHeight) {
                maxHeight = menuBoxes[i].scrollHeight;
            }
        }
        dropMenu.style.height = maxHeight + 'px';
    });
    
    for(let i = 0; i < menuList.length; i++) {
        menuList[i].addEventListener('mouseenter', function() {
            for(let j = 0; j < menuList.length; j++) {
                menuList[j].classList.remove('active');
            }
            this.classList.add('active');
            
            for(let j = 0; j < menuBoxes.length; j++) {
                menuBoxes[j].classList.remove('active');
            }
            if(menuBoxes[i]) {
                menuBoxes[i].classList.add('active');
            }
        });
    }
    
    const headerSpace = document.querySelector('header');
    headerSpace.addEventListener('mouseleave', function() {
        headPart.classList.remove('header-hover');
        for(let i = 0; i < menuList.length; i++) {
            menuList[i].classList.remove('active');
        }
        dropMenu.style.display = 'none';
    });
    
    if(menuList.length > 0 && menuBoxes.length > 0) {
        menuList[0].classList.add('active');
        menuBoxes[0].classList.add('active');
    }
});