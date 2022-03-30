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
  const [userSelectedId, setUserSelectedId] = useState(null);
  return (
    <Layout
      main={
        showMainContent === 'CVlist' ? (
          <CVlist
            openModal={openModal}
            setOpenModal={setOpenModal}
            setShowMainContent={setShowMainContent}
            userSelectedId={userSelectedId}
            setUserSelectedId={setUserSelectedId}
          />
        ) : showMainContent === 'comments' ? (
          <AddCommentCV
            setShowMainContent={setShowMainContent}
            userSelectedId={userSelectedId}
          />
        ) : showMainContent === 'edit' ? (
          <EditCV
            setShowMainContent={setShowMainContent}
            userSelectedId={userSelectedId}
          />
        ) : showMainContent === 'share' ? (
          <ShareCV
            setShowMainContent={setShowMainContent}
            userSelectedId={userSelectedId}
          />
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
