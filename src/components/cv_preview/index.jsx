import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint, generateAndSavePDF } from 'react-to-print';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
import Button from '../Buttons/LoadingButton';
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

  .page_container {
    background-color: #fff;
  }

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

const Wrapper = styled.div`
  background-color: #fff;
  text-align: center;
  /* box-shadow: 2px 1px 7px #00000057; */
  padding: 20px 30px;
  border-radius: 15px;
  margin-bottom: 20px;

  h2 {
    font-size: 16px;
    background-color: #0babb4;
    color: #fff;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 2px 1px 7px #00000057;
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

  .header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
  justify-content: space-evenly;

  & > div {
    max-width: 50%;
    margin: 10px 0;
  }
`;

const Header = styled(BoxFlex)`
  align-items: center;
  margin-bottom: 20px;

  p {
    margin: 0 5px;
  }

  div {
    max-width: unset;
    margin-bottom: 0;
  }

  .profileImage {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 0px 10px #a0a0cc5c;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .logoHackademy {
    width: 80px;
    height: 80px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const BoxColumnCV = styled(BoxColumn)`
  h2 {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
  }
`;
const BoxFlexCV = styled(BoxFlex)`
  justify-content: space-between;

  h2 {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    margin-bottom: 10px;
  }

  li {
    margin-top: 10px;
  }

  .center {
    text-align: center;
  }

  & > div {
    width: 48%;
  }
`;

const CV_preview = ({
  editButton,
  dataLoaded,
  cvData,
  userData,
  displayButtons,
}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const printRef = useRef();
  const [width, setWidth] = useState(0);
  const widthRef = useRef();

  const iconRedesSociales = (value) => {
    switch (value) {
      case 'Github':
        return Github;
        break;
      case 'Gitlab':
        return Gitlab;
        break;
      case 'Instagram':
        return Instagram;
        break;
      case 'LinkedIn':
        return LinkedIn;
        break;
      case 'Stackoverflow':
        return Stackoverflow;
        break;
      case 'Twitter':
        return Twitter;
        break;
      default:
        break;
    }
  };

  const getPageMargins = () => {
    return `@page { margin: ${'50px'} ${'50px'} ${'50px'} ${'50px'} !important; }`;
  };

  /* useEffect(() => {
    setWidth(widthRef.current.clientWidth);
  }, []); */

  /* useEffect(() => {
    const myWidth = () => {
      setWidth(widthRef.current.clientWidth);
    };

    window.addEventListener('resize', myWidth);
  }); */

  return (
    <>
      <Page style={{ display: 'none' }}>
        <div className="page_container" ref={widthRef}>
          <div className="page" ref={componentRef}>
            <style>{getPageMargins()}</style>
            <Header>
              {userData.image ? (
                <div className="profileImage">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}${userData.image}`}
                    alt=""
                  />
                </div>
              ) : null}
              <div>
                <BoxColumn
                  style={{
                    textAlign: 'center',
                    padding: '0',
                  }}
                >
                  <h1 style={{ fontFamily: 'Poppins', fontWeight: '700' }}>
                    {userData.name} {userData.paternal_surname}
                  </h1>
                  <BoxFlex
                    style={{
                      paddingTop: `0`,
                    }}
                  >
                    <p>
                      {userData.address?.country
                        ? userData.address?.country
                        : null}
                    </p>
                    <p>{userData.email ? userData.email : null}</p>
                    <p>{userData.phone ? userData.phone : null}</p>
                  </BoxFlex>
                </BoxColumn>
              </div>
              <div className="logoHackademy">
                <img src={Logo} />
              </div>
            </Header>
            <BoxFlexCV>
              {userData.about_me && (
                <div>
                  <h2>Sobre mi</h2>
                  <p>{userData.about_me}</p>
                </div>
              )}
              <div className="section_study">
                {cvData.educations.filter((item) => item.public === true)
                  .length === 0 ? null : (
                  <div>
                    <h2>Estudios</h2>
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
              </div>
            </BoxFlexCV>
            <BoxColumnCV>
              {cvData.experiences.filter((item) => item.public === true)
                .length === 0 ? null : (
                <div>
                  <h2>Experiencia</h2>
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
                </div>
              )}
            </BoxColumnCV>
            <BoxColumnCV>
              {cvData.courses.filter((item) => item.public === true).length ===
              0 ? null : (
                <div>
                  <h2>Cursos</h2>
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
                </div>
              )}
            </BoxColumnCV>
            <BoxColumnCV>
              {cvData.certifications.filter((item) => item.public === true)
                .length === 0 ? null : (
                <div>
                  <h2>Certificaciones</h2>
                  {cvData.certifications
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
                          <p className="second">
                            <span className="first">{'id: '}</span>
                            {item.credential_id}
                          </p>
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
                  <h2>Organizaciones</h2>
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
                </div>
              )}
            </BoxColumnCV>
            <BoxColumnCV>
              {cvData.projects.filter((item) => item.public === true).length ===
              0 ? null : (
                <div>
                  <h2>Proyectos</h2>
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
                </div>
              )}
            </BoxColumnCV>
            <BoxFlexCV>
              {cvData.publications.filter((item) => item.public === true)
                .length === 0 ? null : (
                <div className="center">
                  <h2>Publicaciones</h2>
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
              {cvData.awards.filter((item) => item.public === true).length ===
              0 ? null : (
                <div className="center">
                  <h2>Premios</h2>
                  {cvData.awards
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
            </BoxFlexCV>
            <BoxFlexCV>
              {cvData.skills.filter((item) => item.public === true).length ===
              0 ? null : (
                <div className="center">
                  <h2>Skills</h2>
                  <ul className="item">
                    {cvData.skills.map((item) => {
                      return item.public ? (
                        <li key={item.id} className="second">
                          {item.title}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
              {cvData.intersts.filter((item) => item.public === true).length ===
              0 ? null : (
                <div className="center">
                  <h2>Intereses</h2>
                  <ul className="item">
                    {cvData.intersts.map((item) => {
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
      <Wrapper>
        <Header>
          {userData.image ? (
            <div className="profileImage">
              <img
                src={`${process.env.REACT_APP_BASE_URL}${userData.image}`}
                alt=""
              />
            </div>
          ) : null}
          <div>
            <BoxColumn
              style={{
                textAlign: 'center',
                padding: '0',
              }}
            >
              <h1>
                {userData.name} {userData.paternal_surname}
              </h1>
              <BoxFlex
                style={{
                  paddingTop: `0`,
                }}
              >
                <p>
                  {userData.address?.country ? userData.address?.country : null}
                </p>
                <p>{userData.email ? userData.email : null}</p>
                <p>{userData.phone ? userData.phone : null}</p>
              </BoxFlex>
            </BoxColumn>
          </div>
        </Header>
        {cvData.urls.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>Redes sociales</h2>
            <BoxFlex>
              {cvData.urls.map((item) => {
                return item.public ? (
                  <div key={item.id} className="center">
                    <a href={item.description} target="_blank" rel="noreferrer">
                      <img src={iconRedesSociales(item.type)} alt={item.type} />
                      <p className="first">{item.type}</p>
                      <p className="second">{item.url}</p>
                    </a>
                  </div>
                ) : null;
              })}
            </BoxFlex>
          </div>
        )}
        {cvData.educations.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>Educación</h2>
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
            <h2>Lenguajes</h2>
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
            <h2>Cursos</h2>
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
            <h2>Certificaciones</h2>
            <BoxFlex>
              {cvData.certifications
                .sort((a, b) => {
                  return (
                    new Date(b.expedition_date) - new Date(a.expedition_date)
                  );
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id} className="center">
                      <p className="first">{item.name}</p>
                      <p className="third">{item.company}</p>
                      <p className="second">
                        <span className="first">{'id: '}</span>
                        {item.credential_id}
                      </p>
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
            <h2>Experiencia</h2>
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
            <h2>Organizaciones</h2>
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
            <h2>Proyectos</h2>
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
            <h2>Publicaciones</h2>
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
        {cvData.awards.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>Premios</h2>
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
        {cvData.skills.filter((item) => item.public === true).length ===
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
        )}
        {cvData.intersts.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>Intereses</h2>
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
        <Button type="button" onClick={editButton} disabled={dataLoaded}>
          <FontAwesomeIcon icon={faPenToSquare} className="calendar" /> Editar
        </Button>
        <Button
          type="button"
          /* onClick={handleDownloadPdf} */ onClick={handlePrint}
          disabled={dataLoaded}
        >
          <FontAwesomeIcon icon={faFileArrowDown} className="calendar" />{' '}
          Descargar
        </Button>
      </ButtonBox>
    </>
  );
};

export default CV_preview;
