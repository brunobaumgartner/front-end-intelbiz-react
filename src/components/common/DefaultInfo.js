import React from 'react';
import '../../assets/styles/DefaultInfo.css'

export default function DefaultInfo({ children }) {
    return (
        <div id='DefaultInfo'>
            <div id='InfoCol'>
                {children}
            </div>
        </div>
    );
}
