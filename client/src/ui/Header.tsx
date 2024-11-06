import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Notifications from "./Notifications";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { CommandGroup } from "cmdk";
// import { formatDistanceToNow } from "date-fns"; // For date formatting

const Header = () => {
  const [isCommandListVisible, setIsCommandListVisible] = useState(false);

  // Refs to track CommandInput and CommandList
  const commandInputRef = useRef<HTMLInputElement | null>(null);
  const commandListRef = useRef<HTMLDivElement | null>(null);

  // Toggle Command list visibility on CommandInput click
  const handleCommandInputClick = () => {
    setIsCommandListVisible((prev) => !prev);
  };

  // Close Command list when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandInputRef.current &&
        !commandInputRef.current.contains(event.target as Node) &&
        commandListRef.current &&
        !commandListRef.current.contains(event.target as Node)
      ) {
        setIsCommandListVisible(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-b-black/30 px-10 py-5">
      <div className="relative flex flex-grow items-center justify-center">
        <Command
          className={cn("rounded-mdp-0.5 w-[536px] border-2 border-gray-50", {
            "border-gray-500": isCommandListVisible,
          })}
        >
          <CommandInput
            ref={commandInputRef}
            placeholder="Search ..."
            className="text-md font-[Inter] font-normal text-[#919298]"
            onClick={handleCommandInputClick}
          />
          {/* Conditionally render the CommandList and position it absolutely */}
          {isCommandListVisible && (
            <CommandList
              ref={commandListRef}
              className="left-50 absolute top-full z-10 mt-2 w-[536px] rounded-md border border-gray-300 bg-white p-2 shadow-lg"
            >
              <CommandGroup heading="Roads" className="text-md font-semibold">
                <CommandItem className="text-sm font-normal">NH-52</CommandItem>
                <CommandItem className="text-sm font-normal">
                  MG Road
                </CommandItem>
                <CommandItem className="text-sm font-normal">NH-48</CommandItem>
              </CommandGroup>
              <CommandGroup heading="Sensors" className="text-md font-semibold">
                <CommandItem className="text-sm font-normal">
                  Sensor 1
                </CommandItem>
                <CommandItem className="text-sm font-normal">
                  Sensor 3
                </CommandItem>
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </div>

      <div className="flex items-center gap-8">
        <Notifications />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24">
            <DropdownMenuItem>Logout &rarr;</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
