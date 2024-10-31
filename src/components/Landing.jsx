import Boton from './Boton';
import Descripcion from './Descripcion';
import Header from './Header';
import '../index.css';

export const Landing = () => {
  return (
    <div className="h-screen bg-[url('img/Fondo.png')] bg-cover bg-center bg-no-repeat">
      <Header />
      <Descripcion />
      <div className="flex gap-4 justify-center">
        <Boton url="/patron">Patron</Boton>
        <Boton url="/gestos">Gestos</Boton>
        <Boton url="/puzzle">Puzzle</Boton>
      </div>
    </div>
  );
};
