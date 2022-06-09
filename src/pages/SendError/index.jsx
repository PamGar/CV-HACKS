import React, { useState } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import LoadingButton from '../../components/Buttons/LoadingButton';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
padding: 30px;

label {
    margin: 10px 0 5px 10px;
    font-size: 14px;
  }

  input {
    border-radius: 15px;
    padding: 15px 10px;
    background-color: #ededed;
  }

  input:focus {
    outline: none !important;
    border-color: #63b2b3;
    box-shadow: 0 0 10px #63b2b3;
  }

  textarea {
    border-radius: 10px;
    padding: 15px 10px;
    background-color: #ededed;
    resize: none;
    margin-bottom: 20px;

    &:focus {
      outline: none !important;
      border-color: #63b2b3;
      box-shadow: 0 0 10px #63b2b3;
    }
  }
`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const SendErr = () => {
    const URL = `${process.env.REACT_APP_BASE_URL}/feedback/`;
    const myToken = window.localStorage.getItem('authToken');
    const [item, setItem] = useState({
        title: '',
        comment: '',
      });

      console.log(item)

      const handleChange = (event) => {
        const { name, value } = event.target;
        setItem({
          ...item,
          [name]: value,
        });
      };

      const sendError = async (event ) => {
        event.preventDefault();
    
        try {
          const { data } = await axios.post(
            URL,item,
            {
              headers: {
                authorization: `Token ${myToken}`,
              },
            }
          );
          toast.success('Enviado con exito, muchas gracias!');
          setItem({
            title: '',
            comment: ''
          });
        } catch (error) {
          console.error('error', error);
          toast.error('Oops, ocurrio algo inesperado');
        }
      };

  return (
    <Wrapper>
        <h1>Registrar error</h1>
        <p>Ayudanos a mejorar el flujo y calidad de la app para ti, si encuentras algun error, encuentras complicado el uso de algo, o tienes alguna recomendacion o peticion la puedes hacer llegar a travez de este formulario, agradeceremos tu ayuda. :) :)</p>
        <Form onSubmit={sendError}>
            <label htmlFor="title">Titulo</label>
            <input type="text" name='title' placeholder='Escribe un titulo descriptivo de que va el error' onChange={handleChange} value={item.title} required/>
            <label htmlFor="descripcion">Escribe el error que encontraste o haznos alguna recomendacion</label>
            <textarea name="comment" cols="30" rows="10" placeholder='Escribe detalladamente cual fue el error, que intentabas hacer, como se produjo, que estabas haciendo en la app al momento del error' onChange={handleChange} value={item.comment} required></textarea>
            <LoadingButton
              fullWidth
            >
              Enviar
            </LoadingButton>
        </Form>
    </Wrapper>
  )
}

export default SendErr