import React, { Dispatch, SetStateAction } from "react";

interface NavbarWorkFlowProps {
  scale: string;
  setScale: Dispatch<SetStateAction<string>>;
}

const NavbarWorkFlow: React.FC<NavbarWorkFlowProps> = () => {
  return (
    <div className="h-12 flex items-center justify-between px-4 bg-[#2e2e32]">
      <div className="text-white">Press / to open insert menu</div>
      
    </div>
  );
};

export default NavbarWorkFlow;
