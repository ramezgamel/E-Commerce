import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="flex mt-16 h-screen justify-between flex-col">
        <main className="p-3">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
}

export default App;
