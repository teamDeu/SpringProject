import React from 'react';

const PageHeader = ({ title }) => {
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                {title}
            </h1>
        </div>
    );
};

export default PageHeader;
