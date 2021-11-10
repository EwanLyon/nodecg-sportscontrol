import React from 'react';
import {render} from 'react-dom';
import styled from 'styled-components';

const GraphicContainer = styled.div``;

const Graphic: React.FC = () => {
	return <GraphicContainer>Groophic</GraphicContainer>
}

render(<Graphic/>, document.getElementById('root'));
