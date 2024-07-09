import React from 'react';
import '../../assets/styles/DefaultInput.css'

export default function DefaultInput(props) {
    return (
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">{props.label}</span>
            <input type={props.type} class="form-control" id={props.id} value = {props.value} onChange={props.onChange} step={props.step} disabled={props.desabilitar} />
        </div>
    );
}
