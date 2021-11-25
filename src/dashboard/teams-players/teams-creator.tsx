import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useReplicant } from 'use-nodecg';
// @ts-ignore
import Twemoji from 'react-twemoji';

import { flagList } from '../atoms/flag-list';
import NoImage from '../atoms/NoImage.png';

import { Asset } from '../../types/nodecg';
import { Team } from '../../types/team';


const TeamsCreatorContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const TwemojiMenuItem = styled(Twemoji)`
	& > .emoji {
		height: 50px;
	}
	margin-right: 7px;
`;


interface Props {
	className?: string;
	style?: React.CSSProperties;
}

export const TeamsCreator: React.FC<Props> = (props: Props) => {
	const [teamImagesRep] = useReplicant<Asset[]>('assets:teamimages', []);
	const [teamsRep] = useReplicant<Team[]>('teams', []);
	const [localLogo, setLocalLogo] = useState('');
	const [localTeamName, setLocalTeamName] = useState('');
	const [localTeamShortName, setLocalTeamShortName] = useState('');
	const [localTeamID, setLocalTeamID] = useState('');
	const [localFlag, setLocalFlag] = useState('');
	
	// Already done teams
	const teamPresetList = teamsRep.map((team) => {
		return (
			<MenuItem key={team.id} value={team.id}>
				<img
					style={{
						height: 50,
						width: 50,
						objectFit: 'scale-down',
						marginRight: 10,
					}}
					src={team.logo || NoImage}
				/>
				{team.name}
			</MenuItem>
		);
	});

	// Team logos
	const teamLogoList = teamImagesRep.map((img) => {
		return (
			<MenuItem key={img.base} value={img.url}>
				<img
					style={{
						height: 50,
						width: 50,
						objectFit: 'scale-down',
						marginRight: 10,
					}}
					src={img.url}
				/>
				{img.name}
			</MenuItem>
		);
	});

	// Flags
	const flagListMap = flagList.map((flag, index) => {
		return (
			<MenuItem key={index} value={flag.code} style={{ display: 'flex', alignItems: 'center' }}>
				<TwemojiMenuItem>{flag.code}</TwemojiMenuItem> {flag.name}
			</MenuItem>
		);
	});

	function AddTeam(): void {
		console.log('Adding team: ' + localTeamName);
		nodecg.sendMessage('newTeam', {
			id: 'New',
			name: localTeamName,
			alias: localTeamShortName,
			logo: localLogo,
			countryflag: localFlag,
		} as Team);

		ResetValues();
	}

	function UpdateTeam(): void {
		console.log('Updating team: ' + localTeamName);
		nodecg.sendMessage('updateTeam', {
			id: localTeamID,
			name: localTeamName,
			shortname: localTeamShortName,
			logo: localLogo,
			countryflag: localFlag,
		} as Team);

		ResetValues();
	}

	function ResetValues() {
		setLocalTeamShortName('');
		setLocalTeamID('');
		setLocalTeamName('');
		setLocalLogo('');
		setLocalFlag('');
	}

	// function Save(): void {
	// 	console.log('Saving');
	// 	nodecg.sendMessage('exportTeams');
	// }

	// Fill in team blanks
	useEffect(() => {
		if (localTeamID) {
			const foundTeamPreset = teamsRep.find(team => team.id === localTeamID);
			if (foundTeamPreset) {
				setLocalTeamName(foundTeamPreset.name);
				setLocalLogo(foundTeamPreset.logo ?? '');
				setLocalTeamShortName(foundTeamPreset.shortname ?? '');
			}
		}
	}, [localTeamID, teamsRep, localTeamName]);

	return (
		<TeamsCreatorContainer className={props.className} style={props.style}>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="teamPresetsLabel">Team</InputLabel>
				<Select
					labelId="teamPresetsLabel"
					value={localTeamID}
					onChange={(e) => setLocalTeamID(e.target.value)}>
					<MenuItem key={-1} value={''}>
						<em>Create new team</em>
					</MenuItem>
					{teamPresetList}
				</Select>
			</FormControl>
			<TextField
				required
				label="Name"
				value={localTeamName}
				onChange={(e) => setLocalTeamName(e.target.value)}
				fullWidth
			/>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="teamLabel">Logo</InputLabel>
				<Select labelId="teamLabel" value={localLogo} onChange={(e) => setLocalLogo(e.target.value)}>
					<MenuItem key={-1} value={''}>
						<em>No Team Logo</em>
					</MenuItem>
					{teamLogoList}
				</Select>
			</FormControl>
			<TextField
				label="Short Name"
				value={localTeamShortName}
				onChange={(e) => setLocalTeamShortName(e.target.value)}
				fullWidth
			/>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="countryLabel">Country</InputLabel>
				<Select
					labelId="countryLabel"
					value={localFlag}
					onChange={(e) => setLocalFlag(e.target.value)}>
					{flagListMap}
				</Select>
			</FormControl>
			<Button fullWidth onClick={localTeamID ? UpdateTeam : AddTeam} variant="contained" disabled={!localTeamName}>
				{localTeamID ? `Update ${localTeamName}` : 'Add Team'}
			</Button>

			{/* <Button fullWidth onClick={Save} variant="contained">
				Save Players and Teams
			</Button> */}
		</TeamsCreatorContainer>
	);
};
