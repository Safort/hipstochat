import React, { Component } from 'react';
import { Link } from 'react-router';

let Contact = ({address, name}) => {
    return (
        <Link className='menu-contacts__item' to={`/pm/${address}`}>
            {name}
        </Link>
    );
};

let Plus = () => {
    return (
        <Link className='menu-contacts__plus' to={`/contacts/add`}>+</Link>
    );
};

export default ({list}) => {
    const contacts = list.map(({name, address}, i) => {
        return <Contact key={i} name={name} address={address}/>
    });

    return (
        <div className='menu-contacts'>
            <header className='menu-contacts__header'>
                <div className='menu-contacts__title'>
                    Contacts {`(${contacts.length})`}
                </div>
                <Plus />
            </header>
            <div className='menu-contacts__list'>{contacts}</div>
        </div>
    );
};
