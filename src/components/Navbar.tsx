import { Link } from "react-router-dom";
import Logo from "./Logo";
import defaultAvatar from "../assets/defaultAvatar.png";

function Navbar() {
  return (
    <nav className="flex items-center px-11 py-3 lg:px-20 xl:px-40 justify-between border-b border-[#264532]">
      <Logo />
      <div className="flex items-center gap-11">
        <ul className="flex gap-11">
          <Link to={"/"}>
            <li className="font-noto font-semibold text-[#ffffff]">Habits</li>
          </Link>
          <Link to={"/categories"}>
            <li className="font-noto font-semibold text-[#ffffff]">
              Categories
            </li>
          </Link>
        </ul>
        <div className="flex items-center gap-7">
          {/* <FaRegBell size={24} color="cfd2d0" /> */}
          <img
            className="size-10 rounded-full"
            src={defaultAvatar}
            alt="defaultAvatar"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
