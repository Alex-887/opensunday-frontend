import React from 'react'
import * as RiIcons  from 'react-icons/ri';
import * as BsIcons  from 'react-icons/bs';

export const SidebarData = [
    {
        title: 'Map',
        path: '/',
        icon: <BsIcons.BsMap/>,
        cName: 'nav-text'
    },
    {
        title: 'Locations Management',
        path: '/LocationsManagement',
        icon: <RiIcons.RiListSettingsFill/>,
        cName: 'nav-text'
    }

]