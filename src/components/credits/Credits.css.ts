import { style } from "@vanilla-extract/css";

import { primaryAccent } from "../../styles/globals.css";

export const creditStyles = style({
  fontSize: 12,
  fontWeight: 400,
  backgroundColor: "#fff",
  height: "auto",
  textAlign: "left",
  maxHeight: 13,
  width: 175,
  padding: 4,
  top: 30,
  left: 40,
  paddingLeft: 10,
  borderLeft: `1px solid ${primaryAccent}`,
  zIndex: 10,
  position: "fixed",
  overflow: "hidden",
  transition: "max-height 1.2s ease-in-out",

  ":hover": {
    height: "auto",
    maxHeight: 1000,
    transition: "max-height 1.2s ease-in-out",
  },
});

export const creditTitleStyles = style({
  textTransform: "uppercase",
  fontWeight: 700,
});

export const contStyles = style({
  paddingTop: 10,
  borderTop: "1px solid #eee",
});
