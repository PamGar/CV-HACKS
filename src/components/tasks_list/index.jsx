import React from 'react';
import styled from 'styled-components';

const TasksBox = styled.div`
  padding: 20px;
  text-align: center;
  max-width: 600px;
  font-weight: 300;
  margin-left: auto;
  margin-right: auto;

  ul {
    text-align: left;
    padding: 10px 0 10px 30px;
  }

  li {
    position: relative;
    padding-left: 10px;
    margin: 20px 0;
  }

  li::after {
    content: '';
    background-color: #6610f2;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    left: -25px;
    bottom: 50%;
    transform: translateY(50%);
  }

  ul li::marker {
    color: transparent;
  }

  @media (max-width: 820px) {
    h2 {
      font-size: 20px;
    }

    li {
      font-size: 12px;
    }
  }
`;

const TasksList = () => {
  return (
    <TasksBox>
      <h2>Correcciones recomendadas</h2>
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
