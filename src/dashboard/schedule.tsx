import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { theme } from './theme';
import { useReplicant } from 'use-nodecg';

import { Team } from '../types/team';
import { Match, Matches, NewMatch } from '../types/matches';

import {
	Grid,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	TextField,
	Chip,
	Button,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DraggingStyle,
	NotDraggingStyle,
	DropResult,
} from 'react-beautiful-dnd';
import { SingleMatch } from './setup/schedule/singlematch';

const Divider = styled.div`
	height: 1px;
	width: 100%;
	background: #fff;
	margin: 10px;
`;

const SpacedChips = styled(Chip)`
	margin: 0 2px;
`;

const reorder = (list: unknown[], startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const getItemStyle = (draggableStyle: DraggingStyle | NotDraggingStyle | undefined): React.CSSProperties => ({
	// Some basic styles to make the items look a bit nicer
	userSelect: 'none',
	margin: '0 0 6px 0',

	// Styles we need to apply on draggables
	...draggableStyle,
});

const DashSchedule: React.FC = () => {
	const [teamsRep] = useReplicant<Team[]>('teams', []);
	const [matchesRep] = useReplicant<Matches>('matches', []);
	const [currentMatchRep] = useReplicant<Match | undefined>('currentMatch', undefined);

	const [teamA, setTeamA] = useState('');
	const [teamB, setTeamB] = useState('');
	const [time, setTime] = useState('');
	const [matchType, setMatchType] = useState('bo1');

	const teamsList = teamsRep.map((team) => {
		return (
			<MenuItem key={team.id} value={team.name}>
				<img
					style={{
						height: 20,
						width: 20,
						objectFit: 'scale-down',
						marginRight: 10,
					}}
					src={team.logo}
				/>
				{team.name}
			</MenuItem>
		);
	});

	teamsList.unshift(
		<MenuItem key={'empty'} value={''}>
			Empty
		</MenuItem>,
	);

	function AddGame() {
		const scheduleTime = time || '';
		nodecg.sendMessage('createNewMatch', { teamA, teamB, time: scheduleTime, matchType } as NewMatch);
	}

	function onDragEnd(result: DropResult) {
		// Dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(matchesRep, result.source.index, result.destination.index);

		nodecg.sendMessage('updateMatchOrder', items);
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid container>
				<Grid
					item
					container
					alignItems="center"
					justifyContent="space-around"
					style={{ margin: '0 15px' }}
					component="div">
					<Grid item xs={2}>
						<FormControl variant="filled" fullWidth>
							<InputLabel id="teamLabelA">Team A</InputLabel>
							<Select
								labelId="teamLabelA"
								value={teamA}
								onChange={(e): void => setTeamA(e.target.value as string)}>
								{teamsList}
							</Select>
						</FormControl>
					</Grid>
					<span style={{ marginLeft: 10, marginRight: 10 }}>VS</span>
					<Grid item xs={2}>
						<FormControl variant="filled" fullWidth>
							<InputLabel id="teamLabelB">Team B</InputLabel>
							<Select
								labelId="teamLabelB"
								value={teamB}
								onChange={(e): void => setTeamB(e.target.value as string)}>
								{teamsList}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={2}>
						<TextField
							label="Time"
							value={time}
							style={{ margin: '0 10px' }}
							variant="outlined"
							onChange={(e): void => setTime(e.target.value as string)}
						/>
					</Grid>
					<SpacedChips
						label="Bo1"
						onClick={() => setMatchType('bo1')}
						variant={matchType === 'bo1' ? 'filled' : 'outlined'}
					/>
					<SpacedChips
						label="Bo3"
						onClick={() => setMatchType('bo3')}
						variant={matchType === 'bo3' ? 'filled' : 'outlined'}
					/>
					<SpacedChips
						label="Bo5"
						onClick={() => setMatchType('bo5')}
						variant={matchType === 'bo5' ? 'filled' : 'outlined'}
					/>
					<Button variant="contained" onClick={AddGame} disabled={!teamA || !teamB}>
						+
					</Button>
				</Grid>
				<Divider />
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="schedule">
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps} style={{ width: '100%' }}>
								{matchesRep.map((match, index) => {
									return (
										<Draggable key={match.id} draggableId={match.id} index={index}>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													style={getItemStyle(provided.draggableProps.style)}>
													<SingleMatch
														handleProps={provided.dragHandleProps}
														match={match}
														current={currentMatchRep?.id === match.id}
													/>
												</div>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</Grid>
		</ThemeProvider>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(<DashSchedule />);
