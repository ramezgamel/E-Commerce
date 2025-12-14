import Footer from '../../components/layout/Footer';
import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';
function App() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="p-3 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
