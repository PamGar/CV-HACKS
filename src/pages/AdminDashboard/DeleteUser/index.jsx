import { useState } from 'react';
import { toast } from 'react-toastify';
import MainContentWrapper from '../../../components/MainContentWrapper';
import MultipleEmail from '../../../components/MultipleEmail';
import MainAndRightLayout from '../../../layouts/MainAndRightLayout';
import { useNavigate, useParams } from 'react-router-dom';
import UserResumeById from '../ResumeList/UserResumeById';
import axios from 'axios';

const DeleteUser = () => {
  const navigate = useNavigate();
  const myToken = window.localStorage.getItem('authToken');
  const URL = `${process.env.REACT_APP_BASE_URL}/user/`;
  const { id } = useParams();

  const HandleDeleteUser = async () => {
    try {
      const data = await axios.delete(`${URL}${id}/`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      toast.success('Usuario eliminado con exito');
    } catch (err) {
      toast.error('Opps ha ocurrido un error, no se pudo eliminar al usuario');
    }
  };
  return (
    <MainAndRightLayout
      main={
        <MainContentWrapper
          loadingButtonTitle="Eliminar"
          onClickOutlinedButton={() => navigate(-1)}
          onClickLoadingButton={HandleDeleteUser}
          loading={false}
          disableButton={false}
        >
          <h1>Eliminar Usuario</h1>
          <p>
            Esta seguro que quiere eliminar a este usuario, esta accion no se
            puede deshacer.
          </p>
        </MainContentWrapper>
      }
      right={<UserResumeById />}
    />
  );
};

export default DeleteUser;
