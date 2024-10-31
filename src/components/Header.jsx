import logo from '../img/logo.png';
import '@fontsource/creepster';
import '@fontsource/nosifer';
import '@fontsource/unifrakturmaguntia';

function Header() {
  return (
    <div className="bg-orange-500 h-1/5 w-screen flex items-center justify-around border-solid border-2 border-black">
      <img src={logo} alt="Logo" className="h-2/3 md:h-full p-4" />
      <h1 className="text-3xl md:text-5xl font-nosifer text-center">
        Escape Puzzle
      </h1>
      <img src={logo} alt="Logo" className="h-2/3 md:h-full p-4" />
    </div>
  );
}

export default Header;
