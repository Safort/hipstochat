import React, { Component } from 'react';

// dummy
let list = [
    {id: 1, name: 'user-a', text: `some text`, date: '4:42 PM'},
    {id: 2, name: 'user-a', text: 'some text', date: '4:42 PM'},
    {id: 3, name: 'user-a', text: 'some text', date: '5:42 PM'},
    {id: 4, name: 'user-b', text: 'some text', date: '4:42 PM'},
    {id: 5, name: 'user-a', text: 'some text', date: '1:42 PM'},
    {id: 6, name: 'user-b', text: 'some text', date: '4:42 PM'},
    {id: 7, name: 'user-a', text: 'some text', date: '1:42 PM'},
    {id: 8, name: 'user-b', text: 'some text', date: '4:42 PM'},
    {id: 9, name: 'user-a', text: 'some text', date: '4:42 PM'},
    {id: 10, name: 'user-b', text: 'some text', date: '4:42 PM'},
    {id: 12, name: 'user-a', text: 'some text', date: '4:42 PM'},
    {id: 13, name: 'user-a', text: 'some text', date: '4:42 PM'},
    {id: 14, name: 'user-a', text: 'some text', date: '4:42 PM'},
    {id: 15, name: 'user-a', text: 'some text', date: '4:42 PM'},
    {id: 16, name: 'user-a', text: 'some text', date: '4:42 PM'}
];

let Message = ({name, text, date}) => {
    return (
        <div className='pm-message'>
            <div className='pm-message__avatar'></div>
            <div className='pm-message__content'>
                <div className='pm-message__username'>{name}</div>
                <div className='pm-message__date'>{date}</div>
                <div className='pm-message__text'>{text}</div>
            </div>
        </div>
    );
};

let Form = ({name, text, date}) => {
    return (
        <form className='pm-form'>
            <textarea className='pm-form__input'></textarea>
            <div className='pm-panel'>
                <input className='pm-form__send' type='submit' value='Send' />
            </div>
        </form>
    );
};

export default class Pm extends Component {
    render() {
        let messages = list.map(({name, date, id, text}) => {
            return (
                <Message
                    key={id} name={name}
                    text={text} date={date}
                />
            );
        });

        return (
            <div className='pm'>
                <div className='pm-list'>{messages}</div>
                <Form />
            </div>
        );
    }
};
