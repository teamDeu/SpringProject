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
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert(`파일 업로드 성공! 저장 경로: ${response.data.filePath}`);
        } catch (error) {
            console.error(error);
            alert('파일 업로드 실패!');
        }
    };

    useImperativeHandle(ref, () => ({
        upload: handleUpload,
    }));

    return (
        <FileUploadContainer top={top} left={left}>
            <input type="file" onChange={handleFileChange} ref={ref}/>
        </FileUploadContainer>
    );
});

export default FileUploadComponent;
