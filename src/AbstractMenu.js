import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';
import { KEYBOARD_CODES } from './helpers';

export default class AbstractMenu extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    constructor(props) {
        super(props);

        this.seletedItemRef = null;
        this.state = {
            selectedItem: null,
            forceSubMenuOpen: false
        };
    }

    handleKeyNavigation = (e) => {
        /*
         *   Check for isVisible strictly here as it might be undefined when this code executes in the context of SubMenu
         *   but we only need to check when it runs in the ContextMenu context
         */
        if (this.state.isVisible === false) {
            return;
        }

        switch (e.code) {
            case KEYBOARD_CODES.ArrowLeft: // left arrow
            case KEYBOARD_CODES.Escape: // escape
                e.preventDefault();
                this.hideMenu(e);
                break;
            case KEYBOARD_CODES.ArrowUp: // up arrow
                e.preventDefault();
                this.selectChildren(true);
                break;
            case KEYBOARD_CODES.ArrowDown: // down arrow
                e.preventDefault();
                this.selectChildren(false);
                break;
            case KEYBOARD_CODES.ArrowRight: // right arrow
                this.tryToOpenSubMenu(e);
                break;
            case KEYBOARD_CODES.Enter: // enter
            case KEYBOARD_CODES.NumpadEnter:
                e.preventDefault();
                this.tryToOpenSubMenu(e);
                {
                    // determine the selected item is disabled or not
                    const disabled = this.seletedItemRef &&
                        this.seletedItemRef.props &&
                        this.seletedItemRef.props.disabled;

                    if (this.seletedItemRef &&
                        this.seletedItemRef.ref instanceof HTMLElement &&
                        !disabled) {
                        this.seletedItemRef.ref.click();
                    } else {
                        this.hideMenu(e);
                    }
                }
                break;
            default:
                // do nothing
        }
    }

    handleForceClose = () => {
        this.setState({ forceSubMenuOpen: false });
    }

    tryToOpenSubMenu = (e) => {
        if (this.state.selectedItem && this.state.selectedItem.type === this.getSubMenuType()) {
            e.preventDefault();
            this.setState({ forceSubMenuOpen: true });
        }
    }

    selectChildren = (forward) => {
        const { selectedItem } = this.state;
        const children = [];
        // eslint-disable-next-line no-magic-numbers
        let disabledChildrenCount = 0;
        let disabledChildIndexes = {};

        const childCollector = (child, index) => {
            /*
             *   child can be empty in case you do conditional rendering of components, in which
             *   case it should not be accounted for as a real child
             */
            if (!child) {
                return;
            }

            // eslint-disable-next-line no-magic-numbers
            if ([MenuItem, this.getSubMenuType()].indexOf(child.type) < 0) {
                // Maybe the MenuItem or SubMenu is capsuled in a wrapper div or something else
                React.Children.forEach(child.props.children, childCollector);
            } else if (!child.props.divider) {
                if (child.props.disabled) {
                    ++disabledChildrenCount;
                    disabledChildIndexes[index] = true;
                }

                children.push(child);
            }
        };

        React.Children.forEach(this.props.children, childCollector);
        if (disabledChildrenCount === children.length) {
            // All menu items are disabled, so none can be selected, don't do anything
            return;
        }

        function findNextEnabledChildIndex(currentIndex) {
            let i = currentIndex;
            let incrementCounter = () => {
                if (forward) {
                    --i;
                } else {
                    ++i;
                }

                // eslint-disable-next-line no-magic-numbers
                if (i < 0) {
                    // eslint-disable-next-line no-magic-numbers
                    i = children.length - 1;
                } else if (i >= children.length) {
                    // eslint-disable-next-line no-magic-numbers
                    i = 0;
                }
            };

            do {
                incrementCounter();
            } while (i !== currentIndex && disabledChildIndexes[i]);

            return i === currentIndex ? null : i;
        }

        const currentIndex = children.indexOf(selectedItem);
        const nextEnabledChildIndex = findNextEnabledChildIndex(currentIndex);

        if (nextEnabledChildIndex !== null) {
            this.setState({
                selectedItem: children[nextEnabledChildIndex],
                forceSubMenuOpen: false
            });
        }
    }

    onChildMouseMove = (child) => {
        if (this.state.selectedItem !== child) {
            this.setState({ selectedItem: child, forceSubMenuOpen: false });
        }
    }

    onChildMouseLeave = () => {
        this.setState({ selectedItem: null, forceSubMenuOpen: false });
    }

    renderChildren = children => React.Children.map(children, (child) => {
        const props = {};
        if (!React.isValidElement(child)) return child;
        // eslint-disable-next-line no-magic-numbers
        if ([MenuItem, this.getSubMenuType()].indexOf(child.type) < 0) {
            // Maybe the MenuItem or SubMenu is capsuled in a wrapper div or something else
            props.children = this.renderChildren(child.props.children);
            return React.cloneElement(child, props);
        }
        props.onMouseLeave = this.onChildMouseLeave.bind(this);
        if (child.type === this.getSubMenuType()) {
            // special props for SubMenu only
            props.forceOpen = this.state.forceSubMenuOpen && (this.state.selectedItem === child);
            props.forceClose = this.handleForceClose;
            props.parentKeyNavigationHandler = this.handleKeyNavigation;
        }
        if (!child.props.divider && this.state.selectedItem === child) {
            // special props for selected item only
            props.selected = true;
            props.ref = (ref) => { this.seletedItemRef = ref; };
            return React.cloneElement(child, props);
        }
        // onMouseMove is only needed for non selected items
        props.onMouseMove = () => this.onChildMouseMove(child);
        return React.cloneElement(child, props);
    });
}
