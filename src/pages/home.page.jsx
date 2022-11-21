import React from 'react'
import { Link } from 'react-router-dom';

export function HomePage() {
    return (
        <>
            <h1 style={{margin: 'auto'}}> Домашняя страница </h1>
            <Link  to='/articles'>
                <h2> Articles</h2>
            </Link>
        </>
    );
}
