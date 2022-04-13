import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContextMenu from '../src/ContextMenu';
import ContextMenuTrigger from '../src/ContextMenuTrigger';

describe('ContextMenuTrigger tests', () => {
    function baseSetup(options = {}) {
        const ID = 'CORRECT_ID';
        render(<>
            <ContextMenu id={ID} />
            <ContextMenuTrigger id={ID} {...options} />
        </>);

        const wrapper = () => document.querySelector('.react-contextmenu-wrapper');
        const contextMenu = () => document.querySelector('.react-contextmenu');

        const user = userEvent.setup();

        async function rightClick(target) {
            await user.pointer([
                { target },
                { keys: '[MouseRight]', target }
            ]);
        }

        return { contextMenu, wrapper, user, rightClick };
    }

    describe('without triggerOnLeftClick', () => {
        const setup = baseSetup;
        test('shows a ContextMenu when right clicking', async () => {
            const { contextMenu, wrapper, rightClick } = setup();
            await rightClick(wrapper());
            expect(contextMenu()).toHaveClass('react-contextmenu--visible');
        });

        test('shows a ContextMenu when ctrl + left clicking', () => {
            const { contextMenu, wrapper } = setup();
            // Due to https://github.com/testing-library/user-event/issues/924 we
            // have to use fireEvent directly here.
            fireEvent.contextMenu(wrapper(), { button: 0, buttons: 1 });
            expect(contextMenu()).toHaveClass('react-contextmenu--visible');
        });

        test('does not show a ContextMenu when left clicking without a modifier', async () => {
            const { contextMenu, wrapper, user } = setup();
            await user.click(wrapper());
            expect(contextMenu()).not.toHaveClass('react-contextmenu--visible');
        });
    });

    describe('with triggerOnLeftClick', () => {
        function setup() {
            return baseSetup({ triggerOnLeftClick: true });
        }

        test('shows a ContextMenu when right clicking', async () => {
            const { contextMenu, wrapper, rightClick } = setup();
            await rightClick(wrapper());
            expect(contextMenu()).toHaveClass('react-contextmenu--visible');
        });

        test('shows a ContextMenu when ctrl + left clicking', () => {
            const { contextMenu, wrapper } = setup();
            // Due to https://github.com/testing-library/user-event/issues/924 we
            // have to use fireEvent directly here.
            fireEvent.contextMenu(wrapper(), { button: 0, buttons: 1 });
            expect(contextMenu()).toHaveClass('react-contextmenu--visible');
        });

        test('shows a ContextMenu when left clicking without a modifier', async () => {
            const { contextMenu, wrapper, user } = setup();
            await user.click(wrapper());
            expect(contextMenu()).toHaveClass('react-contextmenu--visible');
        });
    });
});

