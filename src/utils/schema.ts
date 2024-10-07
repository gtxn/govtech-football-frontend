export interface Team {
  session_id?: string;
  team_name: string;
  date_registered: number;
  group_number: number;
  num_wins?: number;
  num_losses?: number;
  num_draws?: number;
  total_goals?: number;
  match_history?: Array<Match>;
  rank?: number;
}

export interface Match {
  opponent_name: string;
  goals_scored: number;
  goals_opponent_scored: number;
}
