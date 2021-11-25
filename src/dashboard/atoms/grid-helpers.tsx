import styled from 'styled-components';
// @ts-ignore
import Twemoji from 'react-twemoji';

export const RowImage = styled.img`
	height: 100%;
	width: auto;
	object-fit: contain;
`;

export const FlagImage = styled(Twemoji)`
	height: 100%;
	
	& > .emoji {
		height: 100%;
	}
`;

// Formatters
export const imageRegex = new RegExp(['image', 'img', 'pfp', 'logo'].join('|'), 'i');
export const countryRegex = new RegExp(['flag'].join('|'), 'i');