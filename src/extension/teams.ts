import * as nodecgApiContext from './nodecg-api-context';
const nodecg = nodecgApiContext.get();

import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Team } from '../types/team';
import { Matches } from '../types/matches';

const teamsRep = nodecg.Replicant<Team[]>('teams');
const matchesRep = nodecg.Replicant<Matches>('matches');

nodecg.listenFor('newTeam', (data: Team) => {
	nodecg.log.info('Team: Adding ' + data.name);

	if (data.id === 'New') {
		data.id = uuidv4();
	}

	teamsRep.value.push(data);

	nodecg.sendMessage('newTeam:Response');
});

nodecg.listenFor('newChallongeTeam', (data: Team) => {
	teamsRep.value.push(data);
});

nodecg.listenFor('updateTeam', (data: Team) => {
	nodecg.log.info('Team: Updating ' + data.name);
	
	const teamIndex = teamsRep.value.findIndex(team => team.id === data.id);

	if (teamIndex > -1) {
		teamsRep.value[teamIndex] = data;

		// Update matchRep information
		matchesRep.value = matchesRep.value.map(match => {
			if (match.teamA.id === data.id) {
				match.teamA = _.cloneDeep(data);
			} else if (match.teamB.id === data.id) {
				match.teamB = _.cloneDeep(data);
			}

			return match;
		})
	} else {
		nodecg.log.error(`Could not find Team: ${JSON.stringify(data)}`);
	}
});

nodecg.listenFor('deleteTeam', (id: string) => {
	nodecg.log.info(`Team: Deleting: ${id}`);

	const teamIndex = teamsRep.value.findIndex(team => team.id === id);


	if (teamIndex > -1) {
		teamsRep.value.splice(teamIndex, 1);
	} else {
		nodecg.log.error(`Could not find Team: ${id}`);
	}
});

