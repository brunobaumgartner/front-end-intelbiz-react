import React from 'react';
import '../../assets/styles/Header.css'

export default function Header(props) {
    return (
        <div id='Header'>
            <h3>{props.page}</h3>
        </div>
    );
}
