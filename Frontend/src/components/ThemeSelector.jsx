import React from "react";
import { PaletteIcon } from "lucide-react"; // ✅ Correct import
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

function ThemeSelector() {

    const {theme,setTheme}=useThemeStore();
    console.log(theme)

  return (
    <div className="dropdown dropdown-end">
      {/* DROPDOWN TRIGGER */}
      <button tabIndex={0} className="btn btn-ghost">
        <PaletteIcon className="size-5" /> {/* ✅ Correct usage */}
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 pt-1 shadow-2xl bg-base-200 backdrop:blur-lg rounded-2xl w-56 border-base-content/10"
      >
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
              theme === themeOption.name
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-content/5"
            }`} onClick={()=>setTheme(themeOption.name)} 
          >
            <PaletteIcon className="size-4" /> {/* ✅ Fixed */}
            <span className="text-sm font-medium">{themeOption.label}</span>

            {/* THEME PREVIEW COLORS */}
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span
                  key={i}
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
