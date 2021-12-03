import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink as Link, Routes } from 'react-router-dom';

import SimpleMenu from './SimpleMenu';
import MultipleTargets from './MultipleTargets';
import MultipleMenus from './MultipleMenus';
import SubMenus from './SubMenus';
import DynamicMenu from './DynamicMenu';
import Customization from './Customization';
import RTLSubMenu from './RTLSubMenu';
import Nested from './Nested';

import './react-contextmenu.css';

const commonProps = {
    className: 'pure-menu-link',
    activeClassName: 'link-active'
};

function App() {
    return (
        <div>
            <div className='pure-menu pure-menu-horizontal'>
                <ul className='pure-menu-list'>
                    <li className='pure-menu-item'>
                        <Link {...commonProps} to='/simple-menu'>
                            Simple Menu
                        </Link>
                    </li>
                    <li className='pure-menu-item'>
                        <Link {...commonProps} to='/multiple-targets'>
                            Multiple Targets
                        </Link>
                    </li>
                    <li className='pure-menu-item'>
                        <Link {...commonProps} to='/multiple-menus'>
                            Multiple Menus
                        </Link>
                    </li>
                    <li className='pure-menu-item'>
                        <Link {...commonProps} to='/submenus'>
                            Sub Menus
                        </Link>
                    </li>
                    <li className='pure-menu-item'>
                        <Link {...commonProps} to='/dynamic-menu'>
                            Dynamic Menu
                        </Link>
                    </li>
                    <li className='pure-menu-item'>
                        <Link {...commonProps} to='/customization'>
                            Customization
                        </Link>
                    </li>
                    <li className='pure-menu-item'>
                        <Link {...commonProps} to='/rtl-submenus'>
                            Right-to-Left
                        </Link>
                    </li>
                    <li className='pure-menu-item'>
                        <Link {...commonProps} to='/nested'>
                            Nested
                        </Link>
                    </li>
                </ul>
            </div>
            <Routes>
                <Route path='/simple-menu' element={<SimpleMenu />} />
                <Route path='/multiple-targets' element={<MultipleTargets />} />
                <Route path='/multiple-menus' element={<MultipleMenus />} />
                <Route path='/submenus' element={<SubMenus />} />
                <Route path='/dynamic-menu' element={<DynamicMenu />} />
                <Route path='/customization' element={<Customization />} />
                <Route path='/rtl-submenus' element={<RTLSubMenu />} />
                <Route path='/nested' element={<Nested />} />
            </Routes>
        </div>
    );
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('main')
);
