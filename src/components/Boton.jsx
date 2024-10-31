import '@fontsource/creepster';
import '@fontsource/nosifer';
import '@fontsource/unifrakturmaguntia';

function Boton({ url, children }) {
  return (
    <div className="flex justify-center">
      <a
        href={url}
        className="bg-orange-600 hover:bg-orange-800 text-black font-bold py-6 px-12 mt-12
                flex items-center gap-3 text-3xl rounded-xl transform transition-all ease-in-out hover:scale-110  
                shadow-lg hover:shadow-orange-900/50 font-unifraktur">
        {children}
      </a>
    </div>
  );
}

export default Boton;
