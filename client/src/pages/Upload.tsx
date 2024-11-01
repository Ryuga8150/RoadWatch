import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SensorForm from "@/ui/SensorForm";
import React from "react";

type Props = {};

const Upload = (props: Props) => {
  return (
    <div className="container mx-auto h-full">
      <div className="flex h-full w-full flex-col gap-16 rounded-xl p-8 [background:#FFF]">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold uppercase leading-[normal] text-black [font-family:Roboto]">
            Upload File (csv/excel)
          </h2>
          <Input id="picture" type="file" className="w-56 cursor-pointer" />
        </div>

        <SensorForm />
      </div>
    </div>
  );
};

export default Upload;
