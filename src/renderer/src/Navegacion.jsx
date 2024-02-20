import React from 'react';

function Navegacion() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/Responsive">Responsive</Link>
                </li>
                <li>
                    <Link to="/Lista">Lista</Link>
                </li>
                <li>
                    <Link to="/Reactividad">Reactividad</Link>
                </li>
                <li>
                    <Link to="/Recarga">Recarga</Link>
                </li>
                <li>
                    <Link to="/Crud">Crud</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navegacion;