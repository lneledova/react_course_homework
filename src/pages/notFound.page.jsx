import React from 'react'
import { Link } from 'react-router-dom';

export function NotFoundPage()  {
    return (
        <>
            <h1 style={{margin: 'auto'}}> 404 Not Found</h1>
            <Link  to='/'>
                <h2> Home </h2>
            </Link>
        </>
    );
}
