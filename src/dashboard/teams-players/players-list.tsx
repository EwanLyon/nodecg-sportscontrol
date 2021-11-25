import React from 'react';
import styled from 'styled-components';
import DataGrid, { Column } from 'react-data-grid';
import { useReplicant } from 'use-nodecg';
import _ from 'lodash';

import { RowImage, imageRegex, countryRegex, FlagImage } from '../atoms/grid-helpers';

import { Player } from '../../types/player';

const PlayersListContainer = styled.div``;

interface Props {
	className?: string;
	style?: React.CSSProperties;
}

export const PlayersList: React.FC<Props> = (props: Props) => {
	const [playersRep] = useReplicant<Player[]>('players', []);
	const [playerColumnsRep] = useReplicant<string[]>('playerColumns', []);
	const columns = playerColumnsRep.map<Column<Player & Record<string, any>, unknown>>(col => {
		let formatter: Column<Player & Record<string, any>, unknown>['formatter'];
		if (imageRegex.test(col)) {
			formatter = ({row}) => <RowImage src={row[col]} />;
		} else if (countryRegex.test(col)) {
			formatter = ({row}) => <FlagImage>{row[col]}</FlagImage>;
		}
		return {
			name: _.upperFirst(col),
			id: col,
			key: col,
			formatter: formatter
		}
	});

	return (
		<PlayersListContainer className={props.className} style={props.style}>
			<DataGrid defaultColumnOptions={{resizable: true, sortable: true}} columns={columns} rows={playersRep} />
		</PlayersListContainer>
	);
};
