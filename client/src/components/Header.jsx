const Header = () => {
  return (
    <header className="bg-purple-900  p-2 sticky flex w-full justify-between items-center-safe top-0">
      <a href="#">
        <h1 className="font-extrabold text-3xl text-neutral-50 h-full p-2 rounded-lg underline decoration-neutral-50 tracking-wide">
          BolgZ.
        </h1>
      </a>

      <div className="flex justify-center-safe items-center-safe gap-5 mr-5">
        <a href="#">
          <button className="bg-gray-950 text-xl rounded-3xl p-2 cursor-pointer">
            😃
          </button>
        </a>
        <a href="#">
          <button className="bg-orange-500 px-5 py-2 text-xl rounded-xl cursor-pointer">
            Register!
          </button>
        </a>
        <a href="#">
          <button className="bg-neutral-50 text-orange-500 px-5 py-2 text-xl rounded-xl cursor-pointer">
            Login
          </button>
        </a>
      </div>
    </header>
  );
};

export default Header;
