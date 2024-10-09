import React, { createContext, useContext, useState, ReactNode } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AlertColor } from "@mui/material/Alert";

interface AlertContextType {
  showAlert: (
    message: string,
    severity?: AlertColor,
    duration?: number
  ) => void;
}

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration?: number;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw Error("Failed to raise alert");
  }

  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "info",
    duration: 3000,
  });

  const showAlert = (
    message: string,
    severity: AlertColor = "info",
    duration: number = 3000
  ) => {
    setAlert({
      open: true,
      message,
      severity,
      duration,
    });
  };

  const handleClose = () => {
    setAlert((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={alert.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={alert.severity}>
          <p>{alert.message}</p>
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
