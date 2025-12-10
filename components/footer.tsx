import { Zap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-5 bg-transparent text-neutral-500">
      <div className="gap-1 text-sm flex items-center">
        <span className="font-medium text-neutral-400">made by midsane</span>
        <Zap size={14} className="opacity-70" />
      </div>
    </footer>
  );
};
