import React from 'react';
import styled from 'styled-components';
import TasksList from '../../../components/tasks_list';
import TasksTodo from '../../../components/tasks_todo';
import Close from '../../../assets/icons/close.svg';

const TasksModal = styled.div`
  padding-top: 20px;
  font-size: 10px;
  position: absolute;
  top: calc(50% + 35px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  background-color: #fff;
  box-shadow: 0 0 20px grey;
  border-radius: 5px;
  max-height: 70vh;
  overflow: scroll;

  button {
    background-color: transparent;
    height: 30px;
    width: 30px;
    position: absolute;
    right: 10px;
    top: 10px;

    img {
      width: 100%;
    }
  }
`;

const Tasks = ({ closeModal, isEdit }) => {
  return (
    <TasksModal>
      <button onClick={closeModal}>
        <img src={Close} alt="" />
      </button>
      {isEdit ? <TasksTodo /> : <TasksList />}
    </TasksModal>
  );
};

export default Tasks;
