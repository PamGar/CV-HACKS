import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/logo_color.png';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
    max-width: 200px;

    img {
      width: 100%;
    }
  }

  .fingerprint-spinner,
  .fingerprint-spinner * {
    box-sizing: border-box;
  }

  .fingerprint-spinner {
    height: 64px;
    width: 64px;
    padding: 2px;
    overflow: hidden;
    position: relative;
  }

  .fingerprint-spinner .spinner-ring {
    position: absolute;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #565696;
    animation: fingerprint-spinner-animation 1500ms
      cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards;
    margin: auto;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  .fingerprint-spinner .spinner-ring:nth-child(1) {
    height: calc(60px / 9 + 0 * 60px / 9);
    width: calc(60px / 9 + 0 * 60px / 9);
    animation-delay: calc(50ms * 1);
  }

  .fingerprint-spinner .spinner-ring:nth-child(2) {
    height: calc(60px / 9 + 1 * 60px / 9);
    width: calc(60px / 9 + 1 * 60px / 9);
    animation-delay: calc(50ms * 2);
  }

  .fingerprint-spinner .spinner-ring:nth-child(3) {
    height: calc(60px / 9 + 2 * 60px / 9);
    width: calc(60px / 9 + 2 * 60px / 9);
    animation-delay: calc(50ms * 3);
  }

  .fingerprint-spinner .spinner-ring:nth-child(4) {
    height: calc(60px / 9 + 3 * 60px / 9);
    width: calc(60px / 9 + 3 * 60px / 9);
    animation-delay: calc(50ms * 4);
  }

  .fingerprint-spinner .spinner-ring:nth-child(5) {
    height: calc(60px / 9 + 4 * 60px / 9);
    width: calc(60px / 9 + 4 * 60px / 9);
    animation-delay: calc(50ms * 5);
  }

  .fingerprint-spinner .spinner-ring:nth-child(6) {
    height: calc(60px / 9 + 5 * 60px / 9);
    width: calc(60px / 9 + 5 * 60px / 9);
    animation-delay: calc(50ms * 6);
  }

  .fingerprint-spinner .spinner-ring:nth-child(7) {
    height: calc(60px / 9 + 6 * 60px / 9);
    width: calc(60px / 9 + 6 * 60px / 9);
    animation-delay: calc(50ms * 7);
  }

  .fingerprint-spinner .spinner-ring:nth-child(8) {
    height: calc(60px / 9 + 7 * 60px / 9);
    width: calc(60px / 9 + 7 * 60px / 9);
    animation-delay: calc(50ms * 8);
  }

  .fingerprint-spinner .spinner-ring:nth-child(9) {
    height: calc(60px / 9 + 8 * 60px / 9);
    width: calc(60px / 9 + 8 * 60px / 9);
    animation-delay: calc(50ms * 9);
  }

  @keyframes fingerprint-spinner-animation {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PublicCvLoader = () => {
  return (
    <Wrapper>
      <div>
        {/* <div class="fingerprint-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div> */}
        <img src={Logo} alt="Logo hackademy" />
      </div>
    </Wrapper>
  );
};

export default PublicCvLoader;
