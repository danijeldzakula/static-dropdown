function freeze() {
    var html = document.documentElement;
    var htmlPos = html.style.position;
    var scrollPos = html.scrollTop;

    if (!htmlPos) {
        html.style.position = 'fixed';
        html.style.width = '100%';
        html.style.height = '100%';
        html.style.top = '-' + scrollPos + 'px';
        html.style.overflowY = 'scroll';   
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


/**
 * 
 * @param {*} dropdown 
 * @param {*} button 
 * @param {*} menu 
 * @returns 
 */
function toggleDropdown(menu, trigger, submenu) {
    function dropdown() {
        let parent_tabindex = this.parentNode.tabIndex;

        /**
         * menu loop target
         */
        menu.forEach(el => {
            el.tabIndex = 0;
            el.setAttribute('data-dropdown', false);

            let child = el.querySelector('[data-dropdown-collapse]');
            child.tabIndex = 0;
            child.setAttribute('data-dropdown-collapse', false);

            if (parent_tabindex === 0) {
                this.parentNode.tabIndex = 1;
                this.parentNode.setAttribute('data-dropdown', true);
                this.nextElementSibling.tabIndex = 1;
                this.nextElementSibling.setAttribute('data-dropdown-collapse', true);
                submenuPosition(this.parentNode, this, this.nextElementSibling);
                freeze();
            } else {
                this.parentNode.tabIndex = 0;
                this.parentNode.setAttribute('data-dropdown', false);
                this.nextElementSibling.tabIndex = 0;
                this.nextElementSibling.setAttribute('data-dropdown-collapse', false);
                unfreeze();
                submenuPosition(this.parentNode, this, this.nextElementSibling);
            }
        });

        /**
         * submenu loop target
         */
        function submenuPosition(dropdown, trigger, menu) {
            var offset_left = dropdown.getBoundingClientRect();
            var button_rect = trigger.getBoundingClientRect();
            var menu_rect = menu.getBoundingClientRect();

            // set style for positoning submenu 
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.top = (button_rect.top + 8 + button_rect.height) + 'px';
            menu.style.left = offset_left.x - menu_rect.width + button_rect.width + 'px';
        
            // update set style onresize for positioning submenu
            window.onresize = function() {
                offset_left = dropdown.getBoundingClientRect();
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';                
                menu.style.top = (button_rect.top + 8 + button_rect.height) + 'px';
                menu.style.left = offset_left.x - menu_rect.width + button_rect.width + 'px';
            }  
            
            
            
        }
        /**
         * outside event restore
         */
        document.addEventListener('click', (event) => {
            let outsideEvent = event.target.tabIndex;
            if (outsideEvent === -1) {
                this.parentNode.tabIndex = 0;
                this.parentNode.setAttribute('data-dropdown', false);
                this.nextElementSibling.tabIndex = 0;
                this.nextElementSibling.setAttribute('data-dropdown-collapse', false);   
                unfreeze();   
            };
        }, false);           

    }

    trigger.forEach(el => {
        el.addEventListener('click', dropdown, false);
    });
}

var dropdown = document.querySelectorAll('[data-dropdown]');
var button = document.querySelectorAll('[data-dropdown-button]');
var menu = document.querySelectorAll('[data-dropdown-collapse]');
toggleDropdown(dropdown, button, menu);
/* end */