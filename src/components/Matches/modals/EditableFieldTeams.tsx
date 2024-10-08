import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Team } from "../../../utils/schema";

export default function EditableFieldTeams({
  row,
  attribute,
  teamData,
  setTeamData,
  setEditedValue,
}: {
  row: any;
  attribute: string;
  teamData: Array<Team>;
  setTeamData: any;
  setEditedValue: any;
}) {
  const [localValue, setLocalValue] = useState(row[attribute]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
  };

  const handleBlur = () => {
    const cutOffIndex = teamData.findIndex(
      (team) => team.team_id === row.team_id
    );
    const newTData = [
      ...teamData.slice(0, cutOffIndex),
      { ...row, [attribute]: localValue },
      ...teamData.slice(cutOffIndex + 1),
    ];
    setTeamData(newTData);
    setEditedValue(newTData);
  };

  return (
    <TextField value={localValue} onChange={handleChange} onBlur={handleBlur} />
  );
}
