import { useState } from 'react';
import styled from 'styled-components';
import CVlist from './CVlist';
import AddCommentCV from './AddCommentCV';
import ShareCV from './ShareCV';
import EditCV from './EditCV';
import MainAndRightLayout from '../../layouts/MainAndRightLayout';

const CV = styled.h1`
  border: 1px solid blue;
  background-color: white;
`;

const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showMainContent, setShowMainContent] = useState('CVlist');
  const [userSelectedId, setUserSelectedId] = useState(null);
  return (
    <MainAndRightLayout
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
      right={<CV>cv</CV>}
    />
  );
};

export default AdminDashboard;
