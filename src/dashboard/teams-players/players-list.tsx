import React from 'react';
import styled from 'styled-components';
import {DataGr} from '@mui/x-data'

const PlayersListContainer = styled.div``;

interface Props {
	className?: string;
	style?: React.CSSProperties;
}

export const PlayersList: React.FC<Props> = (props: Props) => {
	return <PlayersListContainer className={props.className} style={props.style}></PlayersListContainer>;
};
