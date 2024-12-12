import React, { useImperativeHandle, forwardRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import addPhotoIcon from '../../container/Resume/img/addPhotoIcon.png';

const FileUploadContainer = styled.div`
    position: absolute;
    top: ${(props) => props.top || '430px'};
    left: ${(props) => props.left || '1330px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    z-index: 10; /* 다른 요소 위에 나타나도록 조정 */
`;

const FileInputLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 205px;
    height: 255px;
    border: 2px dashed #00257A;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    background-color: #F6F6F6;

    img {
        width: 24px;
        height: 24px;
    }

    p {
        font-size: 12px;
        color: #00257A;
        margin: 0;
    }

    &:hover {
        border-color: #001A5A;
    }
`;

const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const FileUploadComponent2 = forwardRef(({ top, left, onUploadSuccess }, ref) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("파일을 선택하세요!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            

            if (onUploadSuccess) {
                onUploadSuccess(response.data); // 업로드된 파일명을 상위 컴포넌트로 전달
            }
        } catch (error) {
            console.error(error);
            
        }
    };

    useImperativeHandle(ref, () => ({
        upload: handleUpload,
    }));

    return (
        <FileUploadContainer top={top} left={left}>
            <FileInputLabel htmlFor="fileUpload">
                {previewSrc ? (
                    <PreviewImage src={previewSrc} alt="미리보기" />
                ) : (
                    <>
                        <img src={addPhotoIcon} alt="파일 추가 아이콘" />
                        <p>사진 추가</p>
                    </>
                )}
            </FileInputLabel>
            <input
                id="fileUpload"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </FileUploadContainer>
    );
});

export default FileUploadComponent2;
