import React from 'react';
import styled from 'styled-components';

const TasksBox = styled.div`
  padding: 20px;
  text-align: center;
  font-weight: 300;

  ul {
    text-align: left;
    padding: 10px 30px;
  }

  li {
    position: relative;
    padding-left: 20px;
    margin: 20px 0;
  }

  li::after {
    content: '';
    background-color: #6610f2;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    left: -25px;
    bottom: 50%;
    transform: translateY(50%);
  }

  ul li::marker {
    color: transparent;
  }
`;

const TasksList = () => {
  return (
    <TasksBox>
      <h1>Correcciones recomendadas</h1>
      <ul>
        <li>
          Etiam commodo, eros placerat feugiat ullamcorper, dolor eros placerat
          tellus, in ornare ligula magna dignissim felis. Phasellus convallis
          fringilla ex, ac vulputate lacus.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit, Lorem ipsum
          dolor sit amet consectetur adipisicing elit.
        </li>
        <li>
          Etiam commodo, eros placerat feugiat ullamcorper, dolor eros placerat
          tellus.
        </li>
        <li>
          Placerat feugiat ullamcorper, dolor eros placerat tellus, in ornare
          ligula magna dignissim felis. Phasellus convallis.
        </li>
      </ul>
    </TasksBox>
  );
};

export default TasksList;
