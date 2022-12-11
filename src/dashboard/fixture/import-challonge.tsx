import React, { useState } from 'react';
import styled from 'styled-components';

import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	TextField,
} from '@mui/material';

interface Props {
	open: boolean;
	onClose: () => void;
}

const WiderDialog = styled(Dialog)`
	.MuiDialog-paper {
		min-width: 25%;
	}
`;

export const ImportChallonge: React.FC<Props> = (props: Props) => {
	const [tournamentID, setTournamentID] = useState('');
	const [parseAsPlayers, setParseAsPlayers] = useState(true);

	function importTournament() {
		nodecg.sendMessage('challonge:import', { id: tournamentID, parseAsPlayers: parseAsPlayers });
		props.onClose();
	}

	return (
		<WiderDialog onClose={props.onClose} aria-labelledby="import-tournament-dialog" open={props.open}>
			<DialogTitle id="import-tournament-dialog" style={{ minWidth: '25%' }}>
				Import Tournament
			</DialogTitle>
			<DialogContent dividers style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
				<TextField
					label="Tournament ID (e.g. 10687057)"
					variant="filled"
					value={tournamentID}
					onChange={(e) => setTournamentID(e.target.value)}
					required
				/>
				<FormControlLabel
					control={
						<Checkbox
							sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
							value={parseAsPlayers}
							onChange={(e) => setParseAsPlayers(e.target.checked)}
						/>
					}
					label="Challengers are Players"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose}>Cancel</Button>
				<Button onClick={importTournament} disabled={!Boolean(tournamentID)}>
					Import Tournament
				</Button>
			</DialogActions>
		</WiderDialog>
	);
};
