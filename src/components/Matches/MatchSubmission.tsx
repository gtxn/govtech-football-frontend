import { TextField } from "@mui/material";
import CommonButton from "../CommonButton";

export default function MatchSubmission({
  matchText,
  setMatchText,
  handleSubmit,
}: {
  matchText: string;
  setMatchText: any;
  handleSubmit: () => {};
}) {
  return (
    <div className="w-full flex flex-col gap-2 bg-white shadow-sm p-6 rounded-xl">
      <TextField
        fullWidth
        variant="outlined"
        multiline
        minRows={5}
        placeholder={`<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>
<Team B name> <Team C name> <Team B goals scored> <Team C goals scored>
<Team C name> <Team D name> <Team C goals scored> <Team D goals scored>`}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMatchText(event.target.value);
        }}
        value={matchText}
      />

      <CommonButton title="Submit Match Results" onClick={handleSubmit} />
    </div>
  );
}
