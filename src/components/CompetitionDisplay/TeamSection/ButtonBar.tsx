import { ClearTeamsButton, EditTeamsButton } from "../Buttons";

export default function ButtonBar({
  teamsGrp1ForTable,
  teamsGrp2ForTable,
  refetch,
}: {
  teamsGrp1ForTable: any;
  teamsGrp2ForTable: any;
  refetch: any;
}) {
  return (
    <div className="w-100 flex justify-end gap-2 mb-4">
      <EditTeamsButton
        teams={[...teamsGrp1ForTable, ...teamsGrp2ForTable]}
        refetch={refetch}
      />
      <ClearTeamsButton refetch={refetch} />
    </div>
  );
}
