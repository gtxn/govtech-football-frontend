import TeamTable from "./TeamTable";

export default function NextStageTeamView({ teamData }: { teamData: any }) {
  return (
    <div className={`bg-gray-100 mb-4 relative rounded-xl p-5 box-border z-0`}>
      <h4 className={`text-lg font-semibold`}>Teams to next stage</h4>
      {teamData.length > 0 ? (
        <TeamTable
          teams={teamData}
          accentTop3={false}
          attributesToDisplay={[
            "team_name",
            "group_number",
            "date_registered",
            "num_wins",
            "num_draws",
            "num_losses",
            "total_goals",
          ]}
        />
      ) : (
        <p className="text-gray-700 italic mt-4 text-sm">No match data yet</p>
      )}
    </div>
  );
}
