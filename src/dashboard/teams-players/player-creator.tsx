import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useReplicant } from 'use-nodecg';
import { Asset } from '../../types/nodecg';
import { Player } from '../../types/player';
import { flagList } from '../atoms/flag-list';
// @ts-ignore
import Twemoji from 'react-twemoji';

const PlayerCreatorContainer = styled.div``;



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

export const PlayerCreator: React.FC<Props> = (props: Props) => {
	const [profilePicturesRep] = useReplicant<Asset[]>('assets:playerIcons', []);
	const [playersRep] = useReplicant<Player[]>('teams', []);
	const [localName, setLocalName] = useState('');
	const [localImage, setLocalImage] = useState('');
	const [localCountry, setLocalCountry] = useState('');

	const playerPresetList = playersRep.map((player) => {
		return (
			<MenuItem key={player.name} value={player.name}>
				<img
					style={{
						height: 50,
						width: 50,
						objectFit: 'scale-down',
						marginRight: 10,
					}}
					src={player.image}
				/>
				<Grid container>
					<span style={{ fontSize: 10, color: '#777' }}>{player.nickname}</span>
					{player.name}
				</Grid>
			</MenuItem>
		);
	});
	
	// Profile Pics
	const profilePicsMap = profilePicturesRep.map((pfp) => {
		return (
			<MenuItem key={pfp.base} value={pfp.url}>
				<img style={{ height: 50, width: 'auto', objectFit: 'scale-down', marginRight: 10 }} src={pfp.url} />
				{pfp.name}
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

	flagListMap.push(
		<MenuItem key={-1} value={''}>
			<em>No Flag</em>
		</MenuItem>,
	);

	function AddPlayer(): void {
		console.log('Adding player: ' + localName);
		nodecg.sendMessage('newPlayer', {
			name: localName,
			image: localImage,
			country: localCountry,
		} as Player);

		setLocalName('');
		setLocalImage('');
		setLocalCountry('');
	}

	function Save(): void {
		console.log('Saving');
		nodecg.sendMessage('exportTeams');
	}

	// useEffect(() => {
	// 	if (steamId) {
	// 		const foundPlayerPreset = teamPresetsRep?.players[steamId];
	// 		if (foundPlayerPreset) {
	// 			setLocalName(foundPlayerPreset.realName || '');
	// 			setLocalPfp(foundPlayerPreset.profilePicture || '');
	// 			setLocalCountry(foundPlayerPreset.country || '');
	// 		}
	// 	} else {
	// 		setLocalName('');
	// 		setLocalPfp('');
	// 		setLocalCountry('');
	// 	}
	// }, [steamId, teamPresetsRep?.players]);

	return (
		<PlayerCreatorContainer className={props.className} style={props.style}>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="playerPresetsLabel">Player</InputLabel>
				<Select
					labelId="playerPresetsLabel"
					value={localName}
					onChange={(e) => setLocalName(e.target.value as string)}>
					<MenuItem key={-1} value={''}>
						<em>Create new player</em>
					</MenuItem>
					{playerPresetList}
				</Select>
			</FormControl>
			<TextField
				label="Name"
				value={localName}
				onChange={(e) => setLocalName(e.target.value as string)}
				fullWidth
			/>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="pfpLabel">Profile Picture</InputLabel>
				<Select labelId="pfpLabel" value={localImage} onChange={(e) => setLocalImage(e.target.value as string)}>
					<MenuItem key={-1} value={''}>
						<em>No Profile Picture</em>
					</MenuItem>
					{profilePicsMap}
				</Select>
			</FormControl>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="countryLabel">Country</InputLabel>
				<Select
					labelId="countryLabel"
					value={localCountry}
					onChange={(e) => setLocalCountry(e.target.value as string)}>
					{flagListMap}
				</Select>
			</FormControl>
			<Button fullWidth onClick={AddPlayer} variant="contained" disabled={!localName}>
				Add Player
			</Button>

			<Button fullWidth onClick={Save} variant="contained">
				Save Players and Teams
			</Button>
		</PlayerCreatorContainer>
	);
};
