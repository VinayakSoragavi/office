import React, { Dispatch, SetStateAction } from "react";

interface NavbarWorkFlowProps {
  scale: number;
  setScale: Dispatch<SetStateAction<number>>;
}

const NavbarWorkFlow: React.FC<NavbarWorkFlowProps> = ({ scale, setScale }) => {
  const handleScaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Convert string to number and update scale
    setScale(Number(e.target.value));
  };

  const scaleOptions = [50, 75, 100, 125, 150];

  return (
    <nav className="h-12 flex items-center justify-between px-4 bg-[#242424] text-white">
      <div className="text-sm">Press / to open insert menu</div>
      <div className="flex items-center gap-2">
        <select
          value={scale}
          onChange={handleScaleChange}
          className="bg-[#242424] border border-[#3a3a3a] rounded px-2 py-1 cursor-pointer hover:border-[#4a4a4a] transition-colors"
        >
          {scaleOptions.map((value) => (
            <option key={value} value={value}>
              {value}%
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default NavbarWorkFlow;
