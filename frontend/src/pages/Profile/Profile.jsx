import { LogOut, Mail, ShieldCheck, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Breadcrumbs items={[{ label: "Profile" }]} />

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cobalt-500 text-xl font-semibold text-white">
            {initials}
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold text-ink-900 dark:text-white">
              {user?.name}
            </h1>
            <p className="text-sm text-ink-500 dark:text-ink-400">{user?.email}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 border-t border-ink-100 pt-5 dark:border-ink-800">
          <div className="flex items-center gap-3 text-sm">
            <UserIcon size={16} className="text-ink-400" />
            <span className="text-ink-500 dark:text-ink-400">Name</span>
            <span className="ml-auto font-medium text-ink-800 dark:text-ink-100">{user?.name}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-ink-400" />
            <span className="text-ink-500 dark:text-ink-400">Email</span>
            <span className="ml-auto font-medium text-ink-800 dark:text-ink-100">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ShieldCheck size={16} className="text-ink-400" />
            <span className="text-ink-500 dark:text-ink-400">Role</span>
            <span className="ml-auto font-medium capitalize text-ink-800 dark:text-ink-100">
              {user?.role || "member"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t border-ink-100 pt-5 dark:border-ink-800">
          <Button variant="danger" icon={LogOut} onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </Card>
    </div>
  );
}
