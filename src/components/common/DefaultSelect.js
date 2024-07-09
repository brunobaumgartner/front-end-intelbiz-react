import React from 'react';
import '../../assets/styles/DefaultSelect.css';

export default function DefaultSelect(props) {
    return (
        


        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">{props.label}</span>
            <select className="form-select" key={props.id} aria-label="Default select example" id={props.id} onChange={props.onChange}>
            <option value=''>SELECIONE</option>
            {props.opcoes.map((option, index) => {
                return (
                    <option key={option.id} value={option.id}>{option.value}</option>
                );
            })}
        </select>
        </div>
    );
}
