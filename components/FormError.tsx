import { ShieldAlert } from "lucide-react";

interface FormErrorProps {
  message: string | undefined;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ShieldAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
