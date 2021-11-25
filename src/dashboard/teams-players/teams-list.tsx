import React from 'react';
import styled from 'styled-components';
import { useReplicant } from 'use-nodecg';
import _ from 'lodash';
import DataGrid, { Column } from 'react-data-grid';

import { RowImage, imageRegex, countryRegex, FlagImage } from '../atoms/grid-helpers';

import { Team } from '../../types/team';

const TeamsListContainer = styled.div``;

interface Props {
	className?: string;
	style?: React.CSSProperties;
}

export const TeamsList: React.FC<Props> = (props: Props) => {
	const [teamsRep] = useReplicant<Team[]>('teams', []);
	const [teamColumnsRep] = useReplicant<string[]>('teamColumns', []);
	const columns = teamColumnsRep.map<Column<Team & Record<string, any>, unknown>>(col => {
		let formatter: Column<Team & Record<string, any>, unknown>['formatter'];
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
		<TeamsListContainer className={props.className} style={props.style}>
			<DataGrid columns={columns} rows={teamsRep} />
		</TeamsListContainer>
	);
};
