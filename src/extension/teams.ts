import * as nodecgApiContext from './nodecg-api-context';
const nodecg = nodecgApiContext.get();

import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Team } from '../types/team';

const teamsRep = nodecg.Replicant<Team[]>('teams');

nodecg.listenFor('newTeam', (data: Team) => {
	nodecg.log.info('Adding ' + data.name);

	data.id = uuidv4();

	teamsRep.value.push(data);

	nodecg.sendMessage('newTeam:Response');
});

nodecg.listenFor('updateTeam', (data: Team) => {
	nodecg.log.info('Updating ' + data.name);
	
	const teamIndex = teamsRep.value.findIndex(team => team.id === data.id);

	if (teamIndex > -1) {
		teamsRep.value[teamIndex] = data;
	} else {
		nodecg.log.error(`Could not find Team: ${JSON.stringify(data)}`);
	}
});

nodecg.listenFor('deleteTeam', (id: string) => {
	nodecg.log.info(`Deleting player: ${id}`);

	const teamIndex = teamsRep.value.findIndex(team => team.id === id);


	if (teamIndex > -1) {
		teamsRep.value.splice(teamIndex, 1);
	} else {
		nodecg.log.error(`Could not find Team: ${id}`);
	}
});

