import Logo from "./Logo";

function Navbar() {
  return (
    <nav className="flex items-center px-11 py-3 lg:px-20 xl:px-40 justify-between border-b border-[#264532]">
      <Logo />
      <div className="flex items-center gap-11">
        <ul className="flex gap-11">
          {/* <Link to={"/"}>
            <li className="font-noto font-semibold text-[#cfd2d0]">Habits</li>
          </Link>
          <Link to={"/settings"}>
            <li className="font-noto font-semibold text-[#cfd2d0]">Settings</li>
          </Link> */}
        </ul>
        <div className="flex items-center gap-7">
          {/* <FaRegBell size={24} color="cfd2d0" /> */}
          <img
            className="size-10 rounded-full"
            src="/avatar.png"
            alt="avatar"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
