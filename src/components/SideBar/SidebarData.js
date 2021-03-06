import React from 'react'
import * as BiIcons  from 'react-icons/bi';
import * as BsIcons  from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';


export const SidebarData = [
    {
        title: 'Map',
        path: '/',
        icon: <BsIcons.BsMap/>,
        cName: 'nav-text'
    },
    {
        title: 'Add a location',
        path: '/AddLocation',
        icon: <BiIcons.BiCommentAdd/>,
        cName: 'nav-text'
    },

    {
        title: 'Locations Details',
        path: '/LocationsDetails',
        icon: <BiIcons.BiCommentDetail/>,
        cName: 'nav-text'
    },

    {
        title: 'Preferences',
        path: '/Preferences',
        icon: <MdIcons.MdFavorite/>,
        cName: 'nav-text'
    }


]