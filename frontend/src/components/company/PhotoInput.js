import React, { useEffect, useState } from "react";
import styled from "styled-components";
const addIcon = process.env.PUBLIC_URL + '/icons/add.png';
const PhotoInput = ({updateImage , imageLength}) => {
  const [images, setImages] = useState([]);
  const [imageFile,setImageFile] = useState([]);
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    if (images.length + files.length > imageLength) {
      alert("최대 4개의 이미지만 업로드할 수 있습니다.");
      return;
    }

    const newImages = files.map((file) => URL.createObjectURL(file));
    setImageFile((prev) => [...prev,...files])
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFile((prev) => prev.filter((_, i) => i !== index));
  };
  useEffect(() => {
    updateImage(imageFile);
  },[images])
  return (
    <Container>
      <FileInputWrapper>
        <FileInput 
          id="file-upload" 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          multiple
          disabled={images.length >= imageLength}
        />
        <ImageContainer>
        {images.map((image, index) => (
          <ImageWrapper key={index}>
            <Image src={image} alt={`Uploaded ${index}`} />
            <RemoveButton onClick={() => handleRemoveImage(index)}>×</RemoveButton>
          </ImageWrapper>
        ))}
      </ImageContainer>
        <LabelContainer>

            <FileLabel htmlFor="file-upload" disabled={images.length >= imageLength}>
            <Icon src = {addIcon}/>
            {images.length >= imageLength ? "업로드 제한 (4개)" : "파일 선택"}
            </FileLabel>
        </LabelContainer>
      </FileInputWrapper>
      
    </Container>
  );
};

export default PhotoInput;

const Container = styled.div`
    display:flex;
    width : 100%;
    gap : 20px;
`;

const LabelContainer = styled.div`
    display: ${(props) => (props.disabled ? "none" : "flex")};
    background-color : #F6F6F6;
    width:250px;
    height:250px;
    align-items : center;
    justify-content : center;
`
const Icon = styled.img`
    width : 32px;
`
const FileInputWrapper = styled.div`
    display:flex;
    gap:20px;
  text-align: center;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  display: none; /* 숨김 */
`;

const FileLabel = styled.label`
  display: ${(props) => (props.disabled ? "none" : "flex")};
  align-items:center;
  justify-content:center;
  flex-direction : column;
  background-color: ${(props) => (props.disabled ? "#ccc" : "none")};
  color: #00257A;
  font-size : 24px;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;
