// components/ui/TechStackButton.tsx

"use client";

import Image from "next/image";

type TechStackButtonProps = {
  name: string;
  isSelected: boolean;
  isNoneSelected: boolean;
  onClick: (name: string) => void;
};

const TechStackButton = ({
  name,
  isSelected,
  isNoneSelected,
  onClick,
}: TechStackButtonProps) => {
  return (
    <button
      onClick={() => onClick(name)}
      className={`hover:scale-110 px-3 py-2 text-lg flex items-center gap-3 border rounded-full transition-opacity duration-200 ${
        isSelected
          ? "opacity-100"
          : isNoneSelected
            ? "opacity-100"
            : "opacity-50"
      }`}
    >
      <Image
        src={`/images/languages/${name}.png`}
        width={32.64}
        height={32.64}
        alt={name}
      />
      <span>{name}</span>
    </button>
  );
};

export default TechStackButton;
