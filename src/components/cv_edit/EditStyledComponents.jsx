import styled from 'styled-components';

export const AccordeonBox = styled.div`
  cursor: pointer;

  .acordeon {
    border-radius: 15px;
    overflow: hidden;
    margin: 30px 20px;
    box-shadow: 2px 1px 7px #00000057;

    .iconAccordeon {
      font-size: 18px;
      margin-right: 10px;

      path {
        color: #fff;
      }
    }
  }

  .header {
    background: linear-gradient(40deg, #00b7b8, #595295);
    color: #fff;
    padding: 25px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 2px;
    font-family: 'Fredoka One', cursive;

    div {
      color: #fff;
      display: flex;
      align-items: center;
      font-family: 'Fredoka One', cursive;
    }

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
    background-color: #f9f9f9;
    padding: 0px 20px;
    color: black;
    transition-duration: 0.5s;
    cursor: auto;

    .wrapperForm {
      display: none;
    }

    .unhide {
      display: block;
    }

    .hide {
      display: none;
    }
  }

  .addPicture {
    padding-top: 20px;
    margin-left: 10px;
    display: flex;
    align-items: center;

    p {
      width: -webkit-fill-available;
      max-width: fit-content;
      font-size: 14px;
      font-weight: 700;
    }

    input {
      opacity: 0;
      width: 0.1px;
      height: 0.1px;
      position: absolute;
    }

    label {
      margin: 0 0 0 10px;
      display: block;
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(40deg, #00b7b8, #99e2e3);
      box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 24px;
      font-weight: 500;
      cursor: pointer;
      transition: transform 0.2s ease-out;
      flex: 0 0 50px;

      &:active {
        background: #007474;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
      }
    }

    span {
      margin-left: 0px;
    }

    .fileName {
      margin-left: 10px;
      color: #c3c3c3;

      button {
        background: none;
        color: #ff6666;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
      }
    }
  }

  .fieldRecomendation {
    font-size: 11px;
    color: #9b9b9b;
    margin-left: 5px;
  }

  .tasks_0 {
    padding: 20px;
    color: #999999;
    margin-top: 0;
  }

  .body_box {
    padding: 20px;

    span {
      font-weight: 700;
    }
  }

  .editBox {
    display: flex;
    justify-content: end;
    margin-top: 10px;

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
    height: 0 !important;
    padding-top: 0;
    padding-bottom: 0;
  }

  .hide .openClose {
    transform: rotate(0deg);
  }

  .twoColumns {
    display: flex;
    justify-content: space-between;

    & > div {
      width: 48%;

      .check_data {
        display: flex;
        align-items: center;
        margin-top: 10px;

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
          border-radius: 10px;
          transform: translateY(-0.075em);
          display: grid;
          place-content: center;
          flex: 0 0 25px;
          padding: 0;
        }

        input[type='checkbox']::before {
          content: '';
          width: 15px;
          height: 15px;
          clip-path: polygon(
            21% 78%,
            0% 42%,
            42% 70%,
            100% 8%,
            66% 75%,
            40% 95%
          );
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

        label {
          margin: 0 0 0 5px;
          font-weight: 500;
        }
      }
    }
  }

  .twoColumns__redes {
    select {
      width: 50%;
      padding: 10px;
      background: #ededed;
      border-radius: 10px;
    }
  }

  .redesSociales {
    .inputUrl {
      width: 100%;
      margin-top: 10px;
    }

    .editBox {
      margin-top: 0;
    }

    .socialButtonsBox {
      display: flex;
      justify-content: space-evenly;

      svg,
      button {
        font-size: 18px;
      }

      button {
        width: 100px;
      }
    }

    .addIcon {
      height: 50px;
      font-weight: 700;
      color: #57d737;
      background: none;
      cursor: pointer;
    }

    .editBox_xmark path {
      color: #ff6666;
    }
  }

  textarea {
    border-radius: 10px;
    padding: 15px 10px;
    background-color: #ededed;
    resize: none;

    &:focus {
      outline: none !important;
      border-color: #63b2b3;
      box-shadow: 0 0 10px #63b2b3;
    }
  }

  .separador {
    height: 2px;
    background-color: #bed028;
    margin-bottom: 20px;
  }

  .redList {
    .redItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0px 10px 20px 10px;
    }

    a {
      text-decoration: none;
      font-weight: 700;
      color: #00b7b8;
    }
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

export const ButtonBoxSticky = styled(ButtonBox)`
  bottom: 20px;
  position: sticky;

  button {
    background-color: #565696;
  }
`;
