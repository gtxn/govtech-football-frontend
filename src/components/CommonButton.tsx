import { Button, CircularProgress, Tooltip } from "@mui/material";

const CommonButton = ({
  isLoading,
  onClick,
  title,
  variant,
  style,
  color,
  isDisabled,
  tooltipText,
  size,
}: {
  title: string;
  onClick: any;
  isLoading?: boolean;
  variant?: "outlined" | "contained" | "text";
  style?: any;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "gray";
  isDisabled?: boolean;
  tooltipText?: string;
  size?: "small" | "medium" | "large";
}) => {
  return (
    <>
      {isLoading ? (
        <Button
          variant={variant || "outlined"}
          color={(color !== "gray" && color) || "primary"}
          style={{
            ...style,
            borderColor: color === "gray" ? "gray" : "",
            color: color === "gray" ? "gray" : "",
          }}
          startIcon={
            <CircularProgress
              size={20}
              style={{
                color: "gray",
              }}
            />
          }
          size={size}
          disabled={true}
        >
          Loading
        </Button>
      ) : (
        <Tooltip title={tooltipText}>
          <span>
            <Button
              variant={variant || "outlined"}
              onClick={onClick}
              style={{
                ...style,
                borderColor: color === "gray" ? "gray" : "",
                color: color === "gray" ? "gray" : "",
              }}
              color={(color !== "gray" && color) || "primary"}
              disabled={isDisabled}
              size={size}
            >
              {title}
            </Button>
          </span>
        </Tooltip>
      )}
    </>
  );
};

export default CommonButton;
