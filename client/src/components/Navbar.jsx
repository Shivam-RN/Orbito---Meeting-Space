import { Link, useLocation } from "react-router-dom";
import { History, LayoutDashboard, Sparkles } from "lucide-react";
import { UserButton, useUser } from "@clerk/react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/sessions", label: "Sessions", icon: History },
  { to: "/pricing", label: "Pricing", icon: Sparkles },
];

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { pathname } = useLocation();

  const userName =
    user?.firstName ||
    user?.fullName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "User";

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-3 pt-3">
        <div className="mx-auto max-w-6xl flex items-center justify-between rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-900/5 px-4 py-2.5">

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Orbito logo" className="size-7" />
            <span className="text-xl font-semibold tracking-tight text-slate-900">
              Orbito
            </span>
          </Link>

          {/* Desktop nav */}
          {isSignedIn && (
            <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-100/80 p-1">
              {links.map(({ to, label, icon: Icon }) => {
                const active = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                      active
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="size-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right side */}
          {isSignedIn && (
            <div className="flex items-center gap-3 rounded-full bg-slate-100/80 pl-4 pr-1.5 py-1.5">
  <div className="hidden sm:block text-right leading-tight">
    <p className="text-[11px] text-slate-500">Welcome back</p>
    <p className="text-sm font-semibold text-slate-900 max-w-[120px] truncate">
      {userName}
    </p>
  </div>

  <div className="relative">
    <UserButton
      afterSignOutUrl="/login"
      appearance={{
        elements: {
          avatarBox: "size-9 ring-2 ring-white shadow-md",
        },
      }}
    />
    {/* online dot */}
    <span className="pointer-events-none absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
  </div>
</div>
          )}
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      {isSignedIn && (
        <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 flex items-center justify-around rounded-2xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-900/10 p-1.5">
          {links.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-medium transition-all ${
                  active ? "bg-blue-50 text-blue-600" : "text-slate-500"
                }`}
              >
                <Icon className="size-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
};

export default Navbar;