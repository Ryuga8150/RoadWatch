import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandInput } from "@/components/ui/command";
import { AlertIcon } from "@/utils/icons";
import React from "react";
import IconButton from "./IconButton";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex items-center py-5 px-10 justify-between border-b-black/30 border-b">
      <div className="flex flex-grow items-center justify-center">
        <Command className="w-[536px] rounded-md  p-0.5">
          <CommandInput
            placeholder="Search ..."
            className="font-[Inter] text-[#919298] text-md font-normal"
          />
        </Command>
      </div>

      <div className="flex items-center gap-4">
        <IconButton>
          <AlertIcon color="black" />
        </IconButton>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
