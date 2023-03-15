import { createVar, globalStyle } from "@vanilla-extract/css";

export const primaryAccent = createVar();

globalStyle("body", {
  fontFamily: '"Biryani", sans-serif',
  vars: {
    [primaryAccent]: "#c10016",
  },
});

globalStyle("a, a:visited, a:hover", {
  margin: 0,
});

// Scrollbar stuff
globalStyle("::-webkit-scrollbar", {
  width: 10,
});

globalStyle("::-webkit-scrollbar-track", {
  background: "white",
});

globalStyle("::-webkit-scrollbar-thumb", {
  background: primaryAccent,
  borderRadius: 50,
});
