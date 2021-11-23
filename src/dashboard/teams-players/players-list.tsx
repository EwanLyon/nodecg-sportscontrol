import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { DataEditorContainer, DataEditor, GridColumn, GridCell, GridCellKind } from '@glideapps/glide-data-grid';
import { useReplicant } from 'use-nodecg';

import { tableTheme } from '../theme';

import { Player } from '../../types/player';

const PlayersListContainer = styled.div``;

interface Props {
	className?: string;
	style?: React.CSSProperties;
}



export const PlayersList: React.FC<Props> = (props: Props) => {
	const [playersRep] = useReplicant<Player[]>('players', []);
	const columns: GridColumn[] = [
		{ title: 'ID', width: 100, hasMenu: false },
		{ title: 'Name', width: 100 },
		{ title: 'Image', width: 100 },
		{ title: 'Nickname', width: 100 },
		{ title: 'Country', width: 100 },
		{ title: 'Team', width: 100 },
	];

	function getPlayerCells([col, row]: readonly [number, number]): GridCell {
		if (!playersRep)
			return { data: 'Loading', kind: GridCellKind.Text, allowOverlay: true, displayData: 'Loading' };
		let data: string | undefined = "";
		switch (col) {
			case 0:
				return { data: playersRep[row].id, kind: GridCellKind.RowID, allowOverlay: false };
			case 1:
				data = playersRep[row].name;
				break;
			case 2:
				data = playersRep[row].image;
				break;
			case 3:
				data = playersRep[row].nickname;
				break;
			case 4:
				data = playersRep[row].country;
				break;
			case 5:
				data = playersRep[row].team;
				break;

			default:
				break;
		}
		
		return { data: data ?? "", kind: GridCellKind.Text, allowOverlay: true, displayData: data ?? "" };
	}

	return (
		<PlayersListContainer className={props.className} style={props.style}>
			<ThemeProvider theme={tableTheme}>
				<DataEditorContainer width={530} height={300}>
					<DataEditor rows={playersRep.length} columns={columns} getCellContent={getPlayerCells} />
				</DataEditorContainer>
			</ThemeProvider>
			<div id="portal" style={{ position: 'fixed', left: 0, top: 0, zIndex: 9999 }} />
		</PlayersListContainer>
	);
};
