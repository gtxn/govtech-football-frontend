import { Typography } from "@mui/material";

export default function LogsHeader() {
  return (
    <div className="mb-5">
      <Typography variant="h6" sx={{ fontWeight: "600" }}>
        My logs
      </Typography>
      <p className="italic text-gray-700">
        Only displays logs that concern the current user
      </p>
    </div>
  );
}
