import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <div className="flex w-full items-center justify-center gap-x-2">
      <Button variant="outline" size="lg" className="w-full" onClick={() => {}}>
        <FcGoogle />
      </Button>
      <Button variant="outline" size="lg" className="w-full" onClick={() => {}}>
        <FaGithub />
      </Button>
    </div>
  );
};
