import Features from '../components/Features';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="flex mt-16 h-screen justify-between flex-col">
      <div className='grid grid-cols-12'>
        <aside className='hidden md:block md:col-span-2 shadow-md'>
          <Features />
        </aside>
        <main className="p-3 col-span-10">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
