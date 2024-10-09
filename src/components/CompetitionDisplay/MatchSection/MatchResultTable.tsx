import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Match2Player, Team } from "../../../utils/schema";
import EditableMatchField from "./EditableMatchField";

export default function MatchResultTable({
  matches,
  setMatches,
  isEditing,
}: {
  matches: Array<Match2Player>;
  setMatches: any;
  isEditing?: boolean;
}) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontWeight: "600",
                }}
              >
                Team 1
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "600",
                }}
              >
                Team 2
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "600",
                }}
              >
                Team 1 Goals
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "600",
                }}
              >
                Team 2 Goals
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match: any, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    textDecoration:
                      match.team1_goals >= match.team2_goals ? "underline" : "",
                  }}
                >
                  {match.team1_name}
                </TableCell>
                <TableCell
                  sx={{
                    textDecoration:
                      match.team2_goals >= match.team1_goals ? "underline" : "",
                  }}
                >
                  {match.team2_name}
                </TableCell>

                {["team1_goals", "team2_goals"].map((attribute: string) => (
                  <TableCell>
                    {isEditing ? (
                      <EditableMatchField
                        row={match}
                        rowIndex={index}
                        attribute={attribute}
                        matchData={matches}
                        setMatchData={setMatches}
                      />
                    ) : (
                      match[attribute]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
