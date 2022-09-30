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
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import Github from '../../assets/icons/Github.svg';
import Gitlab from '../../assets/icons/Gitlab.svg';
import Instagram from '../../assets/icons/Instagram.svg';
import LinkedIn from '../../assets/icons/LinkedIn.svg';
import Twitter from '../../assets/icons/Twitter.svg';
import Stackoverflow from '../../assets/icons/Stackoverflow.svg';
import Logo from '../../assets/images/logo_color.png';
import Button from '../../components/Buttons/LoadingButton';

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
  padding: 20px 30px;
  border-radius: 10px;
  margin: 20px;
  max-width: 990px;
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

const ButtonBox = styled.div`
  padding: 20px;
  bottom: 20px;
  position: sticky;
  display: flex;
  justify-content: center;

  button {
    margin: 0 10px;
    background-color: #565696;
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

  h2 {
    font-size: 26px;
    background-color: transparent;
    color: #5e5e5e;
    padding: 0 5px;
    box-shadow: unset;
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

  button {
    background: transparent;
    width: 30px;
    cursor: pointer;

    &:hover {
      filter: opacity(50%);
    }

    svg {
      font-size: 18px;
    }
  }
`;

const BoxColumnCV = styled(BoxColumn)`
  page-break-inside: avoid;

  h2 {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
  }
`;
const BoxFlexCV = styled(BoxFlex)`
  page-break-inside: avoid;
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
  cvUuId,
}) => {
  const componentRef = useRef();
  const cvIdRef = useRef('');
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const widthRef = useRef();
  const userRole = localStorage.getItem('role');
  const cvLanguage = 1;

  const getPageMargins = () => {
    return `@page { margin: ${'20px'} ${'50px'} ${'50px'} ${'50px'} !important; }`;
  };

  const copyInviteCode = () => {
    /* Get the text field */
    var copyText = cvIdRef.current.innerText;

    /* Copy the text to the clipboard */
    navigator.clipboard.writeText(copyText);

    /* Alert the copied text */
    alert('Codigo del CV copiado: ' + copyText);
  };

  return (
    <>
      <Page style={{ display: 'none' }}>
        <div className="page_container" ref={widthRef}>
          <div className="page" ref={componentRef}>
            <style>{getPageMargins()}</style>
            <HeaderCV>
              {
                <div>
                  <BoxColumn
                    style={{
                      textAlign: 'left',
                      padding: '0',
                    }}
                  >
                    <h2>{cvData.cv.area}</h2>
                    <BoxFlex
                      style={{
                        textAlign: 'left',
                        paddingTop: `5px`,
                        paddingLeft: '0',
                      }}
                    >
                      <p style={{ textAlign: 'center' }}>
                        {cvData.cv.user?.address
                          ? cvData.cv.user?.address
                          : null}{' '}
                      </p>
                    </BoxFlex>
                  </BoxColumn>
                </div>
              }
              <div className="logoHackademy printhide">
                <img src={Logo} alt="logo" />
              </div>
            </HeaderCV>
            <BoxColumnCV>
              {cvData.experiences.filter((item) => item.admin_public === true)
                .length === 0 ? null : (
                <div>
                  <h2>{cvLanguage === 1 ? 'Experiencia' : 'Experience'}</h2>
                  {cvData.experiences
                    .filter((item) => item.admin_public === true)
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
                            {item.end_date === null
                              ? 'Actualmente'
                              : item.end_date}
                          </p>
                        </div>
                      ) : null;
                    })}
                </div>
              )}
            </BoxColumnCV>
            <BoxColumnCV>
              {/* {userData.about_me && (
                <div>
                  <h2>{cvLanguage === 1 ? 'Acerca de mi' : 'About me'}</h2>
                  <p>{userData.about_me}</p>
                </div>
              )} */}

              {cvData.educations.filter((item) => item.public === true)
                .length === 0 ? null : (
                <div>
                  <h2>{cvLanguage === 1 ? 'Estudios' : 'Education'}</h2>
                  {cvData.educations
                    .filter((item) => item.admin_public === true)
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
                          <p className="third">
                            <FontAwesomeIcon
                              icon={faCalendar}
                              className="calendar"
                            />{' '}
                            {item.start_date}
                            {' • '}
                            {item.end_date === null
                              ? 'Actualmente'
                              : item.end_date}
                          </p>
                        </div>
                      ) : null;
                    })}
                </div>
              )}
            </BoxColumnCV>
            <BoxColumnCV>
              {cvData.courses.filter((item) => item.public === true).length ===
              0 ? null : (
                <div>
                  <h2>{cvLanguage === 1 ? 'Cursos' : 'Courses'}</h2>
                  {cvData.courses
                    .filter((item) => item.admin_public === true)
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
                            {item.end_date === null
                              ? 'Actualmente'
                              : item.end_date}
                          </p>
                        </div>
                      ) : null;
                    })}
                </div>
              )}
            </BoxColumnCV>
            <BoxColumnCV>
              {cvData.certifications.filter((item) => item.public === true)
                .length === 0 ? null : (
                <div>
                  <h2>
                    {cvLanguage === 1 ? 'Certificaciones' : 'Certifications'}
                  </h2>
                  {cvData.certifications
                    .filter((item) => item.admin_public === true)
                    .sort((a, b) => {
                      return (
                        new Date(b.expedition_date) -
                        new Date(a.expedition_date)
                      );
                    })
                    .map((item) => {
                      return item.public ? (
                        <div key={item.id} style={{ padding: '0' }}>
                          <p className="first">{item.name}</p>
                          <p className="third">{item.company}</p>
                          {!item.credential_id ? null : (
                            <p className="second">
                              <span className="first">{'id: '}</span>
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
                </div>
              )}
            </BoxColumnCV>
            <BoxColumnCV>
              {cvData.organisations.filter((item) => item.public === true)
                .length === 0 ? null : (
                <div>
                  <h2>{cvLanguage === 1 ? 'Comunidades' : 'Communities'}</h2>
                  {cvData.organisations
                    .filter((item) => item.admin_public === true)
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
                            {item.end_date === null
                              ? 'Actualmente'
                              : item.end_date}
                          </p>
                        </div>
                      ) : null;
                    })}
                </div>
              )}
            </BoxColumnCV>
            <BoxColumnCV>
              {cvData.projects.filter((item) => item.public === true).length ===
              0 ? null : (
                <div>
                  <h2>{cvLanguage === 1 ? 'Proyectos' : 'Projects'}</h2>
                  {cvData.projects
                    .filter((item) => item.admin_public === true)
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
                            {item.end_date === null
                              ? 'Actualmente'
                              : item.end_date}
                          </p>
                        </div>
                      ) : null;
                    })}
                </div>
              )}
            </BoxColumnCV>
            <BoxFlexCV>
              {cvData.publications.filter((item) => item.public === true)
                .length === 0 ? null : (
                <div className="center">
                  <h2>{cvLanguage === 1 ? 'Publicaciones' : 'Publications'}</h2>
                  {cvData.publications
                    .filter((item) => item.admin_public === true)
                    .sort((a, b) => {
                      return new Date(b.date) - new Date(a.date);
                    })
                    .map((item) => {
                      return item.public ? (
                        <div key={item.id}>
                          <p className="first">
                            {item.title}
                            {' • '}
                            <span className="second">{item.subtitle}</span>
                          </p>
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
                </div>
              )}
              {cvData.awards.filter((item) => item.public === true).length ===
              0 ? null : (
                <div className="center">
                  <h2>{cvLanguage === 1 ? 'Premios' : 'Awards'}</h2>
                  {cvData.awards
                    .filter((item) => item.admin_public === true)
                    .sort((a, b) => {
                      return new Date(b.date) - new Date(a.date);
                    })
                    .map((item) => {
                      return item.public ? (
                        <div key={item.id} className="item">
                          <p className="first">
                            {item.title}
                            {' • '}
                            <span className="second">{item.subtitle}</span>
                          </p>
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
                </div>
              )}
              {!cvData.cv.tags ? null : (
                <div className="center">
                  <h2>Hard Skills</h2>
                  <ul className="item">
                    {cvData.cv.tags.map((item) => {
                      return (
                        <li key={item.id} className="second">
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {cvData.intersts.filter((item) => item.public === true).length ===
              0 ? null : (
                <div className="center">
                  <h2>{cvLanguage === 1 ? 'Intereses' : 'Interests'}</h2>
                  <ul className="item">
                    {cvData.intersts
                      .filter((item) => item.admin_public === true)
                      .map((item) => {
                        return item.public ? (
                          <li key={item.id} className="second">
                            {item.title}
                          </li>
                        ) : null;
                      })}
                  </ul>
                </div>
              )}
            </BoxFlexCV>
          </div>
        </div>
      </Page>
      {cvData.cv.id === '' ? null : (
        <>
          <Wrapper>
            <HeaderCV>
              {
                <div>
                  <BoxColumn
                    style={{
                      textAlign: 'left',
                      padding: '0',
                    }}
                  >
                    <BoxFlexCV
                      style={{
                        margin: '0',
                        padding: '0',
                        alignItems: 'baseline',
                        justifyContent: 'flex-start',
                        lineHeight: '20px',
                      }}
                    >
                      <h2>{cvData.cv.area}</h2>
                      <p>
                        {cvData.cv.user?.address
                          ? cvData.cv.user?.address
                          : null}{' '}
                      </p>
                    </BoxFlexCV>

                    <p ref={cvIdRef}>
                      {cvUuId}
                      <button onClick={copyInviteCode}>
                        <FontAwesomeIcon icon={faCopy} className="calendar" />
                      </button>
                    </p>
                  </BoxColumn>
                </div>
              }
              <div className="logoHackademy printhide">
                <img src={Logo} alt="logo" />
              </div>
            </HeaderCV>
            {/* {!cvData.cv.tags ? null : (
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
        )} */}
            {cvData.experiences.filter((item) => item.public === true)
              .length === 0 ? null : (
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
                            {item.end_date === null
                              ? 'Actualmente'
                              : item.end_date}
                          </p>
                        </div>
                      ) : null;
                    })}
                </BoxColumn>
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
                            {item.end_date === null
                              ? 'Actualmente'
                              : item.end_date}
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
                            {item.end_date === null
                              ? 'Actualmente'
                              : item.end_date}
                          </p>
                        </div>
                      ) : null;
                    })}
                </BoxColumn>
              </div>
            )}
            {cvData.certifications.filter((item) => item.public === true)
              .length === 0 ? null : (
              <div>
                <h2>
                  {cvLanguage === 1 ? 'Certificaciones' : 'Certifications'}
                </h2>
                <BoxFlex>
                  {cvData.certifications
                    .sort((a, b) => {
                      return (
                        new Date(b.expedition_date) -
                        new Date(a.expedition_date)
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
            {cvData.organisations.filter((item) => item.public === true)
              .length === 0 ? null : (
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
                            {item.end_date === null
                              ? 'Actualmente'
                              : item.end_date}
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
                            {item.end_date === null
                              ? 'Actualmente'
                              : item.end_date}
                          </p>
                        </div>
                      ) : null;
                    })}
                </BoxColumn>
              </div>
            )}
            {cvData.publications.filter((item) => item.public === true)
              .length === 0 ? null : (
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

          <ButtonBox style={{ display: displayButtons }}>
            <Button type="button" onClick={handlePrint} disabled={dataLoaded}>
              <FontAwesomeIcon icon={faFileArrowDown} className="calendar" />{' '}
              Descargar
            </Button>
          </ButtonBox>
        </>
      )}
    </>
  );
};

export default CV_preview;
