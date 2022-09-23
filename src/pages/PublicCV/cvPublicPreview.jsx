import React, { useRef } from 'react';
import { useReactToPrint /* generateAndSavePDF */ } from 'react-to-print';
import styled from 'styled-components';
// import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf.js';
// import { jsPDF } from 'jspdf';
// import Button from '../Buttons/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faPenToSquare,
  faFileArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import Github from '../../assets/icons/Github.svg';
import Gitlab from '../../assets/icons/Gitlab.svg';
import Instagram from '../../assets/icons/Instagram.svg';
import LinkedIn from '../../assets/icons/LinkedIn.svg';
import Twitter from '../../assets/icons/Twitter.svg';
import Stackoverflow from '../../assets/icons/Stackoverflow.svg';
import Logo from '../../assets/images/logo_color.png';

const Page = styled.div`
  width: 800px;
  padding: 20px;

  .page {
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
  }

  h1 {
    position: relative;
  }

  h1:after {
    content: '';
    width: 80%;
    height: 20px;
    background-color: #ade8e8;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 5px;
    z-index: -1;
  }

  .header_sub {
    display: flex;
    justify-content: center;

    p {
      margin: 0 10px;
    }
  }

  .section1 {
    display: flex;

    div {
      width: 50%;

      p {
        text-align: left;
      }
    }
  }
`;

const Wrapper = styled.div`
  background-color: #fff;
  text-align: center;
  /* box-shadow: 2px 1px 7px #00000057; */
  padding: 20px 30px;
  border-radius: 10px;
  margin: 20px;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 16px;
    background-color: #0babb4;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 2px 1px 7px #00000057;
  }

  .tags {
    background-color: #4b454f;
    padding: 5px 10px;
    border-radius: 10px;
    color: #fff;
  }

  @media (max-width: 820px) {
    box-shadow: unset;
    background-color: unset;
    padding: 10px;
  }
`;

const BoxColumn = styled.div`
  padding: 15px 10px;
  text-align: left;

  & > div {
    margin-bottom: 15px;
  }

  img {
    width: 25px;
  }

  a {
    text-decoration: none;
  }

  p {
    margin: 5px 0;
  }

  .item {
    margin-bottom: 20px;
  }

  .first {
    font-size: 14px;
    font-weight: bold;
  }

  .second {
    color: #8d8d8d;
  }

  .third {
    color: #bfbfbf;
  }

  .calendar path {
    color: #bfbfbf;
  }

  .center {
    text-align: center;
  }

  li {
    list-style-type: none;
  }
`;

const BoxFlex = styled(BoxColumn)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    margin: 10px 0;
  }
`;

const Header = styled(BoxFlex)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  h1 {
    margin: 20px;
  }

  p {
    margin: 0 5px;
  }

  div {
    max-width: unset;
    margin-bottom: 0;
  }

  .profileImage {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 0px 10px #a0a0cc5c;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const HeaderCV = styled(Header)`
  justify-content: space-between;
  flex-wrap: nowrap;

  .profileImage {
    flex: 0 0 80px;
  }

  .logoHackademy {
    width: 80px;
    height: 80px;
    flex: 0 0 80px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const BoxColumnCV = styled(BoxColumn)`
  page-break-inside: avoid;

  /* div:nth-child(1) {
    page-break-after: avoid;
  } */

  /* div h2 {
    background-color: grey;
    page-break-after: avoid;
  } */

  h2 {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
  }
`;
const BoxFlexCV = styled(BoxFlex)`
  justify-content: space-between;
  align-items: flex-start;

  h2 {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    margin-bottom: 10px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    margin-right: 10px;
  }

  .center {
    text-align: center;
  }

  & > div {
    width: 45%;
  }
`;

const CV_preview = ({
  editButton,
  dataLoaded,
  cvData,
  userData,
  displayButtons,
  downloadAdmin,
}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const widthRef = useRef();
  const userRole = localStorage.getItem('role');
  const cvLanguage = 1;

  const getPageMargins = () => {
    return `@page { margin: ${'20px'} ${'50px'} ${'50px'} ${'50px'} !important; }`;
  };

  console.log(cvData);

  return (
    <>
      <Wrapper>
        <Header>
          <div>
            <BoxColumn
              style={{
                textAlign: 'center',
                padding: '0',
              }}
            >
              <h3>{cvData.cv.area}</h3>
              <p style={{ textAlign: 'center' }}>
                {cvData.cv.user?.address ? cvData.cv.user?.address : null}{' '}
              </p>
            </BoxColumn>
          </div>
        </Header>
        {!cvData.cv.tags ? null : (
          <div>
            <h2>
              {cvLanguage === 1
                ? 'Tecnologías y herramientas que maneja'
                : 'Technologies and tools'}
            </h2>
            <BoxFlex style={{ flexWrap: 'wrap', justifyContent: 'left' }}>
              {cvData.cv.tags.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="center"
                    style={{ margin: '0 10px 0 0 ' }}
                  >
                    <p className="tags">{item.name}</p>
                  </div>
                );
              })}
            </BoxFlex>
          </div>
        )}
        {cvData.educations.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Educación' : 'Education'}</h2>
            <BoxColumn>
              {cvData.educations
                .sort((a, b) => {
                  return new Date(b.start_date) - new Date(a.start_date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id}>
                      <p className="first">
                        {item.major}
                        {' • '}
                        <span className="third">{item.degree}</span>
                      </p>
                      <p>{item.description}</p>
                      <p className="third">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="calendar"
                        />{' '}
                        {item.start_date}
                        {' • '}
                        {item.end_date === null ? 'Actualmente' : item.end_date}
                      </p>
                    </div>
                  ) : null;
                })}
            </BoxColumn>
          </div>
        )}
        {cvData.languages.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Lenguajes' : 'Languages'}</h2>
            <BoxFlex>
              {cvData.languages.map((item) => {
                return item.public ? (
                  <div key={item.id} className="center">
                    <p className="first">
                      {item.title}
                      {' • '}
                      <span className="third">{item.level}</span>
                    </p>
                    <p className="second">{item.subtitle}</p>
                  </div>
                ) : null;
              })}
            </BoxFlex>
          </div>
        )}
        {cvData.courses.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Cursos' : 'Courses'}</h2>
            <BoxColumn>
              {cvData.courses
                .sort((a, b) => {
                  return new Date(b.start_date) - new Date(a.start_date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id}>
                      <p className="first">
                        {item.title}
                        {' • '}
                        <span className="third">{item.subtitle}</span>
                      </p>
                      <p className="second">{item.description}</p>
                      <p className="third">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="calendar"
                        />{' '}
                        {item.start_date} {' • '}{' '}
                        {item.end_date === null ? 'Actualmente' : item.end_date}
                      </p>
                    </div>
                  ) : null;
                })}
            </BoxColumn>
          </div>
        )}
        {cvData.certifications.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Certificaciones' : 'Certifications'}</h2>
            <BoxFlex>
              {cvData.certifications
                .sort((a, b) => {
                  return (
                    new Date(b.expedition_date) - new Date(a.expedition_date)
                  );
                })
                .map((item) => {
                  return item.public ? (
                    <div
                      key={item.id}
                      style={{ width: '45%', textAlign: 'left' }}
                    >
                      <p className="first">{item.name}</p>
                      <p className="third">{item.company}</p>
                      {!item.credential_id ? null : (
                        <p className="third">
                          <span className="second">{'id: '}</span>
                          {item.credential_id}
                        </p>
                      )}
                      <p className="third">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="calendar"
                        />{' '}
                        {item.expedition_date}
                        {' • '}
                        {item.expiry_date === null
                          ? 'Actualmente'
                          : item.expiry_date}
                      </p>
                    </div>
                  ) : null;
                })}
            </BoxFlex>
          </div>
        )}
        {cvData.experiences.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Experiencia' : 'Experience'}</h2>
            <BoxColumn>
              {cvData.experiences
                .sort((a, b) => {
                  return new Date(b.start_date) - new Date(a.start_date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id}>
                      <p className="first">
                        {item.role}
                        {' • '}
                        <span className="third">{item.company_name}</span>
                      </p>
                      <p className="Second">{item.description}</p>
                      <p className="third">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="calendar"
                        />{' '}
                        {item.start_date}
                        {' • '}
                        {item.end_date === null ? 'Actualmente' : item.end_date}
                      </p>
                    </div>
                  ) : null;
                })}
            </BoxColumn>
          </div>
        )}
        {cvData.organisations.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Comunidades' : 'Communities'}</h2>
            <BoxColumn>
              {cvData.organisations
                .sort((a, b) => {
                  return new Date(b.start_date) - new Date(a.start_date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id}>
                      <p className="first">
                        {item.title}
                        {' • '}
                        <span className="third">{item.subtitle}</span>
                      </p>
                      <p className="second">{item.description}</p>
                      <p className="third">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="calendar"
                        />{' '}
                        {item.start_date}
                        {' • '}
                        {item.end_date === null ? 'Actualmente' : item.end_date}
                      </p>
                    </div>
                  ) : null;
                })}
            </BoxColumn>
          </div>
        )}
        {cvData.projects.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Proyectos' : 'Projects'}</h2>
            <BoxColumn>
              {cvData.projects
                .sort((a, b) => {
                  return new Date(b.start_date) - new Date(a.start_date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id}>
                      <p className="first">
                        {item.title}
                        {' • '}
                        <span className="third">
                          {item.additional_information}
                        </span>
                      </p>
                      <p className="second">{item.description}</p>
                      <p className="third">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="calendar"
                        />{' '}
                        {item.start_date}
                        {' • '}
                        {item.end_date === null ? 'Actualmente' : item.end_date}
                      </p>
                    </div>
                  ) : null;
                })}
            </BoxColumn>
          </div>
        )}
        {cvData.publications.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Publicaciones' : 'Publications'}</h2>
            <BoxColumn>
              {cvData.publications
                .sort((a, b) => {
                  return new Date(b.date) - new Date(a.date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id}>
                      <p className="first">
                        {item.title}
                        {' • '}
                        <span className="third">{item.subtitle}</span>
                      </p>
                      <p className="second">{item.description}</p>
                      {!item.date ? null : (
                        <p className="third">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="calendar"
                          />{' '}
                          {item.date}
                        </p>
                      )}
                    </div>
                  ) : null;
                })}
            </BoxColumn>
          </div>
        )}
        {cvData.awards.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Premios' : 'Awards'}</h2>
            <BoxColumn>
              {cvData.awards
                .sort((a, b) => {
                  return new Date(b.date) - new Date(a.date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id} className="item">
                      <div className="header">
                        <p className="first">
                          {item.title}
                          {' • '}
                          <span className="third">{item.subtitle}</span>
                        </p>
                      </div>
                      <p className="second">{item.description}</p>
                      <p className="third">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="calendar"
                        />{' '}
                        {item.date}
                      </p>
                    </div>
                  ) : null;
                })}
            </BoxColumn>
          </div>
        )}
        {/* {cvData.skills.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>Skills</h2>
            <BoxColumn>
              {cvData.skills.map((item) => {
                return item.public ? (
                  <div key={item.id} className="item">
                    <p className="first">{item.title}</p>
                    <p className="second">{item.subtitle}</p>
                  </div>
                ) : null;
              })}
            </BoxColumn>
          </div>
        )} */}
        {cvData.intersts.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Intereses' : 'Interests'}</h2>
            <BoxColumn>
              {cvData.intersts.map((item) => {
                return item.public ? (
                  <div key={item.id} className="item">
                    <p className="first">{item.title}</p>
                    <p className="second">{item.subtitle}</p>
                  </div>
                ) : null;
              })}
            </BoxColumn>
          </div>
        )}
      </Wrapper>
      {/* <ButtonBox style={{ display: displayButtons }}>
        {!downloadAdmin && (
          <Button type="button" onClick={editButton} disabled={dataLoaded}>
            <FontAwesomeIcon icon={faPenToSquare} className="calendar" /> Editar
          </Button>
        )}
        <Button
          type="button" onClick={handlePrint}
          disabled={dataLoaded}
        >
          <FontAwesomeIcon icon={faFileArrowDown} className="calendar" />{' '}
          Descargar
        </Button>
      </ButtonBox> */}
    </>
  );
};

export default CV_preview;
