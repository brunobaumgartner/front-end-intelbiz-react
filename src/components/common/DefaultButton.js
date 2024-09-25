import React from 'react';
import '../../assets/styles/DefaultButton.css'

export default function DefaultButton(props) {
    return (
        <button type="button" className="btn button" onClick={props.onClick} id={props.id}>{props.label}</button>
    );
}
