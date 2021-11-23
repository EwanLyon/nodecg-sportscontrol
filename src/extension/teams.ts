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
