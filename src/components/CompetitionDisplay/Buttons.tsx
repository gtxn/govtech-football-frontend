import { useMemo, useState } from "react";
import CommonButton from "../CommonButton";
import EditTeamsModal from "./modals/EditTeamsModal";
import { Team } from "../../utils/schema";
import ClearModal from "./modals/ClearTeamsModal";
import { Button, Tooltip } from "@mui/material";
import clearTeamsBySession from "../../api/clearTeamsFromSession";
import { useSearchParams } from "react-router-dom";
import clearMatchesBySession from "../../api/clearMatchesFromSession";
import { useAlert } from "../../Alert";
import TeamInfoModal from "./modals/TeamInfoModal";

export const EditTeamsButton = ({
  teams,
  refetch,
}: {
  teams: Array<Team>;
  refetch?: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Can only edit team information if rank hasn't been decided
  const isEditable = useMemo(() => {
    let t: any = teams;
    if (t && t[0] && t[0].rank) {
      return false;
    }
    return true;
  }, [teams]);

  return (
    <>
      <CommonButton
        title={"Edit"}
        onClick={() => setIsOpen(true)}
        variant="outlined"
        isDisabled={!isEditable}
        tooltipText="Cannot edit teams once match data has been submitted. To edit team data, first clear match data below."
      />
      <EditTeamsModal
        open={isOpen}
        setOpen={setIsOpen}
        teams={teams}
        refetch={refetch}
      />
    </>
  );
};

export const EditMatchesButton = ({
  setIsEditing,
  isEditing,
  resetMatches,
  handleSubmit,
}: {
  setIsEditing: any;
  isEditing: boolean;
  resetMatches?: any;
  handleSubmit?: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <CommonButton
            title="Cancel"
            onClick={() => {
              setIsEditing(false);
              resetMatches();
            }}
            color="gray"
            size="small"
          />
          <CommonButton
            title="Save"
            onClick={async () => {
              setIsLoading(true);
              await handleSubmit();
              setIsLoading(false);
            }}
            color="primary"
            size="small"
            isLoading={isLoading}
          />
        </div>
      ) : (
        <CommonButton
          title="Edit"
          onClick={() => {
            setIsEditing(true);
          }}
          size="small"
        />
      )}
    </>
  );
};

export const ClearTeamsButton = ({ refetch }: { refetch?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { showAlert } = useAlert();

  let clearTeams = async () => {
    let sessionId = searchParams.get("session_id") || "";
    let r = await clearTeamsBySession(sessionId);

    // Refetch the teams of the current session
    if (r && r?.data?.success && refetch) {
      await refetch();
      showAlert(`Successfullly cleared teams from ${sessionId}`, "success");
    } else {
      showAlert(`Failed to clear: ${r?.data?.data}`, "error");
    }
  };
  return (
    <>
      <CommonButton
        title={"Clear Teams"}
        onClick={() => setIsOpen(true)}
        variant="outlined"
        color="error"
      />
      <ClearModal
        open={isOpen}
        setOpen={setIsOpen}
        clearFunction={clearTeams}
        header="Clear Teams"
        bodyText="This will clear all teams
        from this session. As a result, the current session will also be deleted. You will NOT be able to retrieve the team's data
        and this action is non-reversible"
      />
    </>
  );
};

export const ClearMatchesButton = ({ refetch }: { refetch?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { showAlert } = useAlert();

  let clearTeams = async () => {
    let sessionId = searchParams.get("session_id") || "";
    let r = await clearMatchesBySession(sessionId);

    // Refetch the teams of the current session
    if (r && r?.data?.success && refetch) {
      await refetch();
      showAlert(
        `Successfully cleared matches of teams in ${sessionId}`,
        "success"
      );
    } else {
      showAlert(`Failed to clear: ${r?.data?.data}`, "error");
    }
  };
  return (
    <>
      <CommonButton
        title={"Clear Matches"}
        onClick={() => setIsOpen(true)}
        variant="outlined"
        color="error"
      />
      <ClearModal
        open={isOpen}
        setOpen={setIsOpen}
        clearFunction={clearTeams}
        header="Clear Matches"
        bodyText="This will clear all matches
        from this session. You will NOT be able to retrieve the match data
        and this action is non-reversible"
      />
    </>
  );
};

export const TeamViewButton = ({ team }: { team: Team }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="text"
        color="primary"
        sx={{
          textTransform: "none", // To prevent uppercase text
          padding: 0, // Removes button padding
          minWidth: "auto", // Ensures button width fits the text
          color: "#515151",
          textDecoration: "underline",
          "&:hover": {
            color: "gray",
            textDecoration: "underline",
            backgroundColor: "transparent",
          },
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        {team.team_name}
      </Button>

      <div className="w-screen">
        <TeamInfoModal team={team} open={open} setOpen={setOpen} />
      </div>
    </>
  );
};
