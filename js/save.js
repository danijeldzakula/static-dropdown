// function freeze() {
//     var html = document.documentElement;
//     var htmlPos = html.style.position;
//     var scrollPos = html.scrollTop;

//     if (!htmlPos) {
//         html.style.position = 'fixed';
//         html.style.width = '100%';
//         html.style.height = '100%';
//         html.style.top = '-' + scrollPos + 'px';
//         html.style.overflowY = 'auto';   
//     }
// }
// function unfreeze() {  
//     var html = document.documentElement;
//     var htmlPos = html.style.position;
//     if (htmlPos === 'fixed') {
//         html.style.position = 'static';
//         html.scrollTop = -parseInt(html.style.top);
//         html.style.position = '';
//         html.style.top = '';
//         html.style.width = '';
//         html.style.height = '';
//         html.style.overflowY = '';
//     }
// }
// function toggleDropdown(element) {
// 	if (!element) {
// 		return;
// 	}
//     element.forEach(el => {
//         el.onclick = function(event) {
//             var dropdown = event.target.parentNode;
//             var menu = event.target.nextElementSibling;
//             // get size for positioning submenu 
//             var offset_left = dropdown.getBoundingClientRect();
//             var button_rect = el.getBoundingClientRect();
//             var menu_rect = menu.getBoundingClientRect();
//             // set style for positoning submenu 
//             menu.style.opacity = '1';
//             menu.style.visibility = 'visible';
//             menu.style.top = (button_rect.top + 8 + button_rect.height) + 'px';
//             menu.style.left = offset_left.x - menu_rect.width + button_rect.width + 'px';
//             // update set style onresize for positioning submenu
//             window.onresize = function() {
//                 offset_left = dropdown.getBoundingClientRect();
//                 menu.style.opacity = '1';
//                 menu.style.visibility = 'visible';                
//                 menu.style.top = (button_rect.top + 8 + button_rect.height) + 'px';
//                 menu.style.left = offset_left.x - menu_rect.width + button_rect.width + 'px';
//             }            
//         }
 
//     });
// }
// var button = document.querySelectorAll('[data-button]');
// toggleDropdown(button);
/* end */







function freeze() {
    var html = document.documentElement;
    var htmlPos = html.style.position;
    var scrollPos = html.scrollTop;

    if (!htmlPos) {
        html.style.position = 'fixed';
        html.style.width = '100%';
        html.style.height = '100%';
        html.style.top = '-' + scrollPos + 'px';
        html.style.overflowY = 'auto';   
    }
}
function unfreeze() {  
    var html = document.documentElement;
    var htmlPos = html.style.position;
    if (htmlPos === 'fixed') {
        html.style.position = 'static';
        html.scrollTop = -parseInt(html.style.top);
        html.style.position = '';
        html.style.top = '';
        html.style.width = '';
        html.style.height = '';
        html.style.overflowY = '';
    }
}


const Dropdown = function(elem, node) {
    function toggleDropdown() {
        let parentNodeStatus = this.parentNode.tabIndex;
        // var dropdown = this.parentNode;
        // var menu = this.nextElementSibling;


        
       


        node.forEach(element => {
            element.tabIndex = 0;
            element.setAttribute('data-dropdown', false);

            if (parentNodeStatus === 0) {
                this.parentNode.tabIndex = 1;
                this.parentNode.setAttribute('data-dropdown', true);

                if (this.parentNode.getAttribute('data-dropdown') == true) {
                    console.log('ne dodje')
                } else {
                    // get size for positioning submenu 
                    let offset_left = this.parentNode.getBoundingClientRect();
                    let button_rect = this.getBoundingClientRect();
                    let menu_rect = this.nextElementSibling.getBoundingClientRect();   
                    // set style for positoning submenu 
                    this.nextElementSibling.style.opacity = '1';
                    this.nextElementSibling.style.visibility = 'visible';
                    this.nextElementSibling.style.top = (button_rect.top + 8 + button_rect.height) + 'px';
                    this.nextElementSibling.style.left = offset_left.x - menu_rect.width + button_rect.width + 'px';     
                }
                
  
                // update set style onresize for positioning submenu
                window.addEventListener('resize', (event) => {
                    // offset_left = dropdown.getBoundingClientRect();
                    // menu.style.opacity = '1';
                    // menu.style.visibility = 'visible';                
                    // menu.style.top = (button_rect.top + 8 + button_rect.height) + 'px';
                    // menu.style.left = offset_left.x - menu_rect.width + button_rect.width + 'px';
                }, false);
            } else {
                this.parentNode.tabIndex = 0;
                this.parentNode.setAttribute('data-dropdown', false);
                // set style for positoning submenu 
                this.nextElementSibling.style.opacity = '0';
                this.nextElementSibling.style.visibility = 'hidden';
                this.nextElementSibling.style.top = '';
                this.nextElementSibling.style.left = '';      
                // update set style onresize for positioning submenu
                window.addEventListener('resize', (event) => {
                    // menu.style.opacity = '0';
                    // menu.style.visibility = 'hidden';
                    // menu.style.top = '';
                    // menu.style.left = '';     
                }, false);                          
            };
        });
        
        document.addEventListener('click', (event) => {
            let outsideEvent = event.target.tabIndex;
            if (outsideEvent === -1) {
                this.parentNode.tabIndex = 0;
                this.parentNode.setAttribute('data-dropdown', false);
            };
        }, false);   


    }

    elem.forEach(element => {
        element.addEventListener('click', toggleDropdown, false);
    });
}


const dropBtn = document.querySelectorAll('[data-toggle-button]');
const drop = document.querySelectorAll('[data-toggle]');  

const dropdown1 = new Dropdown(dropBtn, drop);

















// window.addEventListener('scroll', (event) => {
//     event.preventDefault();
//     this.parentNode.tabIndex = 0;
//     this.parentNode.setAttribute('data-dropdown', false);
// }, false);






/*
function toggleDropdown(element) {
	if (!element) {
		return;
	}

    element.forEach(el => {
        var dropdown = el.parentNode;
        var menu = el.nextElementSibling;
        // get size for positioning submenu 
        var offset_left = dropdown.getBoundingClientRect();
        var button_rect = el.getBoundingClientRect();
        var menu_rect = menu.getBoundingClientRect();
        // set style for positoning submenu 
        menu.style.top = (button_rect.top + 8 + button_rect.height) + 'px';
        menu.style.left = offset_left.x - menu_rect.width + button_rect.width + 'px';
        // update set style onresize for positioning submenu
        window.onresize = function() {
            offset_left = dropdown.getBoundingClientRect();
            menu.style.top = (button_rect.top + 8 + button_rect.height) + 'px';
            menu.style.left = offset_left.x - menu_rect.width + button_rect.width + 'px';
        }
    });
}

var button = document.querySelectorAll('[data-button]');
toggleDropdown(button);
*/


  // elem.forEach(el => {
        //     console.log(el)

        //     el.onclick = function(event) {
        //         var dropdown = event.target.parentNode;
        //         var menu = event.target.nextElementSibling;
        //         // get size for positioning submenu 
        //         var offset_left = dropdown.getBoundingClientRect();
        //         var button_rect = el.getBoundingClientRect();
        //         var menu_rect = menu.getBoundingClientRect();
        //         // set style for positoning submenu 
        //         menu.style.opacity = '1';
        //         menu.style.visibility = 'visible';
        //         menu.style.top = (button_rect.top + 8 + button_rect.height) + 'px';
        //         menu.style.left = offset_left.x - menu_rect.width + button_rect.width + 'px';
        //         // update set style onresize for positioning submenu
        //         window.onresize = function() {
        //             offset_left = dropdown.getBoundingClientRect();
        //             menu.style.opacity = '1';
        //             menu.style.visibility = 'visible';                
        //             menu.style.top = (button_rect.top + 8 + button_rect.height) + 'px';
        //             menu.style.left = offset_left.x - menu_rect.width + button_rect.width + 'px';
        //         }            
        //     }
        // });    