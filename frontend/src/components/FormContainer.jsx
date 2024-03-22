/* eslint-disable react/prop-types */
function FormContainer({ children }) {
  return (
    <div className="container min-h-screen pt-32 px-10">
      <div className="relative border border-slate-700 sm:w-3/4 w-full max-w-xl mx-auto px-2 sm:px-16 rounded-3xl shadow-lg shadow-slate-700 py-5">
        {children}
      </div>
    </div>
  );
}

export default FormContainer;
