"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const employeePin = "1111";

type EmployeePinPromptProps = {
  onGranted: () => void;
};

function EmployeePinPrompt({ onGranted }: EmployeePinPromptProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pin !== employeePin) {
      setError("Code incorrect.");
      setPin("");
      return;
    }

    onGranted();
  }

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-[#061826]/80 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="employee-pin-title"
    >
      <form
        onSubmit={handleSubmit}
        className="relative grid w-full max-w-sm gap-5 rounded-lg bg-white p-6 text-[#061826] shadow-xl"
      >
        <div>
          <p className="text-sm font-black uppercase text-[#0e7490]">
            Espace employé
          </p>
          <h2 id="employee-pin-title" className="mt-2 text-2xl font-black">
            Code d&apos;accès requis
          </h2>
        </div>
        <label className="grid gap-2 text-sm font-black uppercase text-[#31556d]">
          Code PIN
          <input
            autoFocus
            value={pin}
            onChange={(event) => {
              setPin(event.target.value.replace(/\D/g, "").slice(0, 4));
              setError("");
            }}
            type="password"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={4}
            required
            className="h-14 rounded-md border border-[#c9e3f2] bg-[#f4fbff] px-4 text-center text-2xl font-black tracking-[0.45em] text-[#061826] outline-none ring-[#0ea5a4] focus:ring-2"
          />
        </label>
        {error && (
          <p className="text-sm font-bold text-[#b42318]" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pin.length !== 4}
          className="h-12 rounded-full bg-[#0b2d46] px-5 text-sm font-black uppercase text-white disabled:opacity-60"
        >
          Ouvrir l&apos;espace employé
        </button>
      </form>
    </div>
  );
}

export function EmployeePinGate({ children }: { children: ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false);

  if (!hasAccess) {
    return <EmployeePinPrompt onGranted={() => setHasAccess(true)} />;
  }

  return <>{children}</>;
}
