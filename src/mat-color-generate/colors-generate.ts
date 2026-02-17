// Get the theme from a hex color
import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";

const theme = themeFromSourceColor(argbFromHex("#00363D"), [
    {
        name: "custom-1",
        value: argbFromHex("#00363D"),
        blend: true,
    },
]);
// Print out the theme as JSON
// console.log(JSON.stringify(theme, null, 2));
const systemDark = globalThis.matchMedia("(prefers-color-scheme: dark)").matches;

// Apply the theme to the body by updating custom properties for material tokens
export const themeMat = applyTheme(theme, { target: document.body, dark: systemDark });
