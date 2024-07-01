import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="flex flex-col">
      <main className="p-3 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
  