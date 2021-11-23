import * as nodecgApiContext from './nodecg-api-context';

import { PlayerDataAll, TeamData } from '../types/extra-data';
import { Match, Matches } from '../types/matches';
import {
	CSGOAllplayer,
	Map,
} from '../types/csgo-gsi';
import { Team } from '../types/team';
import { Player } from '../types/player';
import { Tournaments } from '../types/tournament';

const nodecg = nodecgApiContext.get();

// Have one file initialize all replicants at the very start

/* Extra data */

nodecg.Replicant<PlayerDataAll>('playerData', {
	defaultValue: {},
	persistent: false,
});

/* Match scores/schedule/map selection */

nodecg.Replicant<Matches>('matches', { defaultValue: [] });
nodecg.Replicant<Match | undefined>('currentMatch');
nodecg.Replicant<string>('round30Winner', { defaultValue: '' });

/* CSGO Data / Server */

nodecg.Replicant<Map>('matchStats', {
	persistent: false,
});
nodecg.Replicant<CSGOAllplayer[]>('allPlayers', {
	defaultValue: [],
	persistent: false,
});
nodecg.Replicant<TeamData>('teamOne', {
	persistent: false,
});
nodecg.Replicant<TeamData>('teamTwo', {
	persistent: false,
});

/* Team data */

nodecg.Replicant<Player[]>('players', {defaultValue: [], persistent: true});
nodecg.Replicant<Team[]>('teams', {defaultValue: [], persistent: true});

/* Tournaments */

nodecg.Replicant<Tournaments>('tournaments', { defaultValue: {} });
nodecg.Replicant<string>('currentTournament', { defaultValue: '' });
