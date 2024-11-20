import React from 'react';
import styled from 'styled-components';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import AddButton from '../../components/admin/AddButton';

const Container = styled.div`
  display: flex;
  
`;

const Content = styled.div`
  padding: 20px;
  flex: 1;
  position: relative;
`;

const Announcements = () => {
    return (
        <Container>
        <Menu />
        <Content>
          <PageHeader title="공지사항" />
          <AddButton
            to="/awrite"
            iconSrc="/icons/plusbtn.png"
            altText="Plus Button"
          >
            추가
          </AddButton>
        </Content>
      </Container>
    );
};

export default Announcements;
