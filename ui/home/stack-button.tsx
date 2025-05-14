import Image from "next/image";

const Stackbutton = ({ stack }: { stack: string }) => {
  return (
    <button>
      <Image src={`/images/${stack}.png`} alt={stack} fill />
      <span>{stack}</span>
    </button>
  );
};

export default Stackbutton;
