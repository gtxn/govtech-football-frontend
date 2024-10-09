import { TextField, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useMemo, useState } from "react";
import { Team } from "../../../utils/schema";
import EditableFieldTeams from "../modals/EditableFieldTeams";
import { TeamViewButton } from "../Buttons";

let attributeTableMapping: any = {
  team_name: "Team Name",
  date_registered: "Date Registered",
  group_number: "Group Number",
  num_wins: "Wins",
  num_losses: "Losses",
  num_draws: "Draws",
  total_goals: "Total Goals Scored",
  rank: "Rank",
};

export default function TeamTable({
  teams,
  isEditing,
  setEditedValue,
  highlightColor,
  accentTop3,
  attributesToDisplay,
}: {
  teams: Array<any>;
  isEditing?: boolean;
  setEditedValue?: any;
  highlightColor?: string;
  accentTop3?: boolean;
  attributesToDisplay?: Array<
    | "session_id"
    | "team_id"
    | "team_name"
    | "date_registered"
    | "group_number"
    | "created_at"
    | "last_modified_at"
    | "num_wins"
    | "num_losses"
    | "num_draws"
    | "total_goals"
    | "match_history"
  >;
}) {
  const [teamData, setTeamData] = useState([]);
  const [editableAttributes, setEditableAttributes] = useState([
    "team_name",
    "group_number",
    "date_registered",
  ]);

  // Filter out attributes that goes into the table
  let tableAttributes = useMemo(() => {
    if (attributesToDisplay) {
      return attributesToDisplay;
    }

    if (teams && teams[0]) {
      return Object.keys(teams[0]).filter(
        (attribute: string) =>
          attribute !== "session_id" &&
          attribute !== "match_history" &&
          attribute !== "team_id" &&
          attribute !== "created_at" &&
          attribute !== "last_modified_at"
      );
    }
    return [];
  }, [teams, attributesToDisplay]);

  // Initialise teamData (teamData is state of edited team data)
  useEffect(() => {
    let t: any = teams;
    if (t.length > 0 && t[0].rank) {
      setEditableAttributes([]);
    }
    setTeamData(t);
  }, [teams]);

  return (
    <TableContainer>
      <Table sx={{ width: "100%", overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableAttributes.map((attribute: string) => (
              <TableCell
                sx={{
                  fontWeight: "600",
                  "&:first-child": { paddingLeft: 0 },
                }}
              >
                {attributeTableMapping[attribute] || attribute}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {teamData.map((row: any) => (
            <TableRow
              key={row.team_name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              {tableAttributes.map((attribute: string) => (
                <TableCell
                  sx={{
                    "&:first-child": { paddingLeft: 0 },
                    // Highlight top 3
                    fontWeight: accentTop3 && row?.rank <= 3 ? "600" : "400",
                    backgroundColor:
                      accentTop3 && row?.rank <= 3
                        ? `${highlightColor || ""}`
                        : "inherit",
                  }}
                >
                  {isEditing && editableAttributes.includes(attribute) && (
                    <EditableFieldTeams
                      row={row}
                      attribute={attribute}
                      teamData={teamData}
                      setTeamData={setTeamData}
                      setEditedValue={setEditedValue}
                    />
                  )}

                  {!isEditing &&
                    (attribute === "team_name" ? (
                      <div className="w-32">
                        <TeamViewButton team={row} />
                      </div>
                    ) : (
                      <p>{row[attribute]}</p>
                    ))}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
