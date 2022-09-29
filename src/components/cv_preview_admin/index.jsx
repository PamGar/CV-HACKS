import React, { useRef } from 'react';
import { useReactToPrint /* generateAndSavePDF */ } from 'react-to-print';
import styled from 'styled-components';
// import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf.js';
// import { jsPDF } from 'jspdf';
import Button from '../Buttons/LoadingButton';
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
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = styled.div`
  width: 800px;
  padding: 20px;

  .page_container {
    background-color: #fff;
    border-radius: 15px;
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
  border-radius: 10px;
  margin-bottom: 20px;

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

const ButtonAdminHide = styled.div`
  display: flex;
  justify-content: right;

  button {
    background-color: #0babb480;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: 700;
    font-size: 10px;
    color: #fff;
    cursor: pointer;

    &:hover {
      filter: opacity(50%);
    }
  }
`;

const CV_preview = ({
  editButton,
  dataLoaded,
  cvData,
  userData,
  displayButtons,
  downloadAdmin,
  refreshCV,
}) => {
  const baseURL = `${process.env.REACT_APP_BASE_URL}`;
  const myToken = window.localStorage.getItem('authToken');
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const printRef = useRef();
  // const [width, setWidth] = useState(0);
  const widthRef = useRef();
  // const userRole = localStorage.getItem('role');
  const cvLanguage = cvData.cv.cv_language?.id;

  const copyURL = () => {
    /* Get the text field */
    var copyText = window.location.host;

    /* Copy the text to the clipboard */
    navigator.clipboard.writeText(`${copyText}/public/${cvData.cv.id}`);

    /* Alert the copied text */
    alert(
      `Enlace publico para este CV copiado, ten en cuanta que se ocultaran sus datos de contacto`
    );
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

  const adminHide = async (event, URL, id, value) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(
        `${baseURL}/${URL}${cvData.cv.id}/${id}`,
        { admin_public: !value },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      console.log(data);
      refreshCV();
      toast.success('Actualizado con éxito');
    } catch (error) {
      toast.error('No se pudo actualizar el estudio');
    }
  };

  const getPageMargins = () => {
    return `@page { margin: ${'20px'} ${'50px'} ${'50px'} ${'50px'} !important; }`;
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
                      <p style={{ marginLeft: '0' }}>
                        {userData.address?.state
                          ? userData.address?.state
                          : null}{' '}
                        <span style={{ color: '#bfbfbf' }}>
                          {userData.address?.country
                            ? `(${userData.address?.country})`
                            : null}
                        </span>
                      </p>
                    </BoxFlex>
                  </BoxColumn>
                </div>
              }
              <div className="logoHackademy printhide">
                <img src={Logo} alt="logo" />
              </div>
            </HeaderCV>
            <BoxFlexCV>
              {userData.about_me && (
                <div>
                  <h2>{cvLanguage === 1 ? 'Acerca de mi' : 'About me'}</h2>
                  <p>{userData.about_me}</p>
                </div>
              )}

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
            </BoxFlexCV>
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
      <Wrapper>
        <Header>
          {userData.image !== '/media/default.jpg' ? (
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
              <h1 style={{ margin: '0', lineHeight: '25px' }}>
                {userData.name} {userData.paternal_surname}
              </h1>
              <h3>{cvData.cv.area}</h3>
              <BoxFlex
                style={{
                  padding: `0`,
                  justifyContent: 'space-around',
                }}
              >
                {userData.email ? (
                  userData.email.includes('hackademy.mx') ? null : (
                    <p>{userData.email}</p>
                  )
                ) : null}
                {userData.phone ? <p>{userData.phone}</p> : null}
              </BoxFlex>
              <p style={{ textAlign: 'center' }}>
                {userData.address?.state ? userData.address?.state : null}{' '}
                <span style={{ color: '#bfbfbf' }}>
                  {userData.address?.country
                    ? `(${userData.address?.country})`
                    : null}
                </span>
              </p>
            </BoxColumn>
          </div>
        </Header>
        <BoxColumn>{userData.about_me}</BoxColumn>
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
        {cvData.urls.filter((item) => item.public === true).length ===
        0 ? null : (
          <div>
            <h2>{cvLanguage === 1 ? 'Redes sociales' : 'Social media'}</h2>
            <BoxFlex style={{ justifyContent: 'space-evenly' }}>
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
            <h2>{cvLanguage === 1 ? 'Educación' : 'Education'}</h2>
            <BoxColumn>
              {cvData.educations
                .sort((a, b) => {
                  return new Date(b.start_date) - new Date(a.start_date);
                })
                .map((item) => {
                  return item.public ? (
                    <div
                      key={item.id}
                      style={{
                        filter: item.admin_public
                          ? 'opacity(100%)'
                          : 'opacity(30%)',
                      }}
                    >
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
                      <ButtonAdminHide>
                        <button
                          style={{
                            backgroundColor: item.admin_public
                              ? '#ff6666'
                              : '#00595a',
                          }}
                          onClick={(event) =>
                            adminHide(
                              event,
                              'cv/educations/',
                              item.id,
                              item.admin_public
                            )
                          }
                        >
                          {item.admin_public ? 'Ocultar' : 'Mostrar'}
                        </button>
                      </ButtonAdminHide>
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
                  <div
                    key={item.id}
                    className="center"
                    style={{
                      filter: item.admin_public
                        ? 'opacity(100%)'
                        : 'opacity(30%)',
                    }}
                  >
                    <p className="first">
                      {item.title}
                      {' • '}
                      <span className="third">{item.level}</span>
                    </p>
                    <p className="second">{item.subtitle}</p>
                    <ButtonAdminHide>
                      <button
                        style={{
                          backgroundColor: item.admin_public
                            ? '#ff6666'
                            : '#00595a',
                        }}
                        onClick={(event) =>
                          adminHide(
                            event,
                            'cv/admin-cv-formskills/',
                            item.id,
                            item.admin_public
                          )
                        }
                      >
                        {item.admin_public ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </ButtonAdminHide>
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
                    <div
                      key={item.id}
                      style={{
                        filter: item.admin_public
                          ? 'opacity(100%)'
                          : 'opacity(30%)',
                      }}
                    >
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
                      <ButtonAdminHide>
                        <button
                          style={{
                            backgroundColor: item.admin_public
                              ? '#ff6666'
                              : '#00595a',
                          }}
                          onClick={(event) =>
                            adminHide(
                              event,
                              'cv/formnormals/',
                              item.id,
                              item.admin_public
                            )
                          }
                        >
                          {item.admin_public ? 'Ocultar' : 'Mostrar'}
                        </button>
                      </ButtonAdminHide>
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
                      style={{
                        width: '45%',
                        textAlign: 'left',
                        filter: item.admin_public
                          ? 'opacity(100%)'
                          : 'opacity(30%)',
                      }}
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
                      <ButtonAdminHide>
                        <button
                          style={{
                            backgroundColor: item.admin_public
                              ? '#ff6666'
                              : '#00595a',
                          }}
                          onClick={(event) =>
                            adminHide(
                              event,
                              'cv/admin-cv-certifications/',
                              item.id,
                              item.admin_public
                            )
                          }
                        >
                          {item.admin_public ? 'Ocultar' : 'Mostrar'}
                        </button>
                      </ButtonAdminHide>
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
                    <div
                      key={item.id}
                      style={{
                        filter: item.admin_public
                          ? 'opacity(100%)'
                          : 'opacity(30%)',
                      }}
                    >
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
                      <ButtonAdminHide>
                        <button
                          style={{
                            backgroundColor: item.admin_public
                              ? '#ff6666'
                              : '#00595a',
                          }}
                          onClick={(event) =>
                            adminHide(
                              event,
                              'cv/experience/',
                              item.id,
                              item.admin_public
                            )
                          }
                        >
                          {item.admin_public ? 'Ocultar' : 'Mostrar'}
                        </button>
                      </ButtonAdminHide>
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
                    <div
                      key={item.id}
                      style={{
                        filter: item.admin_public
                          ? 'opacity(100%)'
                          : 'opacity(30%)',
                      }}
                    >
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
                      <ButtonAdminHide>
                        <button
                          style={{
                            backgroundColor: item.admin_public
                              ? '#ff6666'
                              : '#00595a',
                          }}
                          onClick={(event) =>
                            adminHide(
                              event,
                              'cv/formnormals/',
                              item.id,
                              item.admin_public
                            )
                          }
                        >
                          {item.admin_public ? 'Ocultar' : 'Mostrar'}
                        </button>
                      </ButtonAdminHide>
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
                    <div
                      key={item.id}
                      style={{
                        filter: item.admin_public
                          ? 'opacity(100%)'
                          : 'opacity(30%)',
                      }}
                    >
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
                      <ButtonAdminHide>
                        <button
                          style={{
                            backgroundColor: item.admin_public
                              ? '#ff6666'
                              : '#00595a',
                          }}
                          onClick={(event) =>
                            adminHide(
                              event,
                              'cv/projects/',
                              item.id,
                              item.admin_public
                            )
                          }
                        >
                          {item.admin_public ? 'Ocultar' : 'Mostrar'}
                        </button>
                      </ButtonAdminHide>
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
                    <div
                      key={item.id}
                      style={{
                        filter: item.admin_public
                          ? 'opacity(100%)'
                          : 'opacity(30%)',
                      }}
                    >
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
                      <ButtonAdminHide>
                        <button
                          style={{
                            backgroundColor: item.admin_public
                              ? '#ff6666'
                              : '#00595a',
                          }}
                          onClick={(event) =>
                            adminHide(
                              event,
                              'cv/admin-cv-formworks/',
                              item.id,
                              item.admin_public
                            )
                          }
                        >
                          {item.admin_public ? 'Ocultar' : 'Mostrar'}
                        </button>
                      </ButtonAdminHide>
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
                    <div
                      key={item.id}
                      className="item"
                      style={{
                        filter: item.admin_public
                          ? 'opacity(100%)'
                          : 'opacity(30%)',
                      }}
                    >
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
                      <ButtonAdminHide>
                        <button
                          style={{
                            backgroundColor: item.admin_public
                              ? '#ff6666'
                              : '#00595a',
                          }}
                          onClick={(event) =>
                            adminHide(
                              event,
                              'cv/admin-cv-formworks/',
                              item.id,
                              item.admin_public
                            )
                          }
                        >
                          {item.admin_public ? 'Ocultar' : 'Mostrar'}
                        </button>
                      </ButtonAdminHide>
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
                  <div
                    key={item.id}
                    className="item"
                    style={{
                      filter: item.admin_public
                        ? 'opacity(100%)'
                        : 'opacity(30%)',
                    }}
                  >
                    <p className="first">{item.title}</p>
                    <p className="second">{item.subtitle}</p>
                    <ButtonAdminHide>
                      <button
                        style={{
                          backgroundColor: item.admin_public
                            ? '#ff6666'
                            : '#00595a',
                        }}
                        onClick={(event) =>
                          adminHide(
                            event,
                            'cv/admin-cv-formskills/',
                            item.id,
                            item.admin_public
                          )
                        }
                      >
                        {item.admin_public ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </ButtonAdminHide>
                  </div>
                ) : null;
              })}
            </BoxColumn>
          </div>
        )}
      </Wrapper>
      <ButtonBox style={{ display: displayButtons }}>
        {!downloadAdmin && (
          <Button type="button" onClick={editButton} disabled={dataLoaded}>
            <FontAwesomeIcon icon={faPenToSquare} className="calendar" /> Editar
          </Button>
        )}
        {downloadAdmin && (
          <Button type="button" onClick={copyURL} disabled={dataLoaded}>
            <FontAwesomeIcon icon={faCopy} className="calendar" /> Copiar URL
            publica
          </Button>
        )}
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
