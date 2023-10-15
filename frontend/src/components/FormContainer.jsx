/* eslint-disable react/prop-types */
function FormContainer({ children }) {
  return (
    <div className="container h-screen">
      <div className="grid h-full grid-cols-12 items-center">
        <div className="col-span-12 p-3 shadow-xl md:col-span-8 md:col-start-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FormContainer;
