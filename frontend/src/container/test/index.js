import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilledButton from '../../components/FilledButton';

function Index() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/data')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));    
    }, []);

    console.log(data)
    return (
        <div>
            <h1>My Data</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name} / {item.logoUrl} </li>
                ))}
            </ul>
            <FilledButton size = "md" color='blue'>Component 테스트</FilledButton>
        </div>
    );
}

export default Index;