import React from 'react';
import '../../assets/styles/DefaultInput.css'

export default function DefaultInput(props) {
    return (
        <div class="mb-3">
            <label for={props.id} class="form-label">{props.label}</label>
            <input type="text" class="form-control" id={props.id} placeholder={props.label}/>
        </div>
    );
}
