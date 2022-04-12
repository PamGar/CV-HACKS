import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Button from '../Buttons/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import Github from '../../assets/icons/Github.svg';
import Gitlab from '../../assets/icons/Gitlab.svg';
import Instagram from '../../assets/icons/Instagram.svg';
import LinkedIn from '../../assets/icons/LinkedIn.svg';
import Twitter from '../../assets/icons/Twitter.svg';
import Stackoverflow from '../../assets/icons/Stackoverflow.svg';

const Page = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;
  aspect-ratio: 3 / 4;

  .page_container {
    width: 100%;
    box-shadow: 0px 10px 40px -20px grey;
    background-color: #fff;
  }

  .page {
    width: 640px;
    aspect-ratio: 3 / 4;
    transform-origin: top left;
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

    .section_study {
      div {
        width: 100%;
        margin: 10px 0;
      }
    }
  }

  div {
    margin: 5px;
  }
`;

const Experience = styled.div`
  .box_experience {
    display: flex;
    text-align: left;

    .date_experience {
      width: 20%;
    }

    .info_experience {
      width: 80%;
    }

    span {
      font-weight: 700;
    }

    ul {
      padding-left: 15px;
    }
  }
`;

const Skills = styled.div`
  .skills_box {
    display: flex;

    div {
      width: 50%;
    }

    li {
      list-style: none;
    }
  }
`;

const CourseLang = styled.div`
  .skills_box {
    display: flex;

    div {
      width: 50%;
    }

    li {
      list-style: none;
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
    margin: 0 30px;
    background-color: #565696;
  }
`;

const Wrapper = styled.div`
  text-align: center;
  box-shadow: 2px 1px 7px #00000057;
  padding: 20px 30px;
  margin: 30px;
  border-radius: 15px;

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
    margin: 0;
  }
`;

const BoxColumn = styled.div`
  padding: 15px 0;
  text-align: left;

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
`;

const BoxFlex = styled(BoxColumn)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  div {
    min-width: 150px;
    max-width: 50%;
    margin: 10px 0;
  }
`;

const CV_preview = ({ editButton, dataLoaded, cvData, userData }) => {
  const printRef = useRef();
  /* const [width, setWidth] = useState(0); */
  /* const widthRef = useRef(); */

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('MyCV.pdf');
  };

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
      {/* <Page>
        <div className="page_container" ref={widthRef}>
          <div
            className="page"
            ref={printRef}
            style={{ transform: `scale(${width / 640})` }}
          >
            <div className="header">
              <h1>Alexis Salcedo</h1>
              <p>Desarrolador Frontend</p>
              <div className="header_sub">
                <p>0415-589-2615</p>
                <p>alestark@gmail.com</p>
                <p>@alisark71</p>
                <p>Chicago</p>
              </div>
            </div>
            <div className="section1">
              <div>
                <h2>Sobre mi</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium unde error porro nam vel beatae assumenda omnis
                  animi quaerat! Earum dolores voluptatum doloribus. Autem?
                </p>
              </div>
              <div className="section_study">
                <h2>Estudios</h2>
                <div>
                  <p>2013 - 2017 | Universidad de Valencia</p>
                  <p>Lic. en artes multimedia</p>
                </div>
                <div>
                  <p>2013 - 2017 | Universidad de Valencia</p>
                  <p>Lic. en artes multimedia</p>
                </div>
              </div>
            </div>
            <Experience>
              <h2>Experiencia</h2>
              <div className="box_experience">
                <div className="date_experience">1987 - 1990</div>
                <div className="info_experience">
                  <span>Lorem ipsum dolor sit amet.</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="box_experience">
                <div className="date_experience">1987 - 1990</div>
                <div className="info_experience">
                  <span>Lorem ipsum dolor sit amet.</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>
                  </ul>
                </div>
              </div>
            </Experience>
            <Skills>
              <div className="skills_box">
                <div>
                  <h2>Skills</h2>
                  <ul>
                    <li>Diseño grafico</li>
                    <li>Ilustracion</li>
                    <li>Fotografia</li>
                  </ul>
                </div>
                <div>
                  <h2>Soft skills</h2>
                  <ul>
                    <li>Composicion</li>
                    <li>Videografia</li>
                    <li>Graficos dinamicos</li>
                  </ul>
                </div>
              </div>
            </Skills>
            <CourseLang>
              <div className="skills_box">
                <div>
                  <h2>Cursos</h2>
                  <ul>
                    <li>UX/UI design</li>
                    <li>Scrum master</li>
                  </ul>
                </div>
                <div>
                  <h2>Lenguajes</h2>
                  <ul>
                    <li>Ingles</li>
                    <li>Frances</li>
                    <li>Chino mandarin</li>
                  </ul>
                </div>
              </div>
            </CourseLang>
          </div>
        </div>
      </Page> */}
      <Wrapper ref={printRef}>
        <h1>
          {userData.name} {userData.paternal_surname}
        </h1>
        <BoxColumn
          style={{
            textAlign: 'center',
          }}
        >
          <BoxFlex
            style={{
              paddingTop: `0`,
            }}
          >
            <p>{userData.address.country}</p>
            <p>{userData.email}</p>
            <p>{userData.phone}</p>
          </BoxFlex>
          <p>{userData.about_me}</p>
        </BoxColumn>
        {cvData.urls.length === 0 ? null : (
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
        {cvData.educations.length === 0 ? null : (
          <div>
            <h2>Educations</h2>
            <BoxFlex>
              {cvData.educations
                .sort((a, b) => {
                  return new Date(b.date) - new Date(a.date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id}>
                      <p>{item.title}</p>
                    </div>
                  ) : null;
                })}
            </BoxFlex>
          </div>
        )}
        {cvData.languages.length === 0 ? null : (
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
        {cvData.courses.length === 0 ? null : (
          <div>
            <h2>Cursos</h2>
            <BoxFlex>
              {cvData.courses
                .sort((a, b) => {
                  return new Date(b.start_date) - new Date(a.start_date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id}>
                      <p>{item.title}</p>
                    </div>
                  ) : null;
                })}
            </BoxFlex>
          </div>
        )}
        {cvData.certifications.length === 0 ? null : (
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
                        {item.expiry_date}
                      </p>
                    </div>
                  ) : null;
                })}
            </BoxFlex>
          </div>
        )}
        {cvData.experiences.length === 0 ? null : (
          <div>
            <h2>Experiencia</h2>
            <BoxFlex>
              {cvData.experiences
                .sort((a, b) => {
                  return new Date(b.start_date) - new Date(a.start_date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id}>
                      <p>{item.title}</p>
                    </div>
                  ) : null;
                })}
            </BoxFlex>
          </div>
        )}
        {cvData.organisations.length === 0 ? null : (
          <div>
            <h2>Organizaciones</h2>
            <BoxFlex>
              {cvData.organisations
                .sort((a, b) => {
                  return new Date(b.start_date) - new Date(a.start_date);
                })
                .map((item) => {
                  return item.public ? (
                    <div key={item.id}>
                      <p>{item.title}</p>
                    </div>
                  ) : null;
                })}
            </BoxFlex>
          </div>
        )}
        {cvData.projects.length === 0 ? null : (
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
                        {item.end_date}
                      </p>
                    </div>
                  ) : null;
                })}
            </BoxColumn>
          </div>
        )}
        {cvData.publications.length === 0 ? null : (
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
        {cvData.awards.length === 0 ? null : (
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
        {cvData.skills.length === 0 ? null : (
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
        {cvData.intersts.length === 0 ? null : (
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
      <ButtonBox>
        <Button type="button" onClick={editButton} disabled={dataLoaded}>
          Editar
        </Button>
        {/* <Button type="button" onClick={handleDownloadPdf} disabled={dataLoaded}>
          Descargar
        </Button> */}
      </ButtonBox>
    </>
  );
};

export default CV_preview;
