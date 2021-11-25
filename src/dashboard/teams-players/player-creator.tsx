import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useReplicant } from 'use-nodecg';
import { Asset } from '../../types/nodecg';
import { Player } from '../../types/player';
import { flagList } from '../atoms/flag-list';
// @ts-ignore
import Twemoji from 'react-twemoji';

import NoImage from '../atoms/NoImage.png';

const PlayerCreatorContainer = styled.div`
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

export const PlayerCreator: React.FC<Props> = (props: Props) => {
	const [profilePicturesRep] = useReplicant<Asset[]>('assets:playerIcons', []);
	const [playersRep] = useReplicant<Player[]>('players', []);
	const [localID, setLocalID] = useState('');
	const [localName, setLocalName] = useState('');
	const [localImage, setLocalImage] = useState('');
	const [localCountry, setLocalCountry] = useState('');
	const [localNickname, setLocalNickname] = useState('');

	const playerPresetList = playersRep.map((player) => {
		return (
			<MenuItem key={player.id} value={player.id}>
				<img
					style={{
						height: 50,
						width: 50,
						objectFit: 'scale-down',
						marginRight: 10,
					}}
					src={player.image || NoImage}
				/>
				<Grid container>
					<span style={{ fontSize: 10, color: '#777' }}>{player.nickname}</span>
					{player.name}
				</Grid>
			</MenuItem>
		);
	});
	
	// Profile Pics
	const imageMap = profilePicturesRep.map((pfp) => {
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
			id: 'New',
			name: localName,
			image: localImage,
			countryflag: localCountry,
			nickname: localNickname,
		} as Player);

		ResetValues();
	}

	function UpdatePlayer(): void {
		console.log('Updating player: ' + localName);
		nodecg.sendMessage('updatePlayer', {
			id: localID,
			name: localName,
			image: localImage,
			countryflag: localCountry,
			nickname: localNickname,
		} as Player);

		ResetValues();
	}

	// function Save(): void {
	// 	console.log('Saving');
	// 	nodecg.sendMessage('exportTeams');
	// }

	function ResetValues() {
		setLocalID('');
		setLocalName('');
		setLocalImage('');
		setLocalCountry('');
		setLocalNickname('');
	}

	useEffect(() => {
		if (localID) {
			const foundPlayerPreset = playersRep.find(player => player.id === localID);
			if (foundPlayerPreset) {
				setLocalName(foundPlayerPreset.name ?? '');
				setLocalImage(foundPlayerPreset.image ?? '');
				setLocalCountry(foundPlayerPreset.countryflag ?? '');
			}
		}
	}, [localID, playersRep]);

	return (
		<PlayerCreatorContainer className={props.className} style={props.style}>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="playerPresetsLabel">Player</InputLabel>
				<Select
					labelId="playerPresetsLabel"
					value={localID}
					onChange={(e) => setLocalID(e.target.value)}>
					<MenuItem key={-1} value={''}>
						<em>Create new player</em>
					</MenuItem>
					{playerPresetList}
				</Select>
			</FormControl>
			<TextField
				label="Name"
				value={localName}
				onChange={(e) => setLocalName(e.target.value)}
				fullWidth
			/>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="imageLabel">Image</InputLabel>
				<Select labelId="imageLabel" value={localImage} onChange={(e) => setLocalImage(e.target.value)}>
					<MenuItem key={-1} value={''}>
						<em>No Image</em>
					</MenuItem>
					{imageMap}
				</Select>
			</FormControl>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="countryLabel">Country</InputLabel>
				<Select
					labelId="countryLabel"
					value={localCountry}
					onChange={(e) => setLocalCountry(e.target.value)}>
					{flagListMap}
				</Select>
			</FormControl>
			<TextField
				label="Nickname"
				value={localNickname}
				onChange={(e) => setLocalNickname(e.target.value)}
				fullWidth
			/>
			<Button fullWidth onClick={localID ? UpdatePlayer : AddPlayer} variant="contained" disabled={!localName}>
				{localID ? `Update ${localName}` : 'Add Player'}
			</Button>

			{/* <Button fullWidth onClick={Save} variant="contained">
				Save Players and Teams
			</Button> */}
		</PlayerCreatorContainer>
	);
};
