import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div``;

export const Dashboard: React.FC = () => {

	return (
		<DashboardContainer>
			Hello!
		</DashboardContainer>
	);
};

render(<Dashboard />, document.getElementById('root'));
