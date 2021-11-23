import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { DataEditorContainer, DataEditor, GridColumn, GridCell, GridCellKind } from '@glideapps/glide-data-grid';
import { useReplicant } from 'use-nodecg';
import DataGrid from 'react-data-grid';

import { tableTheme } from '../theme';

import { Team } from '../../types/team';

const TeamsListContainer = styled.div``;

interface Props {
	className?: string;
	style?: React.CSSProperties;
}

export const TeamsList: React.FC<Props> = (props: Props) => {
	const [teamsRep] = useReplicant<Team[]>('teams', []);
	const columns: GridColumn[] = [
		{ title: 'ID', width: 100, hasMenu: false },
		{ title: 'Name', width: 100 },
		{ title: 'Logo', width: 100 },
		{ title: 'Short Name', width: 100 },
		{ title: 'Country', width: 100 },
	];

	function getTeamCells([col, row]: readonly [number, number]): GridCell {
		if (!teamsRep)
			return { data: 'Loading', kind: GridCellKind.Text, allowOverlay: true, displayData: 'Loading' };
		let data: string | undefined = "";
		switch (col) {
			case 0:
				return { data: teamsRep[row].id, kind: GridCellKind.RowID, allowOverlay: false };
			case 1:
				data = teamsRep[row].name;
				break;
			case 2:
				data = teamsRep[row].logo;
				break;
			case 3:
				data = teamsRep[row].shortname;
				break;
			case 4:
				data = teamsRep[row].country;
				break;

			default:
				break;
		}
		
		return { data: data ?? "", kind: GridCellKind.Text, allowOverlay: true, displayData: data ?? "" };
	}

	return (
		<TeamsListContainer className={props.className} style={props.style}>
			<ThemeProvider theme={tableTheme}>
				<DataEditorContainer width={530} height={300}>
					<DataEditor rows={teamsRep.length} columns={columns} getCellContent={getTeamCells} />
				</DataEditorContainer>
			</ThemeProvider>
			<div id="portal" style={{ position: 'fixed', left: 0, top: 0, zIndex: 9999 }} />
		</TeamsListContainer>
	);
};
