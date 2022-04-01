import { useRef, useState } from 'react';
import Modal from '../../components/Modal';
import styled from 'styled-components';
import LoadingButton from '../../components/Buttons/LoadingButton';
import OutlinedButton from '../../components/Buttons/OutlinedButton';
import AlertMessage from '../../components/AlertMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import ModalLayout from '../../components/Modal/ModalLayout';

const Select = styled.select`
  width: 100%;
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  border-radius: 3px;
  padding: 10px;
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  width: 50px;
  height: 50px;
  color: green;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const ConfirmChangeStatusModal = ({
  openChangeStatusModal,
  setOpenChangeStatusModal,
  isHired,
  data,
  userSelectedId,
  setData,
}) => {
  const [loading, setLoading] = useState(false);
  const ModalWrapperRef = useRef();
  const selectedUserStatus = data.find((user) => user.id === userSelectedId);
  const selectedUserStatusPosition = data.findIndex(
    (user) => user.id === userSelectedId
  );

  const handleChangeStatus = async () => {
    setLoading(true);
    selectedUserStatus.isHired = !isHired;
    try {
      const response = await new Promise((resolve, reject) =>
        setTimeout(() => resolve('data'), 2000)
      );
      toast.success('Se ha cambiado el estatus');
      ModalWrapperRef.current.classList.add('fadeOut');
      const arrCopy = [...data];
      arrCopy[selectedUserStatusPosition] = selectedUserStatus;
      console.log(arrCopy);
      setTimeout(() => setData([...arrCopy]), 250);
      setTimeout(() => setOpenChangeStatusModal(false), 250);
    } catch (err) {
      toast.error('No se pudo cambiar el estatus');
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={openChangeStatusModal}
      element={
        <ModalLayout ref={ModalWrapperRef}>
          <FontAwesomeIconStyled icon={faCircleCheck} />
          <h2>¿Estás seguro que quieres cambiar el status?</h2>
          <p>
            Cambiar el estatus de <strong>{selectedUserStatus.name}</strong> a:
          </p>
          <AlertMessage info={isHired} success={!isHired} fullWidth>
            {isHired ? 'Looking for a job' : 'contratado'}
          </AlertMessage>
          {!isHired && (
            <>
              <p>¿Cúal empresa lo contrató?</p>
              <Select>
                <option value='hackademy'>hackademy</option>
                <option value='empresa2'>empresa2</option>
                <option value='empresa3'>empresa3</option>
              </Select>
            </>
          )}
          <ButtonContainer>
            <OutlinedButton
              fullWidth
              disabled={loading}
              onClick={() => {
                ModalWrapperRef.current.classList.add('fadeOut');
                setTimeout(() => setOpenChangeStatusModal(false), 250);
              }}
            >
              cancelar
            </OutlinedButton>
            <LoadingButton
              fullWidth
              onClick={handleChangeStatus}
              loading={loading}
              disabled={loading}
            >
              confirmar
            </LoadingButton>
          </ButtonContainer>
        </ModalLayout>
      }
    />
  );
};

export default ConfirmChangeStatusModal;
