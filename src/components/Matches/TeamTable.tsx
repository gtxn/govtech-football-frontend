import { TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMemo } from "react";

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

export default function TeamTable({ teams }: { teams: Array<any> }) {
  let attributes = useMemo(() => {
    if (teams && teams[0]) {
      return Object.keys(teams[0]);
    }
    return [];
  }, [teams]);

  let isEditable = useMemo(() => {
    if (attributes.includes("rank")) {
      return true;
    }
    return false;
  }, [attributes]);

  return (
    <TableContainer>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {attributes.map(
              (attribute: string) =>
                attribute !== "session_id" &&
                attribute !== "match_history" &&
                attribute !== "team_id" && (
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      "&:first-child": { paddingLeft: 0 },
                    }}
                  >
                    {attributeTableMapping[attribute] || attribute}
                  </TableCell>
                )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((row: any) => (
            <TableRow
              key={row.team_name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              {attributes.map(
                (attribute: string) =>
                  attribute !== "session_id" &&
                  attribute !== "match_history" &&
                  attribute !== "team_id" && (
                    <TableCell
                      sx={{
                        "&:first-child": { paddingLeft: 0 },
                        minWidth: attribute == "team_name" ? "150px" : "",
                      }}
                    >
                      {row[attribute]}
                    </TableCell>
                  )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
