import React from 'react';
import styled from 'styled-components';

const TasksBox = styled.div`
  padding: 20px;
  text-align: center;
  font-weight: 300;
`;

const Task = styled.section`
  display: flex;
  align-items: center;
  padding: 20px 0;
  text-align: left;

  label {
    width: unset;
    margin-left: 20px;
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
  return (
    <>
      <TasksBox>
        <h2>Correcciones recomendadas</h2>
        <Task>
          <Input type="checkbox" id="checkbox" name="checkbox" />
          <label for="checkbox form-control">
            Etiam commodo, eros placerat feugiat ullamcorper, dolor eros
            placerat tellus, in ornare ligula magna dignissim felis. Phasellus
            convallis fringilla ex, ac vulputate lacus.
          </label>
        </Task>
        <Task>
          <Input type="checkbox" id="checkbox" name="checkbox" />
          <label for="checkbox form-control">
            Lorem ipsum dolor sit amet consectetur adipisicing elit, Lorem ipsum
            dolor sit amet consectetur adipisicing elit.
          </label>
        </Task>
        <Task>
          <Input type="checkbox" id="checkbox" name="checkbox" />
          <label for="checkbox form-control">
            Etiam commodo, eros placerat feugiat ullamcorper, dolor eros
            placerat tellus.
          </label>
        </Task>
        <Task>
          <Input type="checkbox" id="checkbox" name="checkbox" />
          <label for="checkbox form-control">
            Placerat feugiat ullamcorper, dolor eros placerat tellus, in ornare
            ligula magna dignissim felis. Phasellus convallis.
          </label>
        </Task>
      </TasksBox>
      <TasksBox>
        <h2>Correcciones completadas</h2>
        <Task>
          <Input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            disabled
            checked
          />
          <label className="form-control--disabled" for="checkbox form-control">
            Etiam commodo, eros placerat feugiat ullamcorper, dolor eros
            placerat tellus.
          </label>
        </Task>
        <Task>
          <Input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            disabled
            checked
          />
          <label className="form-control--disabled" for="checkbox form-control">
            Placerat feugiat ullamcorper, dolor eros placerat tellus, in ornare
            ligula magna dignissim felis. Phasellus convallis.
          </label>
        </Task>
      </TasksBox>
    </>
  );
};

export default TasksTodo;
