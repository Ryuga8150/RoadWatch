import { Link, To } from "react-router-dom";
import { cn } from "../utils/cn";

type Props = {
  children: React.ReactNode;
  text?: string;
  active?: boolean;
  disabled?: boolean;
  to?: To;
};

const IconButton = ({
  children,
  text = "",
  disabled,
  active,
  to = "",
}: Props) => {
  return (
    <Link to={to} className="w-full">
      <button
        className={cn("w-full p-2 flex gap-6 items-center", {
          " bg-[rgba(0,130,255,0.95)] p-2.5 rounded-[5px] border-solid": active,
        })}
      >
        {children}

        {!disabled && (
          <span
            // flex w-[180px] justify-center items-center gap-4 border [background:]  border-[#919298]
            className={cn(
              "uppercase text-[#919298] [font-family:Inter] text-lg font-normal text-left",
              {
                "text-slate-50": active,
              }
            )}
          >
            {text}
          </span>
        )}
      </button>
    </Link>
  );
};

export default IconButton;
