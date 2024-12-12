import React, { useImperativeHandle, forwardRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FileUploadContainer = styled.div`
    position: absolute;
    top: ${(props) => props.top || '0px'};
    left: ${(props) => props.left || '0px'};
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const FileUploadComponent = forwardRef(({ top, left }, ref) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('파일을 선택하세요!');
            return null; // 실패 시 null 반환
        }
    
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        try {
            const response = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            return response; // 업로드 성공 시 response 반환
        } catch (error) {
            console.error("파일 업로드 에러:", error);
            alert('파일 업로드 실패!');
            return null; // 실패 시 null 반환
        }
    };
    
    useImperativeHandle(ref, () => ({
        upload: handleUpload,
    }));
    

    return (
        <FileUploadContainer top={top} left={left}>
            <input type="file" onChange={handleFileChange} />
        </FileUploadContainer>
    );
});

export default FileUploadComponent;
