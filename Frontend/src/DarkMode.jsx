import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function DarkMode({check}) {
  
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
  <button
  onClick={toggleTheme}
  className="p-0 transition flex items-center gap-2 w-full"
>
  {check === "laptop" ? (
    theme === "dark" ? (
      <>
        <Sun size={17} />
        <span>Light</span>
      </>
    ) : (
      <>
        <Moon size={17} />
        <span>Dark</span>
      </>
    )
  ) : theme === "dark" ? (
    <Sun size={20} />
  ) : (
    <Moon size={20} />
  )}
</button>

  );
}

export default DarkMode;
