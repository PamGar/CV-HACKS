import styled from 'styled-components';

export const AccordeonBox = styled.div`
  cursor: pointer;

  .acordeon {
    border-radius: 5px;
    overflow: hidden;
    margin: 20px;
    box-shadow: 0px 10px 40px -20px grey;
  }

  .header {
    background-color: #99e2e3;
    padding: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .openClose {
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      transition: 0.5s;
      transform: rotate(180deg);

      img {
        width: 100%;
      }
    }
  }

  .body {
    height: auto;
    background-color: #f9f9f9;
    padding: 20px;
    color: black;
    transition-duration: 0.5s;
    cursor: auto;
  }

  .tasks_0 {
    padding-bottom: 20px;
    color: #999999;
  }

  .body_box {
    padding: 10px 0;

    span {
      font-weight: 700;
    }
  }

  .editBox {
    display: flex;
    justify-content: end;

    button {
      margin-left: 20px;
      background: transparent;
      padding: 5px 0 0 5px;
      width: 30px;

      svg {
        font-size: 18px;
      }
    }

    .editBox_edit path {
      color: #92d27b;
    }

    .editBox_delete path {
      color: #ff6666;
    }

    .editBox_hide path {
      color: #ff6666;
      filter: opacity(0.5);
    }

    .editBox_unhide path {
      color: #99e2e3;
    }
  }

  .hide + .body {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  .hide .openClose {
    transform: rotate(0deg);
  }

  .date {
    display: flex;
    justify-content: space-between;

    p {
      width: 45%;
    }
  }

  .separador {
    height: 2px;
    background-color: #bed028;
    margin-bottom: 10px;
  }
`;

export const ButtonBox = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;

  button {
    margin: 0 30px;
  }
`;
