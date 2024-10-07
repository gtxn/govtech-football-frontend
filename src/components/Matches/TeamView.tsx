import { Team } from "../../utils/schema";
import CommonButton from "../CommonButton";
import TeamTable from "./TeamTable";

export default function TeamView({
  teamsGrp1ForTable,
  teamsGrp2ForTable,
}: {
  teamsGrp1ForTable: Array<Team>;
  teamsGrp2ForTable: Array<Team>;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 bg-white rounded-md p-4 shadow-sm">
      <div className="md:w-1/2">
        <div className="md:mr-2 relative bg-green-50 rounded-xl p-5 box-border z-0">
          <CommonButton
            title={"Edit"}
            onClick={undefined}
            variant="text"
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "green",
            }}
          />

          <h4 className="text-lg font-semibold text-green-900">Group 1</h4>
          <TeamTable teams={teamsGrp1ForTable} />
        </div>
      </div>

      <div className="md:w-1/2">
        <div className="md:ml-2 bg-blue-50 rounded-xl p-5 box-border">
          <h4 className=" text-lg font-semibold text-blue-900">Group 2</h4>
          <TeamTable teams={teamsGrp2ForTable} />
        </div>
      </div>
    </div>
  );
}
