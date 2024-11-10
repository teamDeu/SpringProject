import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilledButton from '../../components/FilledButton';

function Index() {
    const [data, setData] = useState([]);
    const [company, setCompany] = useState({
        id :'dfaasdf',
        name: 'Example Company',
        logoUrl: 'https://example.com/logo.png'
    });

    useEffect(() => {
        // GET 요청으로 데이터를 가져옵니다.
        axios.get('http://localhost:8080/api/data')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));    
    }, []);
    // 테스트를 위한 주석
    const handlePostRequest = () => {
        // POST 요청으로 새로운 데이터를 서버에 저장합니다.
        axios.post('http://localhost:8080/api/company', company)
            .then(response => {
                // 저장 후 데이터를 다시 가져와 화면을 업데이트합니다.
                setData(prevData => [...prevData, response.data]);
            })
            .catch(error => console.error('Error posting data:', error));
    };

    return (
        <div>
            <h1>My Data</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name} / {item.logoUrl}</li>
                ))}
            </ul>
            <FilledButton size="md" color="blue" onClick={handlePostRequest}>
                Component 테스트
            </FilledButton>
        </div>
    );
}

export default Index;
