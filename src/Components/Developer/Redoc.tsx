import React from 'react';
import ReactDOM from 'react-dom';

// @ts-ignore
const redoc = <redoc id='redoc' spec-url='https://petstore.swagger.io/v2/swagger.json'></redoc>;

// @ts-ignore
export default ReactDOM.render(document.getElementbyId(redoc));
