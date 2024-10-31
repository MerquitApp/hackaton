import Boton from './Boton';
import Descripcion from './Descripcion';
import Header from './Header';
import '../index.css';

export const Landing = () => {
  return (
    <div className="h-screen bg-[url('img/Fondo.png')] bg-cover bg-center bg-no-repeat">
      <Header />
      <Descripcion />
      <Boton />
    </div>
  );
};
