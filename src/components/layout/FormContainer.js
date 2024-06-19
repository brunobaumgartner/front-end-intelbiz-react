import React from 'react';
import '../../assets/styles/FormContainer.css'

export default function FormContainer({ children }) {
    return (
        <div className='container-fluid' id='FormContainer'>
            {children}
        </div>
    );
}
