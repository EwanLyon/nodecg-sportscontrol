import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useReplicant } from 'use-nodecg';
import { Asset } from '../../types/nodecg';
import { TeamsPreset } from '../../types/team-preset';

const TeamsCreatorContainer = styled.div``;

interface Props {
	className?: string;
	style?: React.CSSProperties;
}

export const TeamsCreator: React.FC<Props> = (props: Props) => {
	const [teamImagesRep] = useReplicant<Asset[]>('assets:teamimages', []);
	const [teamPresetsRep] = useReplicant<TeamsPreset | undefined>('teamPlayerPreset', undefined);
	const [localLogo, setLocalLogo] = useState('');
	const [localTeamName, setLocalTeamName] = useState('');
	const [localTeamAlias, setLocalTeamAlias] = useState('');
	const [localTeamPresetAlias, setLocalTeamPresetAlias] = useState('');

	// Already done teams
	const teamPresetList = Object.entries(teamPresetsRep?.teams || {}).map(([key, team]) => {
		return (
			<MenuItem key={key} value={team.alias}>
				<img
					style={{
						height: 50,
						width: 50,
						objectFit: 'scale-down',
						marginRight: 10,
					}}
					src={team.logo}
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

	function AddTeam(): void {
		console.log('Adding team: ' + localTeamName);
		nodecg.sendMessage('newTeam', {
			name: localTeamName,
			alias: localTeamAlias,
			logo: localLogo,
		});

		setLocalTeamAlias('');
		setLocalTeamPresetAlias('');
		setLocalTeamName('');
		setLocalLogo('');
	}

	function Save(): void {
		console.log('Saving');
		nodecg.sendMessage('exportTeams');
	}

	// Fill in team blanks
	useEffect(() => {
		if (localTeamPresetAlias) {
			const foundTeamPreset = teamPresetsRep?.teams[localTeamName];
			if (foundTeamPreset) {
				setLocalTeamAlias(foundTeamPreset.alias);
				setLocalTeamName(foundTeamPreset.name);
				setLocalLogo(foundTeamPreset.logo || '');
			}
		}
	}, [localTeamPresetAlias, teamPresetsRep?.teams, localTeamName]);

	return (
		<TeamsCreatorContainer className={props.className} style={props.style}>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="teamPresetsLabel">Team</InputLabel>
				<Select
					labelId="teamPresetsLabel"
					value={localTeamPresetAlias}
					onChange={(e) => setLocalTeamPresetAlias(e.target.value as string)}>
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
				onChange={(e) => setLocalTeamName(e.target.value as string)}
				fullWidth
			/>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="teamLabel">Logo</InputLabel>
				<Select labelId="teamLabel" value={localLogo} onChange={(e) => setLocalLogo(e.target.value as string)}>
					<MenuItem key={-1} value={''}>
						<em>No Team Logo</em>
					</MenuItem>
					{teamLogoList}
				</Select>
			</FormControl>
			<TextField
				required
				label="Alias"
				value={localTeamAlias}
				onChange={(e) => setLocalTeamAlias(e.target.value as string)}
				fullWidth
			/>
			<Button fullWidth onClick={AddTeam} variant="contained" disabled={!localTeamName || !localTeamAlias}>
				Add Team
			</Button>

			<Button fullWidth onClick={Save} variant="contained">
				Save Players and Teams
			</Button>
		</TeamsCreatorContainer>
	);
};
