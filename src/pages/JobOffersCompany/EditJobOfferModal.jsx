import { useRef, useState } from 'react';
import Modal from '../../components/Modal';
import ModalLayout from '../../components/Modal/ModalLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Input from '../../components/Input';
import LoadingButton from '../../components/Buttons/LoadingButton';
import axios from 'axios';
import { toast } from 'react-toastify';

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  width: 50px;
  height: 50px;
  color: #7777ff;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  label {
    align-self: flex-start;
    margin-left: 3px;
    font-size: 14px;
  }

  textarea {
    resize: vertical;
    overflow-wrap: break-word;
    padding: 8px 15px;
    border-radius: 10px;
    outline: 2px solid #b6b6b6;
    :focus-visible {
      outline-color: #565696;
    }
    :hover {
      outline-color: #757575;
    }
    :hover:focus-visible {
      outline-color: #565696;
    }
  }
`;

const EditJobOfferModal = ({
  openModal,
  id,
  setOpenModalEditJobOffer,
  jobOfferData,
  setJobOfferData,
}) => {
  const [jobOfferToBeChanged, setJobOfferToBeChanged] = useState(
    jobOfferData.find((jobOffer) => jobOffer.id === id)
  );
  const [jobOfferHasChanged, setJobOfferHasChanged] = useState([]);
  const [loading, setLoading] = useState(false);
  const jobOffer = jobOfferData.find((jobOffer) => jobOffer.id === id);
  const ModalLayoutRef = useRef();

  const MIN_DATE = new Date(jobOfferToBeChanged.start_date).toLocaleDateString(
    'en-CA'
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'end_date' && value.length === 0) {
      //check if end_date is empty
      setJobOfferToBeChanged((prev) => ({ ...prev, [name]: null }));
    } else if (name === 'minimun_salary') {
      setJobOfferToBeChanged((prev) => ({ ...prev, [name]: +value }));
    } else {
      // update values
      setJobOfferToBeChanged((prev) => ({ ...prev, [name]: value }));
    }

    if (!jobOfferHasChanged.includes(name) && jobOffer[name] != value) {
      // check if the values are equal and update the array
      setJobOfferHasChanged((prev) => [...prev, name]);
    } else if (jobOfferHasChanged.includes(name) && jobOffer[name] == value) {
      // check if values are not equal and remove from the array
      setJobOfferHasChanged((prev) => prev.filter((key) => key != name));
    } else if (
      jobOfferHasChanged.includes(name) &&
      name === 'end_date' &&
      value.length === 0
    ) {
      // check if end_date is equal and remove it from the array
      setJobOfferHasChanged((prev) => prev.filter((key) => key != name));
    }
  };

  const UpdateJobOffer = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/company/vacancy/${id}`,
        jobOfferToBeChanged,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      console.log(data);
      //update JobOfferData
      const arrCopy = [...jobOfferData];
      const arrCopyIndex = arrCopy.findIndex((obj) => obj.id === id);
      arrCopy[arrCopyIndex] = data;
      setJobOfferData(arrCopy);
      toast.success('Comentario actualizado exitosamente');
      ModalLayoutRef.current.classList.add('fadeOut');
      setTimeout(() => setOpenModalEditJobOffer(false), 250);
    } catch (err) {
      console.log(err);
      toast.error('Opps no se pudo actualizar, inténtalo de nuevo');
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={openModal}
      element={
        <ModalLayout
          ref={ModalLayoutRef}
          setOpenModal={setOpenModalEditJobOffer}
        >
          <FontAwesomeIconStyled icon={faPencil} />
          <h1>Editar Vacante</h1>
          <InputContainer>
            <label>Name</label>
            <Input
              fullWidth
              value={jobOfferToBeChanged.name}
              name="name"
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <label>description</label>
            <textarea
              rows="7"
              value={jobOfferToBeChanged.description}
              name="description"
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <label>Area</label>
            <Input
              fullWidth
              value={jobOfferToBeChanged.area}
              name="area"
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <label>start_date</label>
            <Input
              fullWidth
              type="date"
              value={jobOfferToBeChanged.start_date}
              min={MIN_DATE}
              name="start_date"
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <label>end_date</label>
            <Input
              fullWidth
              type="date"
              value={jobOfferToBeChanged.end_date || ''}
              name="end_date"
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <label>minimun_salary</label>
            <Input
              fullWidth
              value={jobOfferToBeChanged.minimun_salary}
              name="minimun_salary"
              onChange={handleChange}
              type="number"
            />
          </InputContainer>
          <LoadingButton
            fullWidth
            disabled={!jobOfferHasChanged.length > 0 || loading}
            loading={loading}
            onClick={UpdateJobOffer}
          >
            Actualizar
          </LoadingButton>
        </ModalLayout>
      }
    />
  );
};

export default EditJobOfferModal;
