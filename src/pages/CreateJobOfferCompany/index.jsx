import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MainContentWrapper from '../../components/MainContentWrapper';
import Input from '../../components/Input';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import ModalLayout from '../../components/Modal/ModalLayout';
import LoadingButton from '../../components/Buttons/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    margin-left: 5px;
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

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  max-width: 412px;
  gap: 10px;
`;

const Description = styled.div`
  text-align: left;
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  color: green;
  width: 50px;
  height: 50px;
`;

const DescriptionTag = styled.p`
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
`;

const CreateJobOfferCompany = () => {
  const [jobOfferData, setJobOfferData] = useState({
    name: '',
    description: '',
    area: '',
    start_date: '',
    end_date: null,
    minimun_salary: '',
  });
  const [jobOfferDataValidation, setJobOfferDataValidation] = useState({
    name: false,
    description: false,
    area: false,
    start_date: true,
    end_date: true,
    minimun_salary: false,
  });
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const ModalLayoutRef = useRef();

  const date = new Date();
  const today =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    '-' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobOfferData((prev) => ({ ...prev, [name]: value }));
    setJobOfferDataValidation((prev) => ({ ...prev, [name]: !!value }));
  };

  const PostJobOffer = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${
          process.env.REACT_APP_BASE_URL
        }/company/vacancies/${localStorage.getItem('id')}`,
        jobOfferData,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      toast.success('Vacante creada exitosamente');
      ModalLayoutRef.current.classList.add('fadeOut');
      setTimeout(() => setOpenModal(false), 250);
      setJobOfferData({
        name: '',
        description: '',
        area: '',
        start_date: today,
        end_date: null,
        minimun_salary: '',
      });
      setJobOfferDataValidation({
        name: false,
        description: false,
        area: false,
        start_date: true,
        end_date: true,
        minimun_salary: false,
      });
    } catch (err) {
      console.log(err.response.data.description);
      if (err.response.status == 400) {
        toast.error(err.response.data.description[0]);
      } else {
        toast.error('Opp no se pudo crear la vacante');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setJobOfferData((prev) => ({ ...prev, ['start_date']: today }));
  }, []);

  useEffect(() => {
    new Set(Object.values(jobOfferDataValidation)).size == true
      ? setDisableButton(false)
      : setDisableButton(true);
  }, [jobOfferData]);

  return (
    <>
      <MainContentWrapper
        paddingTop
        singleButton
        loadingButtonTitle='crear vacante'
        onClickLoadingButton={(e) => {
          e.preventDefault();
          setOpenModal(true);
        }}
        disableButton={disableButton}
      >
        <h1>CreateJobOfferCompany</h1>
        <InputContainer>
          <label>Nombre de la vacante</label>
          <Input
            required
            onChange={handleChange}
            name='name'
            value={jobOfferData.name}
          />
        </InputContainer>
        <InputContainer>
          <label>Descripción</label>
          <textarea
            required
            onChange={handleChange}
            value={jobOfferData.description}
            name='description'
            rows='10'
          />
        </InputContainer>
        <InputContainer>
          <label>Area</label>
          <Input
            required
            onChange={handleChange}
            name='area'
            value={jobOfferData.area}
          />
        </InputContainer>
        <InputContainer>
          <label>Fecha de inicio</label>
          <Input
            required
            onChange={handleChange}
            name='start_date'
            type='date'
            value={today}
          />
        </InputContainer>
        <InputContainer>
          <label>Fecha de finalización (opcional)</label>
          <Input
            onChange={handleChange}
            name='end_date'
            type='date'
            min={today}
          />
        </InputContainer>
        <InputContainer>
          <label>Salario mínimo</label>
          <Input
            required
            onChange={handleChange}
            name='minimun_salary'
            type='number'
            value={jobOfferData.minimun_salary}
          />
        </InputContainer>
      </MainContentWrapper>
      <Modal
        element={
          <ModalLayout
            ref={ModalLayoutRef}
            setOpenModal={() => setOpenModal(false)}
          >
            <FontAwesomeIconStyled icon={faMagnifyingGlass} />
            <h1>Verifica los datos cargados</h1>
            <DescriptionContainer>
              <Description>
                <h3>Nombre de la vacante:</h3>
                <p>{jobOfferData.name}</p>
              </Description>
              <Description>
                <h3>Descripción:</h3>
                <DescriptionTag>{jobOfferData.description}</DescriptionTag>
              </Description>
              <Description>
                <h3>Area:</h3>
                <p>{jobOfferData.area}</p>
              </Description>
              <Description>
                <h3>Salario mínimo:</h3>
                <p>MXN {jobOfferData.minimun_salary}</p>
              </Description>
            </DescriptionContainer>
            <LoadingButton
              fullWidth
              onClick={PostJobOffer}
              loading={loading}
              disabled={loading}
            >
              Confirmar
            </LoadingButton>
          </ModalLayout>
        }
        isOpen={openModal}
      />
    </>
  );
};

export default CreateJobOfferCompany;
