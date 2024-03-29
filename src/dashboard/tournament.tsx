import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useReplicant } from 'use-nodecg';
import { theme } from './theme';

import {
	Tournaments,
	SingleElimination as ISingleElimination,
	DoubleElimination as IDoubleElimination,
} from '../types/tournament';

import { Button, FormControl, InputLabel, MenuItem, Select, ThemeProvider } from '@mui/material';
import { CreateTournament } from './fixture/create-tournament';
import { SingleElimination } from './fixture/single-elimination';
import { DoubleElimination } from './fixture/double-elimination';
import { EditTournament } from './fixture/edit-tournament';
import { ImportChallonge } from './fixture/import-challonge';

const SelectionMenu = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 32px 0;
	gap: 16px;
`;

const TournamentMetaContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-bottom: 1rem;
`;

const TournamentTitle = styled.span`
	font-weight: bold;
`;

const TournamentMeta = styled.span``;
const TournamentLogo = styled.img`
	object-fit: contain;
`;

const Tournament: React.FC = () => {
	const [tournamentsRep] = useReplicant<Tournaments>('tournaments', {});
	const [selectedTournament, setSelectedTournament] = useState('');
	const [createTournamentDialog, setCreateTournamentDialog] = useState(false);
	const [importChallongeDialog, setImportChallongeDialog] = useState(false);
	const [editTournamentDialog, setEditTournamentDialog] = useState(false);
	const [currentTournamentRep] = useReplicant<string>('currentTournament', '');

	useEffect(() => {
		if (currentTournamentRep) {
			setSelectedTournament(currentTournamentRep);
		} else {
			if (tournamentsRep) {
				const mostRecentTournament = Object.keys(tournamentsRep)[Object.keys(tournamentsRep).length - 1];
				setSelectedTournament(mostRecentTournament);
			}
		}
	}, [tournamentsRep, currentTournamentRep]);

	function handleCreateOpen() {
		setCreateTournamentDialog(true);
	}

	function handleEditOpen() {
		setEditTournamentDialog(true);
	}

	function handleImportOpen() {
		setImportChallongeDialog(true);
	}

	function handleClose() {
		setCreateTournamentDialog(false);
		setEditTournamentDialog(false);
		setImportChallongeDialog(false);
	}

	function setActiveTournament() {
		nodecg.sendMessage('setActiveTournament', selectedTournament);
	}

	const tournamentItems = Object.entries(tournamentsRep).map(([key, tournament]) => {
		return (
			<MenuItem key={key} value={tournament.id}>
				{tournament.logo && (
					<img
						style={{
							height: 20,
							width: 20,
							objectFit: 'scale-down',
							marginRight: 10,
						}}
						src={tournament.logo}
					/>
				)}
				{tournament.name}
			</MenuItem>
		);
	});

	let fixtureElement = <></>;
	switch (tournamentsRep[selectedTournament]?.fixture.type) {
		case 'single-elimination':
			fixtureElement = (
				<SingleElimination
					tournamentId={selectedTournament}
					data={tournamentsRep[selectedTournament].fixture as ISingleElimination}
				/>
			);
			break;

		case 'double-elimination':
			fixtureElement = (
				<DoubleElimination
					tournamentId={selectedTournament}
					data={tournamentsRep[selectedTournament].fixture as IDoubleElimination}
				/>
			);
			break;

		default:
			break;
	}

	return (
		<ThemeProvider theme={theme}>
			<SelectionMenu>
				<FormControl variant="filled" style={{ minWidth: 200 }}>
					<InputLabel id="tournamentSelect">Tournament</InputLabel>
					<Select
						labelId="tournamentSelect"
						value={selectedTournament}
						onChange={(e): void => setSelectedTournament(e.target.value as string)}>
						<MenuItem key="empty" value="">
							<i>No Tournament</i>
						</MenuItem>
						{tournamentItems}
					</Select>
				</FormControl>
				<Button variant="contained" onClick={handleCreateOpen}>
					New Tournament
				</Button>
				<Button variant="contained" onClick={handleImportOpen}>
					Import From Challonge
				</Button>
				<Button variant="contained" onClick={handleEditOpen} disabled={!tournamentsRep[selectedTournament]}>
					Edit Tournament
				</Button>
				<Button
					variant="contained"
					onClick={setActiveTournament}
					disabled={selectedTournament === currentTournamentRep}>
					Set Active
				</Button>
			</SelectionMenu>
			<hr />
			{tournamentsRep[selectedTournament] && (
				<TournamentMetaContainer>
					<TournamentLogo src={tournamentsRep[selectedTournament]?.logo} />
					<TournamentTitle>{tournamentsRep[selectedTournament].name}</TournamentTitle>
					<TournamentMeta>{tournamentsRep[selectedTournament].id}</TournamentMeta>
					<TournamentMeta>{tournamentsRep[selectedTournament].fixture.type}</TournamentMeta>
				</TournamentMetaContainer>
			)}
			{fixtureElement}
			<CreateTournament onClose={handleClose} open={createTournamentDialog} />
			<ImportChallonge onClose={handleClose} open={importChallongeDialog} />
			<EditTournament
				onClose={handleClose}
				open={editTournamentDialog}
				tournament={tournamentsRep[selectedTournament]}
			/>
		</ThemeProvider>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Tournament />);
