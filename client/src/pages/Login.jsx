
import { SignIn, SignUp, useUser } from "@clerk/react";
import { Navigate } from "react-router-dom";

const stats = [
  { value: "HD", label: "Video" },
  { value: "<100ms", label: "Latency" },
  { value: "Live", label: "Chat" },
];

const appearance = {
  variables: {
    colorPrimary: "#0ea5e9",
    borderRadius: "0.75rem",
    fontFamily: "inherit",
  },
  elements: {
    rootBox: "w-full max-w-md",
    card: "bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl",
    headerTitle: "text-white text-2xl font-bold",
    headerSubtitle: "text-white/80",
    socialButtonsBlockButton:
      "bg-white/90 hover:bg-white border-0 text-slate-800 transition",
    socialButtonsBlockButtonText: "font-medium",
    dividerLine: "bg-white/30",
    dividerText: "text-white/80",
    formFieldLabel: "text-white",
    formFieldInput:
      "bg-white/90 border-0 focus:ring-2 focus:ring-sky-300",
    formButtonPrimary:
      "bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-500/30 transition",
    footer: "bg-transparent",
    footerActionText: "text-white/80",
    footerActionLink: "text-sky-200 hover:text-white",
  },
};
const Login = ({ mode = "login" }) => {
  const isRegister = mode === "register";
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[url('/login_bg.png')] bg-cover bg-center font-sans p-4 sm:p-8 lg:px-16 flex flex-col lg:flex-row items-center justify-center lg:justify-around gap-10">

      {/* LEFT */}
      <div className="relative w-full lg:max-w-xl text-white text-center lg:text-left">
      <div className="flex items-center justify-center lg:justify-start gap-3">
  <div className="relative h-12 w-12 flex items-center justify-center">
    {/* meeting circle */}
    <span className="absolute inset-0 rounded-full border border-dashed border-white/40" />

    {/* participants orbiting */}
    <span className="absolute inset-0 animate-spin [animation-duration:8s]">
      {[
        { deg: 0, color: "bg-sky-300" },
        { deg: 120, color: "bg-emerald-300" },
        { deg: 240, color: "bg-orange-300" },
      ].map((d) => (
        <span
          key={d.deg}
          className="absolute inset-0"
          style={{ transform: `rotate(${d.deg}deg)` }}
        >
          <span
            className={`absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full border border-white ${d.color}`}
          />
        </span>
      ))}
    </span>

    {/* video camera */}
    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
    </svg>
  </div>

  <h2 className="text-2xl font-bold tracking-wide">Orbito</h2>
</div>

        <h1 className="mt-4 text-3xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1]">
          Talk face to face,
          <span className="block text-sky-200">from anywhere.</span>
        </h1>

        <p className="mt-4 text-white/80 max-w-md mx-auto lg:mx-0">
          Real-time video calls with built-in chat.
        </p>

        <div className="mt-8 flex justify-center lg:justify-start gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 px-4 py-3 min-w-25"
            >
              <p className="text-lg text-center sm:text-xl font-bold">{s.value}</p>
              <p className="text-xs text-center text-white/70">{s.label}</p>
            </div>
          ))}
        </div>

        {/* floating chat bubbles (desktop only) */}
        <div className="hidden xl:block absolute -right-6 top-0 rotate-3 rounded-2xl rounded-br-sm bg-white text-slate-800 text-sm px-4 py-2 shadow-xl">
          Ready to join? 👋
        </div>
        <div className="hidden xl:block absolute right-10 top-12 -rotate-2 rounded-2xl rounded-bl-sm bg-sky-500 text-white text-sm px-4 py-2 shadow-xl">
          Yes, let's go!
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full max-w-md px-1 flex justify-center">
        {isRegister ? (
          <SignUp
            appearance={appearance}
            routing="path"
            path="/register"
            signInUrl="/login"
            fallbackRedirectUrl="/dashboard"
          />
        ) : (
          <SignIn
            appearance={appearance}
            routing="path"
            path="/login"
            signUpUrl="/register"
            fallbackRedirectUrl="/dashboard"
          />
        )}
      </div>
    </div>
  );
};

export default Login;

