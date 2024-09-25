import React, { useCallback, useEffect, useState } from 'react';
import Buscar from "../../scripts/Buscar.js";
const buscar = new Buscar();


export default function DefaultClima(props) {
    const [linkImg, setLinkImg] = useState('');
    const [sClima, setSClima] = useState('');
    const busca_clima = useCallback(() => {
        buscar.busca_clima()
        .then(clima => {
            setLinkImg(clima['img']);
            setSClima(clima['clima']);
        })
    }, [])
    useEffect(() => {
        busca_clima();
    }, [busca_clima])
    
    return (
        <div>
            <h5>Clima</h5>
            <img src={linkImg} alt={sClima} title={sClima}/>
        </div>
    );
}
