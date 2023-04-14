export function callIfExists(func, ...args) {
    return (typeof func === 'function') && func(...args);
}

export function hasOwnProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function uniqueId() {
    // eslint-disable-next-line no-magic-numbers
    return Math.random().toString(36).substring(7);
}

export const cssClasses = {
    menu: 'react-contextmenu',
    menuVisible: 'react-contextmenu--visible',
    menuWrapper: 'react-contextmenu-wrapper',
    menuItem: 'react-contextmenu-item',
    menuItemActive: 'react-contextmenu-item--active',
    menuItemDisabled: 'react-contextmenu-item--disabled',
    menuItemDivider: 'react-contextmenu-item--divider',
    menuItemSelected: 'react-contextmenu-item--selected',
    subMenu: 'react-contextmenu-submenu'
};

export const store = {};

export const canUseDOM = Boolean(
    typeof window !== 'undefined' && window.document && window.document.createElement
);

export function isElementParent(element, parent) {
    let current = element;
    while (current.parentNode) {
        current = current.parentNode;
        if (current === parent) {
            return true;
        }
    }

    return false;
}

export const PRIMARY_MOUSE_BUTTON = 0
export const SECONDARY_MOUSE_BUTTON = 1

export const KEYBOARD_CODES = {
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
    Escape: 'Escape',
    Enter: 'Enter',
    NumpadEnter: 'NumpadEnter'
}
