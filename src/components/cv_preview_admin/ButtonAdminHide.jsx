import React from 'react';
import styled from 'styled-components';

const ButtonAdminHide = (URL, id, isPublic) => {
  return (
    <ButtonAdminHide>
      <button
        style={{
          backgroundColor: item.admin_public ? '#ff6666' : '#00595a',
        }}
        onClick={(event) =>
          adminHide(event, 'cv/educations/', item.id, item.admin_public)
        }
      >
        {item.admin_public ? 'Ocultar' : 'Mostrar'}
      </button>
    </ButtonAdminHide>
  );
};

export default ButtonAdminHide;
