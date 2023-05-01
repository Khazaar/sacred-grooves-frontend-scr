import { createTheme } from "@mui/material/styles";

export let theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 280,
            md: 510,
            lg: 800,
            xl: 1920,
        },
    },
    palette: {
        action: {
            disabledBackground: "set color of background here",
            disabled: "blach",
        },
    },
});
