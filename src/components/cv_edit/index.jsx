import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LanguagesEdit from './languagesEdit';
import { ButtonBox, ButtonBoxSticky } from './EditStyledComponents';
import CertificationsEdit from './certificationsEdit';
import AwardEdit from './awardEdit';
import PublicationsEdit from './publicationsEdit';
import AboutEdit from './aboutEdit';
import OrganisationEdit from './organisationEdit';
import SkillsEdit from './skillsEdit';
import InterestEdit from './interestsEdit';
import EducationEdit from './educationEdit';
import CoursesEdit from './courseEdit';
import JobEdit from './jobEdit';
import ProjectsEdit from './projectsEdit';

const Wrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 2px 1px 7px #00000057;
  margin-bottom: 20px;

  input::placeholder {
    color: #888;
  }

  p {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }

  label {
    margin: 10px 0 5px 10px;
    font-size: 14px;
  }

  h3 {
    font-weight: 500;
  }

  input {
    border-radius: 15px;
    padding: 15px 10px;
    background-color: #ededed;
  }

  input:focus {
    outline: none !important;
    border-color: #63b2b3;
    box-shadow: 0 0 10px #63b2b3;
  }

  button {
    background-color: #08adb4;

    &:hover {
      background-color: #08adb4;
      opacity: 0.5;
    }

    &:active {
      background-color: #07949b;
    }
  }

  @media (max-width: 820px) {
    width: 100%;
    padding: 0px;
    background-color: unset;
    box-shadow: unset;
  }
`;

const EditCV = ({ editButton, cvId, refreshCvData }) => {
  return (
    <>
      <Wrapper>
        <AboutEdit cvId={cvId} refreshCvData={refreshCvData} />
        <EducationEdit cvId={cvId} refreshCvData={refreshCvData} />
        <LanguagesEdit cvId={cvId} refreshCvData={refreshCvData} />
        <CoursesEdit cvId={cvId} refreshCvData={refreshCvData} />
        <CertificationsEdit cvId={cvId} refreshCvData={refreshCvData} />
        <OrganisationEdit cvId={cvId} refreshCvData={refreshCvData} />
        <JobEdit cvId={cvId} refreshCvData={refreshCvData} />
        <PublicationsEdit cvId={cvId} refreshCvData={refreshCvData} />
        <ProjectsEdit cvId={cvId} refreshCvData={refreshCvData} />
        <AwardEdit cvId={cvId} refreshCvData={refreshCvData} />
        <SkillsEdit cvId={cvId} refreshCvData={refreshCvData} />
        <InterestEdit cvId={cvId} refreshCvData={refreshCvData} />
      </Wrapper>
      <ButtonBoxSticky>
        <Button type="button" onClick={editButton}>
          <FontAwesomeIcon icon={faArrowLeft} className="calendar" />
          Volver
        </Button>
      </ButtonBoxSticky>
    </>
  );
};

export default EditCV;
