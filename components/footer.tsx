import { Zap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0  text-neutral-500">
      <div className="gap-1 text-sm flex items-center">
        <span className="font-medium text-neutral-400">made by midsane</span>
        <Zap size={14} className="opacity-70" />
      </div>
    </footer>
  );
};
