import React, { useState } from 'react';
import styled from 'styled-components';

const TasksBox = styled.div`
  padding: 20px;
  text-align: center;
  width: 80%;
  max-width: 600px;
  font-weight: 300;
  margin-left: auto;
  margin-right: auto;

  h2 {
    background: linear-gradient(40deg, #00b7b8, #595295);
    padding: 20px;
    box-shadow: 0px 10px 40px -20px grey;
    border-radius: 15px;
    font-size: 16px;
    color: #fff;
    letter-spacing: 2px;
  }

  .tasks_0 {
    padding: 20px 0;
    color: #999999;
  }

  @media (max-width: 1099px) {
    width: 100%;
  }

  @media (max-width: 820px) {
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
  box-shadow: 0px 10px 40px -20px grey;

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
    cursor: not-allowed;
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

const TasksTodo = () => {
  const [tasks, setTasks] = useState({
    comments: [
      {
        id: 1,
        comment:
          'Uno Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam expedita atque corporis quas fugiat ex perspiciatis, minus dolor! Impedit, inventore!',
        state: true,
      },
      {
        id: 2,
        comment:
          'Dos Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam expedita atque corporis quas fugiat ex perspiciatis, minus dolor! Impedit, inventore!',
        state: true,
      },
      {
        id: 3,
        comment:
          'Tres Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam expedita atque corporis quas fugiat ex perspiciatis, minus dolor! Impedit, inventore!',
        state: false,
      },
      {
        id: 4,
        comment:
          'Cuatro Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam expedita atque corporis quas fugiat ex perspiciatis, minus dolor! Impedit, inventore!',
        state: true,
      },
      {
        id: 5,
        comment:
          'Cinco Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam expedita atque corporis quas fugiat ex perspiciatis, minus dolor! Impedit, inventore!',
        state: false,
      },
      {
        id: 6,
        comment:
          'Seis Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam expedita atque corporis quas fugiat ex perspiciatis, minus dolor! Impedit, inventore!',
        state: true,
      },
      {
        id: 7,
        comment:
          'Seis Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam expedita atque corporis quas fugiat ex perspiciatis, minus dolor! Impedit, inventore!',
        state: true,
      },
      {
        id: 8,
        comment:
          'Seis Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam expedita atque corporis quas fugiat ex perspiciatis, minus dolor! Impedit, inventore!',
        state: true,
      },
      {
        id: 9,
        comment:
          'Seis Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam expedita atque corporis quas fugiat ex perspiciatis, minus dolor! Impedit, inventore!',
        state: true,
      },
    ],
  });

  const toggleDone = (id) => {
    // loop over the todos list and find the provided id.
    let updatedList = tasks.comments.map((item) => {
      if (item.id === id) {
        return { ...item, state: !item.state }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });

    setTasks({ comments: updatedList }); // set state to new object with updated list
  };

  const tasksDone = tasks.comments.filter((item) => item.state === true).length;
  const tasksUndone = tasks.comments.filter(
    (item) => item.state === false
  ).length;

  return (
    <>
      <TasksBox>
        <h2>Correcciones recomendadas</h2>

        {tasksDone !== 0 ? (
          tasks.comments.map((currentValue) => {
            if (currentValue.state) {
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
                    <p>Sonia Gastelum</p>
                    <p>Estudios</p>
                    <p>Hace 3 dias</p>
                  </div>
                </Task>
              );
            } else {
              return null;
            }
          })
        ) : (
          <p className="tasks_0">No tienes correcciones pendientes</p>
        )}
      </TasksBox>
      <TasksBox>
        <h2>Correcciones completadas</h2>

        {tasksUndone !== 0 ? (
          tasks.comments.map((currentValue) => {
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
                    <p>Sonia Gastelum</p>
                    <p>Estudios</p>
                    <p>Hace 3 dias</p>
                  </div>
                </Task>
              );
            } else {
              return null;
            }
          })
        ) : (
          <p className="tasks_0">Aun no has completado ninguna correccion</p>
        )}
      </TasksBox>
    </>
  );
};

export default TasksTodo;
