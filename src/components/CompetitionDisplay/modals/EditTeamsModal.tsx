import React, { useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TeamTable from "../TeamSection/TeamTable";
import { Team } from "../../../utils/schema";
import CommonButton from "../../CommonButton";
import updateTeamsApi from "../../../api/updateTeams";

export default function EditTeamsModal({
  open,
  setOpen,
  teams,
  refetch,
}: {
  open: boolean;
  setOpen: any;
  teams: Array<Team>;
  refetch?: any;
}) {
  const [editedTeamsValue, setEditedTeamsValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let handleSubmit = async () => {
    setIsLoading(true);

    let r = await updateTeamsApi(editedTeamsValue);

    // Refetch the teams of the current session
    if (r && r?.data?.success && refetch) {
      await refetch();
    }

    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 500,
          maxWidth: "80vw",
          maxHeight: "90vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
      >
        <Typography variant="h6" component="h2">
          Edit Teams
        </Typography>

        <TeamTable
          teams={teams}
          isEditing={true}
          setEditedValue={setEditedTeamsValue}
        />

        <CommonButton
          title="Submit"
          onClick={handleSubmit}
          style={{
            width: "100%",
          }}
          isLoading={isLoading}
        />

        <IconButton
          onClick={() => {
            setOpen(false);
          }}
          style={{
            position: "absolute",
            top: 5,
            right: 5,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
}
