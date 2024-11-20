import React, { useEffect, useState } from 'react';
import { GetAllCompanies, PostCompany } from '../../api/api';

const Index = () => {
    const [data, setData] = useState([]); // 초기값을 빈 배열로 설정
    const company = {
        id: "als962005",
        companyName: "BigJade",
        employees: 100,
    };

    const handleOnClick = () => {
        PostCompany(company).then(() => {
            console.log("Post 완료");
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await GetAllCompanies(); // 데이터를 가져옴
                console.log("데이터 가져옴:", responseData);
                setData(responseData); // 가져온 데이터를 상태에 저장
            } catch (error) {
                console.error("데이터 가져오는데 실패:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <button onClick={handleOnClick}>테스트 데이터 입력</button>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.companyName}</li> // companyName 표시
                ))}
            </ul>
        </div>
    );
};

export default Index;
