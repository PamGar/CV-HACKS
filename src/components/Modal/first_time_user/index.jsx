import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const FirstTime = ({ closeModal, isOpen }) => {
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
        console.log(data);
        closeModal();
      } catch (error) {
        console.log('error', error);
      }
    };

    postData();
  };

  useEffect(() => {
    const myToken = window.localStorage.getItem('authToken');

    const postCV = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/cv/`,
          {
            description: 'Mi primer CV',
          },
          {
            headers: {
              Authorization: `Token ${myToken}`,
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.log('error', error);
      }
    };
    postCV();
  }, []);

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
            <label htmlFor="user/dev_area">
              <span>Area</span>
            </label>
            <Input
              type="text"
              id="dev_area"
              name="user/dev_area"
              placeholder="Escribe tu area (Frontend, backend, mobile, etc)"
              autoComplete="off"
              // onChange={handleChange}
            />
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
                  type="text"
                  id="country"
                  name="address/country"
                  placeholder="Escribe el pais donde te encuentras"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
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
            <div className="multiBox">
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
            </div>
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
