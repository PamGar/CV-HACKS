import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Button from '../Buttons/LoadingButton';

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
  }
`;

const Wrapper = styled.div`
  text-align: center;
  box-shadow: 2px 1px 7px #00000057;
  padding: 20px 0;
  margin: 30px;
  border-radius: 15px;

  div {
    padding: 15px 0;
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
      <Wrapper>
        <h2>Nombre y apellido</h2>
        <p>
          {userData.name} {userData.paternal_surname}
        </p>
        <h2>Email</h2>
        <p>{userData.email}</p>
        {cvData.awards.length === 0 ? null : (
          <div>
            <h2>Premios</h2>
            {cvData.awards.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
        {cvData.certifications.length === 0 ? null : (
          <div>
            <h2>Certificaciones</h2>
            {cvData.certifications.map((item) => {
              return <p>{item.name}</p>;
            })}
          </div>
        )}
        {cvData.courses.length === 0 ? null : (
          <div>
            <h2>Cursos</h2>
            {cvData.courses.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
        {cvData.educations.length === 0 ? null : (
          <div>
            <h2>Educations</h2>
            {cvData.educations.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
        {cvData.experiences.length === 0 ? null : (
          <div>
            <h2>Experiencia</h2>
            {cvData.experiences.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
        {cvData.intersts.length === 0 ? null : (
          <div>
            <h2>Intereses</h2>
            {cvData.intersts.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
        {cvData.languages.length === 0 ? null : (
          <div>
            <h2>Lenguajes</h2>
            {cvData.languages.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
        {cvData.organisations.length === 0 ? null : (
          <div>
            <h2>Organizaciones</h2>
            {cvData.organisations.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
        {cvData.projects.length === 0 ? null : (
          <div>
            <h2>Proyectos</h2>
            {cvData.projects.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
        {cvData.publications.length === 0 ? null : (
          <div>
            <h2>Publicaciones</h2>
            {cvData.publications.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
        {cvData.skills.length === 0 ? null : (
          <div>
            <h2>Skills</h2>
            {cvData.skills.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
      </Wrapper>
      <ButtonBox>
        <Button type="button" onClick={editButton} disabled={dataLoaded}>
          Editar
        </Button>
        <Button type="button" onClick={handleDownloadPdf} disabled={dataLoaded}>
          Descargar
        </Button>
      </ButtonBox>
    </>
  );
};

export default CV_preview;
