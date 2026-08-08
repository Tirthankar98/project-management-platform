import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu, Search, Bell, Sun, Moon, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      navigate(`/tasks?search=${encodeURIComponent(e.target.value.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-ink-100 bg-white/80 px-4 backdrop-blur dark:border-ink-800 dark:bg-ink-900/80 sm:px-6">
      <button onClick={onMenuClick} className="text-ink-500 hover:text-ink-800 lg:hidden">
        <Menu size={20} />
      </button>

      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          onKeyDown={handleSearch}
          className="w-full rounded-xl border border-ink-200 bg-ink-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-cobalt-400 focus:bg-white focus:ring-4 focus:ring-cobalt-100 dark:border-ink-700 dark:bg-ink-800 dark:focus:bg-ink-800"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-signal-red" />
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-ink-100 dark:hover:bg-ink-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cobalt-500 text-xs font-semibold text-white">
              {initials}
            </div>
            <span className="hidden text-sm font-medium text-ink-700 dark:text-ink-200 sm:block">
              {user?.name || "User"}
            </span>
            <ChevronDown size={14} className="hidden text-ink-400 sm:block" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 animate-fadeIn rounded-xl border border-ink-100 bg-white p-1.5 shadow-card dark:border-ink-800 dark:bg-ink-900">
              <div className="px-3 py-2">
                <p className="truncate text-sm font-medium text-ink-800 dark:text-ink-100">{user?.name}</p>
                <p className="truncate text-xs text-ink-400">{user?.email}</p>
              </div>
              <div className="my-1 h-px bg-ink-100 dark:bg-ink-800" />
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800"
              >
                <UserIcon size={15} /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-signal-red hover:bg-signal-red/10"
              >
                <LogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};
