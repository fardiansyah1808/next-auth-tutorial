import { auth, signOut } from "@/auth";
import React from "react";

const SettingsPage = async () => {
  const session = await auth();
  const role = session?.user.role;
  return (
    <div>
      This is Protected Settings Page for {role}
      <p>{JSON.stringify(session?.user)}</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/auth/login" });
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default SettingsPage;
