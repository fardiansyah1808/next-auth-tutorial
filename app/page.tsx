import { Inter } from "next/font/google";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import LoginButton from "@/components/auth/LoginButton";

const font = Inter({ subsets: ["latin"], weight: "600" });

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-400  to-violet-600">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐Auth
        </h1>
        <p className="text-white text-lg">
          Simple authentication service for your nextjs app
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size={"lg"}>
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
