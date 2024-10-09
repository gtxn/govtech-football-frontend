import TeamTable from "./TeamTable";

export default function GroupTeamView({
  teamData,
  groupNumber,
  colorTheme,
}: {
  teamData: any;
  groupNumber: string | number;
  colorTheme: "blue" | "green";
}) {
  return (
    <div className="md:w-1/2">
      <div
        className={`md:mr-2 relative bg-${colorTheme}-50 rounded-xl p-5 box-border z-0`}
      >
        <h4 className={`text-lg font-semibold text-${colorTheme}-900`}>
          Group {groupNumber}
        </h4>
        <TeamTable teams={teamData} />
      </div>
    </div>
  );
}
