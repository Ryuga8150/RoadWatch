import React from "react";
type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="flex items-center justify-center p-1.5">
      <img
        src="/roadwatch-logo.png"
        alt="RoadWatch Logo"
        className="h-[62px] w-auto"
      />
    </div>
  );
};

export default Logo;
