import * as nodecgApiContext from './nodecg-api-context';
const nodecg = nodecgApiContext.get();

import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Player } from '../types/player';

const playersRep = nodecg.Replicant<Player[]>('players');

nodecg.listenFor('newPlayer', (data: Player) => {
		nodecg.log.info('Adding ' + data.name);
		
		data.id = uuidv4();

		playersRep.value.push(data);

		nodecg.sendMessage('newPlayer:Response');
	}
);

nodecg.listenFor('updatePlayer', (data: Player) => {
	nodecg.log.info('Updating ' + data.name);
	
	const playerIndex = playersRep.value.findIndex(player => player.id === data.id);

	if (playerIndex > -1) {
		playersRep.value[playerIndex] = data;
	} else {
		nodecg.log.error('Could not find Player: ' + JSON.stringify(data));
	}
});
