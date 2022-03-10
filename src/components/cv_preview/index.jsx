import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Page = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;

  div {
    width: 100%;
    max-width: 600px;
    aspect-ratio: 3/4;
    box-shadow: 5px 5px 10px grey;
    padding: 20px;
    box-sizing: border-box;
  }
`;

const CV_preview = () => {
  const widthRef = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(widthRef.current.clientWidth);
  }, []);

  useEffect(() => {
    const myWidth = () => {
      setWidth(widthRef.current.clientWidth);
    };

    console.log(widthRef.current.clientHeight);

    window.addEventListener('resize', myWidth);
  });

  const sizeH1 = {
    fontSize: width / 18,
    fontWeight: 'bold',
  };

  const sizeH2 = {
    fontSize: width / 24,
    fontWeight: 'bold',
  };

  const sizeH3 = {
    fontSize: width / 36,
    fontWeight: 'bold',
  };

  const sizeP = {
    fontSize: width / 48,
  };

  return (
    <>
      <Page>
        <div ref={widthRef}>
          <h1 style={sizeH1}>Hello</h1>
          <h2 style={sizeH2}>Hello</h2>
          <h3 style={sizeH3}>Hello</h3>
          <p style={sizeP}>Alexis Salcedo</p>
        </div>
      </Page>
    </>
  );
};

export default CV_preview;
