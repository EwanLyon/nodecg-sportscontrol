import React, { useState } from 'react';
/* eslint-disable-next-line */
// @ts-ignore
import Twemoji from 'react-twemoji';
import * as ReactDOM from 'react-dom';
import {} from 'react-dom/next';

import { Tabs, Tab } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './theme';
import { PlayersList } from './teams-players/players-list';
import { PlayerCreator } from './teams-players/player-creator';
import { TeamsCreator } from './teams-players/teams-creator';
import { TeamsList } from './teams-players/teams-list';

export const TeamPresetCreator: React.FC = () => {
	const [currentTab, setCurrentTab] = useState(0);

	function handleTabChange(_e: React.SyntheticEvent<Element, Event>, newValue: any) {
		setCurrentTab(newValue);
	}

	return (
		<ThemeProvider theme={theme}>
			<div>
				<Tabs value={currentTab} onChange={handleTabChange} centered>
					<Tab label="Players" />
					<Tab label="Player Creator" />
					<Tab label="Teams" />
					<Tab label="Teams Creator" />
				</Tabs>
			</div>
			<div hidden={currentTab !== 0}>
				<PlayersList />
			</div>
			<div hidden={currentTab !== 1}>
				<PlayerCreator />
			</div>
			<div hidden={currentTab !== 2}>
				<TeamsList />
			</div>
			<div hidden={currentTab !== 3}>
				<TeamsCreator />
			</div>
		</ThemeProvider>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(<TeamPresetCreator />);
