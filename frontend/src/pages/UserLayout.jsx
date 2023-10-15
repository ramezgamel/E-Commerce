import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="flex h-screen flex-col justify-between bg-back">
      <Header />
      <main className="p-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
