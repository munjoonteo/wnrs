import { style } from "@vanilla-extract/css";

import { primaryAccent } from "../../styles/globals.css";

export const cardStyles = style({
  color: primaryAccent,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textTransform: "uppercase",
  transition: "transform 0.1s ease-in-out",
  ":hover": {
    transform: "scale(1.02)",
  },
});

export const bigCardStyles = style({
  fontSize: 25,
  width: "100%",
  height: 300,
  margin: "2rem",
  backgroundColor: "white",
  color: primaryAccent,
  borderRadius: 50,
  boxShadow: `
  0px 0.7px 2.1px rgba(0, 0, 0, 0.018),
  0px 1.6px 4.8px rgba(0, 0, 0, 0.026),
  0px 2.9px 8.7px rgba(0, 0, 0, 0.032),
  0px 4.8px 14.5px rgba(0, 0, 0, 0.038),
  0px 7.9px 23.8px rgba(0, 0, 0, 0.044),
  0px 13.9px 41.6px rgba(0, 0, 0, 0.052),
  0px 30px 90px rgba(0, 0, 0, 0.07)
  `,
  padding: 50,
});

export const smallCardStyles = style({
  // margin: "auto",
  fontSize: 18,
  width: "100%",
  height: "100%",
  // marginTop: "",
  // marginBottom: "1vh",
  margin: "1rem 0",
  borderRadius: 30,
  boxShadow: `
  0px 0.7px 2.1px rgba(0, 0, 0, 0.018),
  0px 1.6px 4.8px rgba(0, 0, 0, 0.026),
  0px 2.9px 8.7px rgba(0, 0, 0, 0.032),
  0px 4.8px 14.5px rgba(0, 0, 0, 0.038),
  0px 7.9px 23.8px rgba(0, 0, 0, 0.044),
  0px 13.9px 41.6px rgba(0, 0, 0, 0.052),
  0px 30px 90px rgba(0, 0, 0, 0.07)
  `,
  padding: 20,
});
