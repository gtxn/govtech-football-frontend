import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Match2Player, Team } from "../../utils/schema";

export default function EditableMatchField({
  row,
  rowIndex,
  attribute,
  matchData,
  setMatchData,
}: {
  row: any;
  rowIndex: number;
  attribute: string;
  matchData: Array<Match2Player>;
  setMatchData: any;
}) {
  const [localValue, setLocalValue] = useState(row[attribute]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
  };

  const handleBlur = () => {
    const newMatchData = [
      ...matchData.slice(0, rowIndex),
      { ...row, [attribute]: parseInt(localValue) },
      ...matchData.slice(rowIndex + 1),
    ];
    setMatchData(newMatchData);
  };

  return (
    <TextField
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      type="number"
    />
  );
}
