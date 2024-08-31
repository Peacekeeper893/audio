import { useState , useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
// import useDark from "./useDark";


function useDark() {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";
 
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);
 
    return [colorTheme, setTheme]
}

export default function Switcher() {
    const [colorTheme, setTheme] = useDark();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <>
            <DarkModeSwitch
                style={{ marginBottom: "0rem" }}
                checked={darkSide}
                onChange={toggleDarkMode}
                size={30}
            />
        </>
    );
}
