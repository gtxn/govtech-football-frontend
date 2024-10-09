import React, { useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TeamTable from "../TeamSection/TeamTable";
import { Team } from "../../../utils/schema";
import CommonButton from "../../CommonButton";
import updateTeamsApi from "../../../api/updateTeams";
import clearTeamsBySession from "../../../api/clearTeamsFromSession";
import { useSearchParams } from "react-router-dom";

export default function ClearModal({
  open,
  setOpen,
  clearFunction,
  header,
  bodyText,
}: {
  open: boolean;
  setOpen: any;
  clearFunction: any;
  header: string;
  bodyText: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  let handleSubmit = async () => {
    setIsLoading(true);

    await clearFunction();

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
          maxHeight: "90vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            marginBottom: 2,
          }}
        >
          {header}
        </Typography>

        <p className="mb-4">
          <b className="text-red-400">WARNING:</b> {bodyText}
        </p>

        <div className="flex gap-2 justify-end">
          <CommonButton
            title="Cancel"
            onClick={() => {
              setOpen(false);
            }}
            color="gray"
          />
          <CommonButton
            title="Confirm"
            onClick={handleSubmit}
            color="error"
            isLoading={isLoading}
          />
        </div>

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
