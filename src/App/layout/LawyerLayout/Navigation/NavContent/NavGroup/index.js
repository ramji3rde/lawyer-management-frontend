import React from 'react';
import Aux from "../../../../../../hoc/_Aux";
import NavCollapse from './../NavCollapse';
import NavItem from './../NavItem';
import { useSelector } from 'react-redux';

const NavGroup = (props) => {
    const { user } = useSelector(state => state.user.token)
    let navItems = '';
    if (props.group.children) {
        const groups = props.group.children;
        navItems = Object.keys(groups).map(item => {
            item = groups[item];
            switch (item.type) {
                case 'collapse':
                    return <NavCollapse key={item.id} collapse={item} type="main" />;
                case 'item':
                    return !user.isOwner && item.title === "Firm" && !user.foreverOwner
                        ? false
                        : <NavItem user={user} layout={props.layout} key={item.id} item={item} />
                default:
                    return false;
            }
        });
    }

    return (
        <Aux>
            <li key={props.group.id} className="nav-item pcoded-menu-caption"><label>{props.group.title}</label></li>
            {navItems}
        </Aux>
    );
};

export default NavGroup;