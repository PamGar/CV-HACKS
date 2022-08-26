import React from 'react';
import styled from 'styled-components';

const HelpContainer = styled.div`
  padding: 20px;
  text-align: left;

  h2 {
    text-align: center;
    background: linear-gradient(40deg, #00b7b8, #595295);
    padding: 20px;
    box-shadow: 0px 10px 40px -20px grey;
    border-radius: 15px;
    letter-spacing: 2px;
    color: #fff;
    font-size: 16px;
  }

  ul {
    padding-left: 20px;
  }

  li {
    margin: 20px 0;
  }
`;

const HelpCV = () => {
  return (
    <HelpContainer>
      <h2>Ayuda</h2>
      <ul>
        <li>
          El título de tu currículo debe ser algo más que tu nombre. Haz una
          breve descripción (una frase) de lo que mejor sabes hacer y cuánto
          tiempo llevas haciéndolo.
        </li>
        <li>
          No escribas todo tu historial académico. Adiós al kinder, primaria,
          secundaria y, en caso de contar con licenciatura, la preparatoria.
        </li>
        <li>Personaliza tu CV para cada vacante a la que te postules.</li>
        <li>
          Haz tu currículo de una página, a lo mucho dos; exagerado hasta el
          infinito, tres. Recuerda que la primera vez el reclutador leerá
          (escaneará) tu CV entre 6 y 20 segundos.
        </li>
        <li>
          En el apartado de experiencia menciona tus logros. Di lo que has hecho
          bien. Si no lo expresas tú, entonces ¿quién?
        </li>
        <li>
          Habla de tus últimos tres trabajos o de los últimos 10 años de vida
          laboral. No más.
        </li>
        <li>
          Evita los errores. Un currículum con errores ortográficos te descarta
          de inmediato del proceso de selección.
        </li>
        <li>
          Hay frases que ya no sorprenden a los reclutadores: “trabajo en
          equipo, orientado a resultados, proactivo”. Evitarlas. Hay verbos con
          los que sí puedes sorprenderlos: “mejoré, alcancé, resolví…”.
        </li>
        <li>
          Si eres joven: prácticas profesionales y servicio social son válidos
          como experiencia laboral. Si ya tienes experiencia: incluir
          porcentajes o cifras de los trabajos anteriores es vital.
        </li>
        <li>
          ¿Foto en el CV impreso? Si la empresa la pide en la redacción de la
          vacante, ponla.
        </li>
        <li>
          Imprime tu currículo y pregúntate: ¿por qué te llamaría la atención
          leer esa hoja? Lo mismo pasa con los de Recursos Humanos.
        </li>
        <li>
          Estos son los datos personales que sí debes incluir: nombre, correo
          electrónico y teléfonos de contacto. Datos personales que no:
          dirección completa, estado civil, CURP, fecha de nacimiento, edad,
          último promedio.
        </li>
        <li>
          Cuando hables de dominio de otros idiomas, no pongas porcentajes: son
          ambiguos. Elige entre básico, intermedio, avanzado.
        </li>
      </ul>
    </HelpContainer>
  );
};

export default HelpCV;
