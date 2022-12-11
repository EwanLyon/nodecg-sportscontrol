import { NodeCGServer } from '../../../../types/lib/nodecg-instance';
import * as nodecgApiContext from './nodecg-api-context';


module.exports = (nodecg: NodeCGServer) => {
	// Store a reference to this nodecg API context in a place where other libs can easily access it.
	// This must be done before any other files are `require`d.

	nodecgApiContext.set(nodecg);
	
	// Set Challonge environment key
	// This is a super dumb way to do an API key imo
	process.env.CHALLONGE_API_KEY = nodecg.bundleConfig.challonge_key;

	init().then(() => {
		nodecg.log.info('Initialization successful.');
	}).catch((error: any) => {
		nodecg.log.error('Failed to initialize:', error);
	});
};

async function init() {
	require('./replicants');
	require('./players');
	require('./teams');
	require('./file-io');
	require('./matches');
	require('./tournament');
	require('./challonge');
}