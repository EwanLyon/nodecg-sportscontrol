import * as nodecgApiContext from './nodecg-api-context';
import axios from 'axios';

export interface ChallongeTournament {
    tournament: TournamentChallonge;
}

export interface TournamentChallonge {
    id:                                    number;
    name:                                  string;
    url:                                   string;
    description:                           string;
    tournament_type:                       TournamentType;
    started_at:                            Date | null;
    completed_at:                          Date | null;
    require_score_agreement:               boolean;
    notify_users_when_matches_open:        boolean;
    created_at:                            Date;
    updated_at:                            Date;
    state:                                 TournamentState;
    open_signup:                           boolean;
    notify_users_when_the_tournament_ends: boolean;
    progress_meter:                        number;
    quick_advance:                         boolean;
    hold_third_place_match:                boolean;
    pts_for_game_win:                      string;
    pts_for_game_tie:                      string;
    pts_for_match_win:                     string;
    pts_for_match_tie:                     string;
    pts_for_bye:                           string;
    swiss_rounds:                          number;
    private:                               boolean;
    ranked_by:                             RankedBy;
    show_rounds:                           boolean;
    hide_forum:                            boolean;
    sequential_pairings:                   boolean;
    accept_attachments:                    boolean;
    rr_pts_for_game_win:                   string;
    rr_pts_for_game_tie:                   string;
    rr_pts_for_match_win:                  string;
    rr_pts_for_match_tie:                  string;
    created_by_api:                        boolean;
    credit_capped:                         boolean;
    category:                              unknown;
    hide_seeds:                            boolean;
    prediction_method:                     number;
    predictions_opened_at:                 unknown;
    anonymous_voting:                      boolean;
    max_predictions_per_user:              number;
    signup_cap:                            unknown;
    game_id:                               number;
    participants_count:                    number;
    group_stages_enabled:                  boolean;
    allow_participant_match_reporting:     boolean;
    teams:                                 boolean;
    check_in_duration:                     unknown;
    start_at:                              Date | null;
    started_checking_in_at:                unknown;
    tie_breaks:                            TieBreak[];
    locked_at:                             unknown;
    event_id:                              unknown;
    public_predictions_before_start_time:  boolean;
    ranked:                                boolean;
    grand_finals_modifier:                 unknown;
    predict_the_losers_bracket:            boolean;
    spam:                                  unknown;
    ham:                                   unknown;
    rr_iterations:                         number | null;
    tournament_registration_id:            unknown;
    donation_contest_enabled:              unknown;
    mandatory_donation:                    unknown;
    non_elimination_tournament_data:       NonEliminationTournamentData;
    auto_assign_stations:                  unknown;
    only_start_matches_with_stations:      unknown;
    registration_fee:                      string;
    registration_type:                     RegistrationType;
    split_participants:                    boolean;
    allowed_regions:                       any[];
    show_participant_country:              unknown;
    program_id:                            unknown;
    program_classification_ids_allowed:    unknown;
    team_size_range:                       unknown;
    toxic:                                 unknown;
    use_new_style:                         boolean | null;
    optional_display_data:                 OptionalDisplayData;
    processing:                            boolean | null;
    oauth_application_id:                  unknown;
    participants:                          ParticipantElement[];
    matches:                               MatchElement[];
    description_source:                    string;
    subdomain:                             null | string;
    full_challonge_url:                    string;
    live_image_url:                        string;
    sign_up_url:                           null | string;
    review_before_finalizing:              boolean;
    accepting_predictions:                 boolean;
    participants_locked:                   boolean;
    game_name:                             string;
    participants_swappable:                boolean;
    team_convertable:                      boolean;
    group_stages_were_started:             boolean;
}

export interface MatchElement {
    match: MatchMatch;
}

export interface MatchMatch {
    id:                            number;
    tournament_id:                 number;
    state:                         MatchState;
    player1_id:                    number | null;
    player2_id:                    number | null;
    player1_prereq_match_id:       number | null;
    player2_prereq_match_id:       number | null;
    player1_is_prereq_match_loser: boolean;
    player2_is_prereq_match_loser: boolean;
    winner_id:                     number | null;
    loser_id:                      number | null;
    started_at:                    Date | null;
    created_at:                    Date;
    updated_at:                    Date;
    identifier:                    string;
    has_attachment:                boolean;
    round:                         number;
    player1_votes:                 unknown;
    player2_votes:                 unknown;
    group_id:                      number | null;
    attachment_count:              unknown;
    scheduled_time:                Date | null;
    location:                      unknown;
    underway_at:                   Date | null;
    optional:                      boolean | null;
    rushb_id:                      null | string;
    completed_at:                  Date | null;
    suggested_play_order:          number | null;
    forfeited:                     boolean | null;
    open_graph_image_file_name:    unknown;
    open_graph_image_content_type: unknown;
    open_graph_image_file_size:    unknown;
    prerequisite_match_ids_csv:    string;
    scores_csv:                    string;
}

export enum MatchState {
    Complete = "complete",
    Open = "open",
    Pending = "pending",
}

export interface NonEliminationTournamentData {
    participants_per_match: string;
}

export interface OptionalDisplayData {
    show_standings:     string;
    show_announcements: boolean;
}

export interface ParticipantElement {
    participant: ParticipantParticipant;
}

export interface ParticipantParticipant {
    id:                                         number;
    tournament_id:                              number;
    name:                                       string;
    seed:                                       number;
    active:                                     boolean;
    created_at:                                 Date;
    updated_at:                                 Date;
    invite_email:                               unknown;
    final_rank:                                 number | null;
    misc:                                       unknown;
    icon:                                       unknown;
    on_waiting_list:                            boolean;
    invitation_id:                              number | null;
    group_id:                                   unknown;
    checked_in_at:                              unknown;
    ranked_member_id:                           number | null;
    custom_field_response:                      unknown;
    clinch:                                     unknown;
    integration_uids:                           unknown;
    challonge_username:                         null | string;
    challonge_email_address_verified:           boolean | null;
    removable:                                  boolean;
    participatable_or_invitation_attached:      boolean;
    confirm_remove:                             boolean;
    invitation_pending:                         boolean;
    display_name_with_invitation_email_address: string;
    email_hash:                                 null | string;
    username:                                   null | string;
    display_name:                               string;
    attached_participatable_portrait_url:       null | string;
    can_check_in:                               boolean;
    checked_in:                                 boolean;
    reactivatable:                              boolean;
    check_in_open:                              boolean;
    group_player_ids:                           number[];
    has_irrelevant_seed:                        boolean;
}

export enum RankedBy {
    MatchWINS = "match wins",
}

export enum RegistrationType {
    Free = "free",
    Paid = "paid",
}

export enum TournamentState {
    Complete = "complete",
    Pending = "pending",
    Underway = "underway",
}

export enum TieBreak {
    GameWINS = "game wins",
    MatchWINSVsTied = "match wins vs tied",
    MedianBuchholz = "median buchholz",
    PointsDifference = "points difference",
    PointsScored = "points scored",
}

export enum TournamentType {
    DoubleElimination = "double elimination",
    SingleElimination = "single elimination",
}

// import { ChallongeTournament, MatchState, TournamentState, TournamentType } from '../types/challonge-types';
import { Tournaments, Tournament, SingleElimination, DoubleElimination } from '../types/tournament';
import { NewMatch } from '../types/matches';
import { Player } from '../types/player';
import { Team } from '../types/team';

const nodecg = nodecgApiContext.get();

const tournamentsRep = nodecg.Replicant<Tournaments>('tournaments');
// const matchesRep = nodecg.Replicant<Matches>('matches');

nodecg.listenFor('challonge:import', (data: {id: string, parseAsPlayers: boolean}) => {
	const idNum = parseInt(data.id);

	if (idNum === NaN) {
		nodecg.log.error(`Challonge: Tried importing ${data.id}. Failed: NaN`);
		return;
	}

	let challongeTournament: {} | ChallongeTournament = {};

	nodecg.log.info(`Challonge: Requesting ${idNum}`);
	axios.get(`https://api.challonge.com/v1/tournaments/${idNum}.json?api_key=${nodecg.bundleConfig.challonge_key}&include_participants=1&include_matches=1`).then((res) => {
		if (res.status !== 200) {
			nodecg.log.error(`Challonge: Tried importing ${data.id}. Bad response code: ${res.status}`);
			nodecg.log.error(res.data);
			return;
		}

		try {
			challongeTournament = <ChallongeTournament>res.data;
		} catch (error) {
			nodecg.log.error(`Failed to parse challonge response:\n${JSON.stringify(res.data, null, 2)}`);
		}
		
		if (challongeTournament === {}) {
			nodecg.log.error(`Challonge: Tried importing ${data.id}. Unknown error.`);
			return;
		}
	
		parseChallongeTournament(<ChallongeTournament>challongeTournament, data.parseAsPlayers)
	});

});

async function parseChallongeTournament(data: ChallongeTournament, parseAsPlayers = false) {
	console.log(parseAsPlayers)
	if (tournamentsRep.value.hasOwnProperty(data.tournament.id.toString())) {
		nodecg.log.warn(`Tournament ${data.tournament.id} already exists in TournamentsRep. Updating Tournaments is not yet supported.`)
		return;
	}

	if (data.tournament.state === TournamentState.Pending) {
		nodecg.log.warn(`Cannot load tournament ${data.tournament.id} as it is currently pending. Can only load pending or completed tournaments.`)
		return;
	}

	// Setup teams/players
	// Will also set the player as a self team
	if (parseAsPlayers) {
		data.tournament.participants.forEach(player => {
			nodecg.sendMessage('newChallongePlayer', <Player>{
				id: player.participant.id.toString(),
				name: player.participant.name,
				selfTeam: true,
			});
		});
	} else {
		data.tournament.participants.forEach(team => {
			nodecg.sendMessage('newChallongeTeam', <Team>{
				id: team.participant.id.toString(),
				name: team.participant.name
			});
		});
	}

	// Need to wait for all new teams/players to be made
	// Sleeping is the dumbest way to "make sure" but I'm gonna leave it for now since I want this to work
	await sleep(1000);

	// Setup matches
	data.tournament.matches.forEach(match => {
		if (match.match.state === MatchState.Pending) return;

		if (match.match.state === MatchState.Complete) {
			nodecg.sendMessage('createNewMatch', <NewMatch>{
				id: match.match.id.toString(),
				teamA: match.match.player1_id?.toString(),
				teamB: match.match.player2_id?.toString(),
				winner: match.match.winner_id?.toString(),
				tournamentId: data.tournament.id.toString(),
			});
		} else {
			nodecg.sendMessage('createNewMatch', <NewMatch>{
				id: match.match.id.toString(),
				teamA: match.match.player1_id?.toString(),
				teamB: match.match.player2_id?.toString(),
				tournamentId: data.tournament.id.toString(),
			});
		}
	});

	// Setup Tournament
	let fixture: Tournament['fixture'] | undefined;

	switch (data.tournament.tournament_type) {
		case TournamentType.SingleElimination:
			const rounds: string[][] = [];
			data.tournament.matches.forEach(match => {
				if (typeof rounds[match.match.round] === 'undefined') {
					rounds[match.match.round - 1] = [match.match.id.toString()];
				} else {
					rounds[match.match.round - 1].push(match.match.id.toString());
				}
			});

			fixture = <SingleElimination>{
				type: 'single-elimination',
				matches: rounds
			}

			break;
	
		case TournamentType.DoubleElimination:
			const winnerRounds: string[][] = [];
			const loserRounds: string[][] = [];
			data.tournament.matches.forEach(match => {
				if (match.match.round >= 0) {
					if (typeof winnerRounds[match.match.round - 1] === 'undefined') {
						winnerRounds[match.match.round - 1] = [match.match.id.toString()];
					} else {
						winnerRounds[match.match.round - 1].push(match.match.id.toString());
					}
				} else {
					// Loser rounds have a negative round property
					if (typeof loserRounds[match.match.round * -1 - 1] === 'undefined') {
						loserRounds[match.match.round * -1 - 1] = [match.match.id.toString()];
					} else {
						loserRounds[match.match.round * -1 - 1].push(match.match.id.toString());
					}
				}
			});
			
			fixture = <DoubleElimination>{
				type: 'double-elimination',
				winnerMatches: winnerRounds,
				loserMatches: loserRounds
			}

			break;
		default:
			nodecg.log.error(`Challonge: Tried parsing. Did not recognise tournament type: ${data.tournament.tournament_type}`);
			break;
	}

	if (fixture === undefined) {
		return;
	}

	const newTournament: Tournament = {
		id: data.tournament.id.toString(),
		logo: '',
		name: data.tournament.name,
		active: false,
		fixture: fixture
	}

	nodecg.sendMessage('newChallongeTournament', newTournament);

	// How
	nodecg.log.info(`Successfully added tournament ${data.tournament.name}`);
}

function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
