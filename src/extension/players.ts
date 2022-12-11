import * as nodecgApiContext from './nodecg-api-context';
const nodecg = nodecgApiContext.get();

import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Player } from '../types/player';
import { Team } from '../types/team';

const playersRep = nodecg.Replicant<Player[]>('players');

nodecg.listenFor('newPlayer', (data: Player) => {
	nodecg.log.info('Player: Adding ' + data.name);

	data.id = uuidv4();

	playersRep.value.push(data);

	if (data.selfTeam) {
		nodecg.sendMessage('newTeam', <Team>{ id: data.id, name: data.name, countryflag: data.countryflag, logo: data.image })
	}

	nodecg.sendMessage('newPlayer:Response');
});

nodecg.listenFor('newChallongePlayer', (data: Player) => {
	playersRep.value.push(data);
	nodecg.sendMessage('newTeam', <Team>{ id: data.id, name: data.name, countryflag: data.countryflag, logo: data.image })
});

nodecg.listenFor('updatePlayer', (data: Player) => {
	nodecg.log.info('Player: Updating ' + data.name);

	const playerIndex = playersRep.value.findIndex(player => player.id === data.id);

	if (data.selfTeam) {
		nodecg.sendMessage('updateTeam', <Team>{ id: data.id, name: data.name, countryflag: data.countryflag, logo: data.image })
	}

	if (playerIndex > -1) {
		playersRep.value[playerIndex] = data;
	} else {
		nodecg.log.error(`Could not find Player: ${JSON.stringify(data)}`);
	}
});

nodecg.listenFor('deletePlayer', (id: string) => {
	nodecg.log.info(`Player: Deleting: ${id}`);

	const playerIndex = playersRep.value.findIndex(player => player.id === id);

	if (playerIndex > -1) {

		if (playersRep.value[playerIndex].selfTeam) {
			nodecg.sendMessage('deleteTeam', id);
		}

		playersRep.value.splice(playerIndex, 1);
	} else {
		nodecg.log.error(`Could not find Player: ${id}`);
	}
});
