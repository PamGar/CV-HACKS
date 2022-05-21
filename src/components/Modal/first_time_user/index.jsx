import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRoutes } from 'react-router-dom';

const FirstTimeModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #14141499;

  span {
    font-weight: 500;
  }

  .box {
    background-color: #fff;
    padding: 20px 40px;
    margin: 20px;
    border-radius: 3px;
    text-align: center;
    max-width: 600px;
    max-height: calc(100vh - 70px);
    border-top: solid 30px #00b7b8;
    overflow: auto;

    & > p {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 20px;
    }

    form p {
      display: flex;
      flex-direction: column;

      & > * {
        padding: 10px;
      }

      label {
        text-align: left;
        font-weight: 500;
        padding-left: 0;
        padding-bottom: 0;
      }
    }
  }

  fieldset {
    margin-top: 20px;
  }

  .multiBox {
    display: flex;
    justify-content: space-between;

    p {
      width: 45%;
    }
  }

  section {
    display: flex;
    align-items: center;
    padding: 20px;
    text-align: left;

    label {
      width: unset;
      margin-left: 20px;
    }
    input {
      width: unset;
      boder: 1px solid rgb(214, 204, 221);
    }
  }

  .form-control {
    font-family: system-ui, sans-serif;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.1;
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
  }

  .form-control + .form-control {
    margin-top: 1em;
  }

  .form-control--disabled {
    color: grey;
    cursor: not-allowed;
  }

  input[type='checkbox'] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* for iOS < 15 */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 25px;
    height: 25px;
    border: 0.15em solid #00b7b8;
    border-radius: 0.15em;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;
  }

  input[type='checkbox']::before {
    content: '';
    width: 20px;
    height: 20px;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #00b7b8;
    /* Windows High Contrast Mode */
    background-color: CanvasText;
  }

  input[type='checkbox']:checked::before {
    transform: scale(1);
  }

  input[type='checkbox']:focus {
    outline: max(2px, 0.15em) solid #00b7b8;
    outline-offset: max(2px, 0.15em);
  }

  input[type='checkbox']:disabled {
    #00b7b8: #00b7b8;

    color: #00b7b8;
    cursor: not-allowed;
  }

  @media (max-width: 820px) {
    .box {
      padding: 20px;
    }
  }
`;

const ButtonBox = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;

  input {
    background-color: #00b7b8;
    color: #fff;
    padding: 10px 16px;
    width: 100%;
    border-radius: 5px;

    &:hover::after {
      opacity: ${(props) => (props.disabled ? 0 : 1)};
    }

    &:active::before {
      opacity: 1;
    }

    &:hover {
      background-color: ${(props) =>
        props.disabled ? '#8888884d' : '#00acad'};
    }

    &:active {
      background-color: #00a2a3;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  border: ${(props) =>
    props.error ? '1px solid #d8000c' : '1px solid #888888'};
  border-radius: 5px;
  font-size: 0.875rem;

  &::placeholder {
    color: ${(props) => (props.error ? '#FFD2D2' : '#888888')};
  }

  &:focus-visible {
    outline: none;
    border: ${(props) =>
      props.error ? 'border: 1px solid #d8000c' : '1px solid #00b7b8cc'};
  }
`;

const FirstTime = ({ closeModal, isOpen, refreshCvData }) => {
  const [user, setUser] = useState({
    address_update: false,
  });
  const myToken = window.localStorage.getItem('authToken');

  /*Captar cambios al escribir en el formulario*/
  const handleChange = (event) => {
    const { name, value } = event.target;
    const names = name.split('/');

    if (names.length > 1) {
      setUser({
        ...user,
        [names[0]]: {
          ...user[names[0]],
          [names[1]]: value,
        },
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  console.log('user', user);

  /*Captar cambios al marcar el checkbox*/
  const handleCheck = (event) => {
    const names = event.target.name.split('/');
    const checked = event.target.checked;

    setUser({
      ...user,
      [names[0]]: {
        ...user[names[0]],
        [names[1]]: checked,
      },
    });
  };

  const postCV = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cv/`,
        {
          description: 'Mi primer CV',
          area: user.user.area,
        },
        {
          headers: {
            Authorization: `Token ${myToken}`,
          },
        }
      );
    } catch (error) {
      console.error('error', error);
    }
  };

  /*Manejar el envio del formulario*/
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = async () => {
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/user/profile/`,
          user,
          {
            headers: {
              Authorization: `Token ${myToken}`,
            },
          }
        );
        closeModal();
        refreshCvData();
      } catch (error) {
        console.error('error', error);
      }
    };
    postCV();
    postData();
  };

  /* useEffect(() => {
    const myToken = window.localStorage.getItem('authToken');

    const postCV = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/cv/`,
          {
            description: 'Mi primer CV',
            area: 'frontendA'
          },
          {
            headers: {
              Authorization: `Token ${myToken}`,
            },
          }
        );
      } catch (error) {
        console.error('error', error);
      }
    };
    postCV();
  }, []); */

  return (
    <FirstTimeModal isOpen={isOpen}>
      <div className="box">
        <p>
          Parece que aun no te has presentado, que tal si nos proporcionas
          algunos datos basicos para empezar
        </p>
        <form onSubmit={handleSubmit}>
          <h3>Datos personales</h3>
          <div className="multiBox">
            <p>
              <label htmlFor="user/name">
                <span>Nombre</span>
                <strong>
                  <abbr title="required">*</abbr>
                </strong>
              </label>
              <Input
                type="text"
                id="name"
                name="user/name"
                placeholder="Escribe tu nombre"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="user/paternal_surname">
                <span>Apellido</span>
                <strong>
                  <abbr title="required">*</abbr>
                </strong>
              </label>
              <Input
                type="text"
                id="surname"
                name="user/paternal_surname"
                placeholder="Escribe tu apellido"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </p>
          </div>
          <p>
            <label htmlFor="user/phone">
              <span>Telefono</span>
              <strong>
                <abbr title="required">*</abbr>
              </strong>
            </label>
            <Input
              type="text"
              id="surname"
              name="user/phone"
              placeholder="Escribe tu numero de telefono"
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label htmlFor="user/area">
              <span>Area</span>
            </label>
            <Input
              list="colores"
              type="text"
              id="area"
              name="user/area"
              placeholder="Escribe tu area (Frontend, backend, mobile, etc)"
              autoComplete="off"
              onChange={handleChange}
            />
            <datalist id="colores">
              <option value="Frontend"></option>
              <option value="Backend"></option>
              <option value="Fullstack"></option>
              <option value="Mobile"></option>
              <option value="UX/UI"></option>
            </datalist>
          </p>
          <fieldset>
            <h3>Direccion</h3>
            <div className="multiBox">
              <p>
                <label htmlFor="address/country">
                  <span>Pais</span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <Input
                  list="paises"
                  type="text"
                  id="country"
                  name="address/country"
                  placeholder="Escribe el pais donde te encuentras"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
                <datalist id="paises">
                  <option value="Afganistán"></option>
                  <option value="Albania"></option>
                  <option value="Alemania"></option>
                  <option value="Andorra"></option>
                  <option value="Angola"></option>
                  <option value="Anguilla"></option>
                  <option value="Antártida"></option>
                  <option value="Antigua y Barbuda"></option>
                  <option value="Antillas Holandesas"></option>
                  <option value="Arabia Saudí"></option>
                  <option value="Argelia"></option>
                  <option value="Argentina"></option>
                  <option value="Armenia"></option>
                  <option value="Aruba"></option>
                  <option value="Australia"></option>
                  <option value="Austria"></option>
                  <option value="Azerbaiyán"></option>
                  <option value="Bahamas"></option>
                  <option value="Bahrein"></option>
                  <option value="Bangladesh"></option>
                  <option value="Barbados"></option>
                  <option value="Bélgica"></option>
                  <option value="Belice"></option>
                  <option value="Benin"></option>
                  <option value="Bermudas"></option>
                  <option value="Bielorrusia"></option>
                  <option value="Birmania"></option>
                  <option value="Bolivia"></option>
                  <option value="Bosnia y Herzegovina"></option>
                  <option value="Botswana"></option>
                  <option value="Brasil"></option>
                  <option value="Brunei"></option>
                  <option value="Bulgaria"></option>
                  <option value="Burkina Faso"></option>
                  <option value="Burundi"></option>
                  <option value="Bután"></option>
                  <option value="Cabo Verde"></option>
                  <option value="Camboya"></option>
                  <option value="Camerún"></option>
                  <option value="Canadá"></option>
                  <option value="Chad"></option>
                  <option value="Chile"></option>
                  <option value="China"></option>
                  <option value="Chipre"></option>
                  <option value="Ciudad del Vaticano (Santa Sede)"></option>
                  <option value="Colombia"></option>
                  <option value="Comores"></option>
                  <option value="Congo"></option>
                  <option value="Congo, República Democrática del"></option>
                  <option value="Corea"></option>
                  <option value="Corea del Norte"></option>
                  <option value="Costa de Marfíl"></option>
                  <option value="Costa Rica"></option>
                  <option value="Croacia (Hrvatska)"></option>
                  <option value="Cuba"></option>
                  <option value="Dinamarca"></option>
                  <option value="Djibouti"></option>
                  <option value="Dominica"></option>
                  <option value="Ecuador"></option>
                  <option value="Egipto"></option>
                  <option value="El Salvador"></option>
                  <option value="Emiratos Árabes Unidos"></option>
                  <option value="Eritrea"></option>
                  <option value="Eslovenia"></option>
                  <option value="España"></option>
                  <option value="Estados Unidos"></option>
                  <option value="Estonia"></option>
                  <option value="Etiopía"></option>
                  <option value="Fiji"></option>
                  <option value="Filipinas"></option>
                  <option value="Finlandia"></option>
                  <option value="Francia"></option>
                  <option value="Gabón"></option>
                  <option value="Gambia"></option>
                  <option value="Georgia"></option>
                  <option value="Ghana"></option>
                  <option value="Gibraltar"></option>
                  <option value="Granada"></option>
                  <option value="Grecia"></option>
                  <option value="Groenlandia"></option>
                  <option value="Guadalupe"></option>
                  <option value="Guam"></option>
                  <option value="Guatemala"></option>
                  <option value="Guayana"></option>
                  <option value="Guayana Francesa"></option>
                  <option value="Guinea"></option>
                  <option value="Guinea Ecuatorial"></option>
                  <option value="Guinea-Bissau"></option>
                  <option value="Haití"></option>
                  <option value="Honduras"></option>
                  <option value="Hungría"></option>
                  <option value="India"></option>
                  <option value="Indonesia"></option>
                  <option value="Irak"></option>
                  <option value="Irán"></option>
                  <option value="Irlanda"></option>
                  <option value="Isla Bouvet"></option>
                  <option value="Isla de Christmas"></option>
                  <option value="Islandia"></option>
                  <option value="Islas Caimán"></option>
                  <option value="Islas Cook"></option>
                  <option value="Islas de Cocos o Keeling"></option>
                  <option value="Islas Faroe"></option>
                  <option value="Islas Heard y McDonald"></option>
                  <option value="Islas Malvinas"></option>
                  <option value="Islas Marianas del Norte"></option>
                  <option value="Islas Marshall"></option>
                  <option value="Islas menores de Estados Unidos"></option>
                  <option value="Islas Palau"></option>
                  <option value="Islas Salomón"></option>
                  <option value="Islas Svalbard y Jan Mayen"></option>
                  <option value="Islas Tokelau"></option>
                  <option value="Islas Turks y Caicos"></option>
                  <option value="Islas Vírgenes (EEUU)"></option>
                  <option value="Islas Vírgenes (Reino Unido)"></option>
                  <option value="Islas Wallis y Futuna"></option>
                  <option value="Israel"></option>
                  <option value="Italia"></option>
                  <option value="Jamaica"></option>
                  <option value="Japón"></option>
                  <option value="Jordania"></option>
                  <option value="Kazajistán"></option>
                  <option value="Kenia"></option>
                  <option value="Kirguizistán"></option>
                  <option value="Kiribati"></option>
                  <option value="Kuwait"></option>
                  <option value="Laos"></option>
                  <option value="Lesotho"></option>
                  <option value="Letonia"></option>
                  <option value="Líbano"></option>
                  <option value="Liberia"></option>
                  <option value="Libia"></option>
                  <option value="Liechtenstein"></option>
                  <option value="Lituania"></option>
                  <option value="Luxemburgo"></option>
                  <option value="Macedonia, Ex-República Yugoslava de"></option>
                  <option value="Madagascar"></option>
                  <option value="Malasia"></option>
                  <option value="Malawi"></option>
                  <option value="Maldivas"></option>
                  <option value="Malí"></option>
                  <option value="Malta"></option>
                  <option value="Marruecos"></option>
                  <option value="Martinica"></option>
                  <option value="Mauricio"></option>
                  <option value="Mauritania"></option>
                  <option value="Mayotte"></option>
                  <option value="México"></option>
                  <option value="Micronesia"></option>
                  <option value="Moldavia"></option>
                  <option value="Mónaco"></option>
                  <option value="Mongolia"></option>
                  <option value="Montserrat"></option>
                  <option value="Mozambique"></option>
                  <option value="Namibia"></option>
                  <option value="Nauru"></option>
                  <option value="Nepal"></option>
                  <option value="Nicaragua"></option>
                  <option value="Níger"></option>
                  <option value="Nigeria"></option>
                  <option value="Niue"></option>
                  <option value="Norfolk"></option>
                  <option value="Noruega"></option>
                  <option value="Nueva Caledonia"></option>
                  <option value="Nueva Zelanda"></option>
                  <option value="Omán"></option>
                  <option value="Países Bajos"></option>
                  <option value="Panamá"></option>
                  <option value="Papúa Nueva Guinea"></option>
                  <option value="Paquistán"></option>
                  <option value="Paraguay"></option>
                  <option value="Perú"></option>
                  <option value="Pitcairn"></option>
                  <option value="Polinesia Francesa"></option>
                  <option value="Polonia"></option>
                  <option value="Portugal"></option>
                  <option value="Puerto Rico"></option>
                  <option value="Qatar"></option>
                  <option value="Reino Unido"></option>
                  <option value="República Centroafricana"></option>
                  <option value="República Checa"></option>
                  <option value="República de Sudáfrica"></option>
                  <option value="República Dominicana"></option>
                  <option value="República Eslovaca"></option>
                  <option value="Reunión"></option>
                  <option value="Ruanda"></option>
                  <option value="Rumania"></option>
                  <option value="Rusia"></option>
                  <option value="Sahara Occidental"></option>
                  <option value="Saint Kitts y Nevis"></option>
                  <option value="Samoa"></option>
                  <option value="Samoa Americana"></option>
                  <option value="San Marino"></option>
                  <option value="San Vicente y Granadinas"></option>
                  <option value="Santa Helena"></option>
                  <option value="Santa Lucía"></option>
                  <option value="Santo Tomé y Príncipe"></option>
                  <option value="Senegal"></option>
                  <option value="Seychelles"></option>
                  <option value="Sierra Leona"></option>
                  <option value="Singapur"></option>
                  <option value="Siria"></option>
                  <option value="Somalia"></option>
                  <option value="Sri Lanka"></option>
                  <option value="St Pierre y Miquelon"></option>
                  <option value="Suazilandia"></option>
                  <option value="Sudán"></option>
                  <option value="Suecia"></option>
                  <option value="Suiza"></option>
                  <option value="Surinam"></option>
                  <option value="Tailandia"></option>
                  <option value="Taiwán"></option>
                  <option value="Tanzania"></option>
                  <option value="Tayikistán"></option>
                  <option value="Territorios franceses del Sur"></option>
                  <option value="Timor Oriental"></option>
                  <option value="Togo"></option>
                  <option value="Tonga"></option>
                  <option value="Trinidad y Tobago"></option>
                  <option value="Túnez"></option>
                  <option value="Turkmenistán"></option>
                  <option value="Turquía"></option>
                  <option value="Tuvalu"></option>
                  <option value="Ucrania"></option>
                  <option value="Uganda"></option>
                  <option value="Uruguay"></option>
                  <option value="Uzbekistán"></option>
                  <option value="Vanuatu"></option>
                  <option value="Venezuela"></option>
                  <option value="Vietnam"></option>
                  <option value="Yemen"></option>
                  <option value="Yugoslavia"></option>
                  <option value="Zambia"></option>
                  <option value="Zimbabue"></option>
                </datalist>
              </p>
              <p>
                <label htmlFor="address/state">
                  <span>Estado</span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <Input
                  type="text"
                  id="state"
                  name="address/state"
                  placeholder="Escribe el estado"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </p>
            </div>
            {/*  <div className="multiBox">
              <p>
                <label htmlFor="address/town">
                  <span>Ciudad</span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <Input
                  type="text"
                  id="town"
                  name="address/town"
                  placeholder="Escribe la ciudad"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </p>
              <p>
                <label htmlFor="address/suburb">
                  <span>Colonia / Barrio</span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <Input
                  type="text"
                  id="suburb"
                  name="address/suburb"
                  placeholder="Escribe el barrio / Colonia / etc"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </p>
            </div>
            <div className="multiBox">
              <p>
                <label htmlFor="address/street">
                  <span>Calle</span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <Input
                  type="text"
                  id="street"
                  name="address/street"
                  placeholder="Escribe la calle / avenida"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </p>
              <p>
                <label htmlFor="address/zip_code">
                  <span>Codigo postal</span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <Input
                  type="text"
                  id="zip_code"
                  name="address/zip_code"
                  placeholder="Escribe el codigo postal"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </p>
            </div>
            <div className="multiBox">
              <p>
                <label htmlFor="address/num_ext">
                  <span>Nº edificio</span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <Input
                  type="text"
                  id="num_ext"
                  name="address/num_ext"
                  placeholder="Si no aplica escribe 0"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </p>
              <p>
                <label htmlFor="address/num_int">
                  <span>Nº casa o apto</span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <Input
                  type="text"
                  id="num_int"
                  name="address/num_int"
                  placeholder="Si no aplica escribe 0"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </p>
            </div> */}
          </fieldset>
          <section>
            <Input
              type="checkbox"
              id="subscribed"
              name="user/subscribed"
              onChange={handleCheck}
            />
            <label htmlFor="user/subscribed form-control">
              Deseo recibir ofertas de empleo basadas en los datos de mi CV.
            </label>
          </section>
          <ButtonBox>
            <input type="submit" value="Enviar" />
          </ButtonBox>
        </form>
      </div>
    </FirstTimeModal>
  );
};

export default FirstTime;
