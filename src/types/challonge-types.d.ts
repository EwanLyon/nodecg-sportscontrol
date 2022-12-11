export interface ChallongeTournament {
    tournament: Tournament;
}

export interface Tournament {
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
