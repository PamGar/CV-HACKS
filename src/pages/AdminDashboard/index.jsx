import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../layouts/navigation';
import CVlist from './CVlist';
import AddCommentCV from './AddCommentCV';
import ShareCV from './ShareCV';
import EditCV from './EditCV';
const Stickyp = styled.p`
  border: 1px solid blue;
  margin: 20px;
`;

const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showMainContent, setShowMainContent] = useState('CVlist');
  return (
    <Layout
      main={
        showMainContent === 'CVlist' ? (
          <CVlist
            openModal={openModal}
            setOpenModal={setOpenModal}
            setShowMainContent={setShowMainContent}
          />
        ) : showMainContent === 'comments' ? (
          <AddCommentCV setShowMainContent={setShowMainContent} />
        ) : showMainContent === 'edit' ? (
          <EditCV setShowMainContent={setShowMainContent} />
        ) : showMainContent === 'share' ? (
          <ShareCV setShowMainContent={setShowMainContent} />
        ) : null
      }
      right={
        <>
          <Stickyp>CV </Stickyp>
        </>
      }
    />
  );
};

export default AdminDashboard;
