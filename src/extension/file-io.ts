import * as nodecgApiContext from './nodecg-api-context';
import fs from 'fs';
import _ from 'lodash';
const nodecg = nodecgApiContext.get();

// import { Asset } from '../types/nodecg'; 
import { Player } from '../types/player';
import { Team } from '../types/team';

const playersRep = nodecg.Replicant<Player[]>('players');
const teamsRep = nodecg.Replicant<Team[]>('teams');

nodecg.listenFor('saveData', () => {
	nodecg.log.info('Saving Teams and Players');

	let date = new Date().toLocaleString('en-AU', {
		hour12: false,
		second: '2-digit',
		minute: '2-digit',
		hour: '2-digit',
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	});
	date = date.replace(/[/,:]/g, '');
	date = date.replace(/ /g, '_');

	fs.writeFile(
		`./assets/nodecg-sportscontrol/teamPreset/${date}.json`,
		JSON.stringify({teams: teamsRep, players: playersRep}),
		(err) => {
			if (err) {
				nodecg.log.error('Failed writing team presets: ' + err.message);
			} else {
				nodecg.log.info('TeamPresets file written');
			}
		},
	);
});