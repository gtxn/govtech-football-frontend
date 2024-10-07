import { Button, CircularProgress } from "@mui/material";

const CommonButton = ({
  isLoading,
  onClick,
  title,
  variant,
  style,
}: {
  title: string;
  onClick: any;
  isLoading?: boolean;
  variant?: "outlined" | "contained" | "text";
  style?: any;
}) => {
  return (
    <>
      {isLoading ? (
        <Button
          variant={variant || "outlined"}
          color="secondary"
          startIcon={<CircularProgress size={20} color="secondary" />}
          style={style}
        >
          Loading
        </Button>
      ) : (
        <Button variant={variant || "outlined"} onClick={onClick} style={style}>
          {title}
        </Button>
      )}
    </>
  );
};

export default CommonButton;
