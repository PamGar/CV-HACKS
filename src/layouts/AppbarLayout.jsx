import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import AppbarAdmin from './AppBars/AppbarAdmin';
import AppbarCompany from './AppBars/AppbarCompany';
import AppbarPadawan from './AppBars/AppbarPadawan';

const Layout = styled.div`
  padding: 0 30px;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 30px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 80px 1fr;
    padding: 0;
    gap: 20px;
  }
  .active {
    color: #565696;
    background-color: #5656960a;
  }
`;

const FlexWrapper = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 30px;
  display: flex;
  flex-direction: column;
  z-index: 90;
  @media (max-width: 1000px) {
    top: 0;
    flex-direction: row;
  }
`;

const MainWrapper = styled.div`
  @media (max-width: 1000px) {
    padding: 0 20px;
    width: 100vw;
  }
`;

const AppbarLayout = ({ role }) => {
  return (
    <Layout>
      <FlexWrapper>
        {(role == 5 || role == 4) && <AppbarPadawan />}
        {role == 2 && <AppbarAdmin />}
        {role == 3 && <AppbarCompany />}
      </FlexWrapper>
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </Layout>
  );
};

export default AppbarLayout;
