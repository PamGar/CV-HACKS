import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import LanguagesEdit from './languagesEdit';
import { AccordeonBox, ButtonBox } from './EditStyledComponents';
import CertificationsEdit from './certificationsEdit';
import AwardEdit from './awardEdit';
import PublicationsEdit from './publicationsEdit';
import AboutEdit from './aboutEdit';
import OrganisationEdit from './organisationEdit';
import SkillsEdit from './skillsEdit';
import InterestEdit from './interestsEdit';

const Form = styled.form`
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  input::placeholder {
    color: #888;
  }

  p {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }

  label {
    font-weight: 500;
    margin: 10px 0 5px 10px;
  }

  h3 {
    font-weight: 500;
  }

  input {
    border-radius: 10px;
    padding: 15px 10px;
    background-color: #ededed;
  }

  input:focus {
    outline: none !important;
    border-color: #63b2b3;
    box-shadow: 0 0 10px #63b2b3;
  }

  @media (max-width: 1099px) {
    width: 100%;
  }
`;

const EditCV = ({ editButton, cvId }) => {
  /* const itemsEls = useRef([]);
  const getRef = (element) => itemsEls.current.push(element);
  useEffect(() => {
    itemsEls.current.forEach((key) =>
      key.addEventListener('click', () => {
        key.classList.toggle('hide');
      })
    );
  }, []); */

  return (
    <>
      <Form>
        <AboutEdit cvId={cvId} />
        <OrganisationEdit cvId={cvId} />
        <AwardEdit cvId={cvId} />
        <SkillsEdit cvId={cvId} />
        <LanguagesEdit cvId={cvId} />
        <InterestEdit cvId={cvId} />
        {/* <CertificationsEdit cvId={cvId} />
        <PublicationsEdit cvId={cvId} /> */}
      </Form>
      <ButtonBox>
        <Button type="button" onClick={editButton}>
          Volver
        </Button>
      </ButtonBox>
    </>
  );
};

export default EditCV;
