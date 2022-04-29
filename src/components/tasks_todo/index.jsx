import React, { useState, useRef, useEffect } from 'react';
import { format } from 'timeago.js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const TasksWrapper = styled.div`
  @media (max-width: 1000px) {
    background-color: #fff;
    padding: 10px;
    border-radius: 15px;
  }
`;

const TasksBox = styled.div`
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
  width: 95%;
  font-weight: 300;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  border-radius: 15px;
  /* box-shadow: 2px 1px 7px #00000057; */

  @media (max-width: 1000px) {
    padding: 10px;
    box-shadow: unset;
  }

  .hide + div {
    display: none;
  }

  .tasksTitle {
    background: linear-gradient(40deg, #00b7b8, #595295);
    padding: 20px;
    box-shadow: 2px 1px 7px #00000057;
    border-radius: 10px;
    letter-spacing: 2px;
    text-align: left;
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 16px;
      color: #fff;
    }

    button {
      background: transparent;
      position: unset;
      box-shadow: unset;

      svg {
        font-size: 18px;
      }

      .editBox_hide path {
        color: #ffb6b6;
      }

      .editBox_unhide path {
        color: #99e2e3;
      }
    }
  }

  .tasks_0 {
    padding: 20px 0;
    color: #999999;
  }

  @media (max-width: 820px) {
    width: 100%;

    h2 {
      font-size: 20px;
    }

    label {
      font-size: 12px;
    }
  }
`;

const Task = styled.section`
  text-align: left;
  align-items: center;
  padding: 10px;
  margin: 20px 0;
  border-radius: 10px;
  border: solid 1px #99e2e3;
  background-color: #fff;
  box-shadow: 2px 1px 7px #00000057;

  .task {
    display: flex;
  }

  .taskInfo {
    display: flex;
    justify-content: end;

    p {
      color: #c3c3c3;
      margin-left: 20px;
      padding-top: 10px;
      font-size: 12px;
      text-align: center;
    }
  }

  label {
    width: unset;
    margin-left: 10px;
    font-family: 'Poppins', sans-serif;
  }
  input {
    width: unset;
    boder: 1px solid rgb(214, 204, 221);
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
    text-decoration: line-through;
    filter: opacity(0.3);
  }

  input[type='checkbox'] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 25px;
    height: 25px;
    border: 0.15em solid #00b7b8;
    border-radius: 50%;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
    flex: 0 0 25px;
    cursor: pointer;
  }

  input[type='checkbox']::before {
    content: '';
    width: 15px;
    height: 15px;
    clip-path: circle(50% at 50% 50%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #00b7b8;
    /* Windows High Contrast Mode */
    background-color: #00b7b8;
  }

  input[type='checkbox']:checked::before {
    transform: scale(1);
  }

  input[type='checkbox']:focus {
    outline: max(2px, 0.15em) solid #00b7b8;
    outline-offset: max(2px, 0.15em);
  }

  input[type='checkbox']:disabled {
    border: 0.15em solid grey;
    color: grey;
    filter: opacity(0.3);
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

const TasksTodo = (props) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/${props.cvId}`;
  const myToken = window.localStorage.getItem('authToken');
  const [hideTasks, setHideTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const hideTasksRef = useRef(null);

  const getItemsList = async () => {
    try {
      const { data } = await axios.get(`${URL}?page_size=20&page_number=1`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setTasks(data.data);
    } catch (error) {
      console.error('error', error);
    }
  };

  const updateLanguage = async (id, value) => {
    try {
      const { data } = await axios.put(
        `${URL}/${id}`,
        {
          done: value,
        },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
    } catch (error) {
      console.error('error', error);
    }
  };

  const hideTasksHandle = (e) => {
    e.preventDefault();
    setHideTasks(!hideTasks);
    hideTasksRef.current.classList.toggle('hide');
  };

  const toggleDone = (id) => {
    // loop over the todos list and find the provided id.
    let updatedList = tasks.map((item) => {
      if (item.id === id) {
        updateLanguage(item.id, !item.done);
        return { ...item, done: !item.done }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });

    setTasks(updatedList); // set state to new object with updated list
  };

  const tasksDone = tasks.filter((item) => item.done === true).length;
  const tasksUndone = tasks.filter((item) => item.done === false).length;

  useEffect(() => {
    getItemsList();
  }, []);

  return (
    <>
      <TasksWrapper>
        <TasksBox>
          <div className="tasksTitle">
            <h2>Correcciones recomendadas</h2>
          </div>
          {tasksUndone !== 0 ? (
            tasks.map((currentValue) => {
              return (
                <Task key={currentValue.id}>
                  <div className="task">
                    <Input
                      type="checkbox"
                      id="checkbox"
                      name={`task${currentValue.id}`}
                      onChange={() => toggleDone(currentValue.id)}
                    />
                    <label for={`task${currentValue.id} form-control`}>
                      {currentValue.comment}
                    </label>
                  </div>
                  <div className="taskInfo">
                    <p>
                      {currentValue.admin.name}{' '}
                      {currentValue.admin.paternal_surname}
                    </p>
                    <p>{currentValue.description}</p>
                    <p>{format(currentValue.created_date)}</p>
                  </div>
                </Task>
              );
            })
          ) : (
            <p className="tasks_0">No tienes correcciones pendientes</p>
          )}
        </TasksBox>
        <TasksBox>
          <div className="tasksTitle hide" ref={hideTasksRef}>
            <h2>Correcciones completadas</h2>
            <button onClick={hideTasksHandle}>
              {hideTasks ? (
                <FontAwesomeIcon icon={faEyeSlash} className="editBox_hide" />
              ) : (
                <FontAwesomeIcon icon={faEye} className="editBox_unhide" />
              )}
            </button>
          </div>
          <div>
            {tasksDone !== 0 ? (
              tasks.map((currentValue) => {
                if (!currentValue.state) {
                  return (
                    <Task key={currentValue.id}>
                      <div className="task">
                        <Input
                          type="checkbox"
                          id="checkbox"
                          name="checkbox"
                          onChange={() => toggleDone(currentValue.id)}
                          checked
                        />
                        <label
                          className="form-control--disabled"
                          for="checkbox form-control"
                        >
                          {currentValue.comment}
                        </label>
                      </div>
                      <div className="taskInfo">
                        <p>
                          {currentValue.admin.name}{' '}
                          {currentValue.admin.paternal_surname}
                        </p>
                        <p>{currentValue.description}</p>
                        <p>{format(currentValue.created_date)}</p>
                      </div>
                    </Task>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <p className="tasks_0">
                Aun no has completado ninguna correccion
              </p>
            )}
          </div>
        </TasksBox>
      </TasksWrapper>
    </>
  );
};

export default TasksTodo;
