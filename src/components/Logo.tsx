import { PiStarFourFill } from "react-icons/pi";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="flex flex-row items-center gap-4">
        <PiStarFourFill color="38e07b" size={24} />
        <span className="font-noto font-semibold text-xl text-white">
          HabitFlow
        </span>
      </div>
    </Link>
  );
}

export default Logo;
