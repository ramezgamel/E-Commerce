import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "./Loader";

function Table({ headers, isLoading, error, children }) {
  return (
    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <TableHeaders headers={headers} />
      <tbody>
        {isLoading ?
          <tr colSpan={headers.length}>
            <td colSpan={headers.length} className="h-[250px] ">
              <Loader />
            </td>
          </tr>
          : error ? <tr colSpan={headers.length}>
            <td colSpan={headers.length} >
              <div role="info" className="alert">
                {error.error || 'Something went wrong'}
              </div>
            </td>
          </tr> : <>{children}</>}
      </tbody>
    </table>
  );
}
export const EditBtn = ({ handleEdit }) => {
  return <button
    onClick={handleEdit}
    className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-400"
  >
    <FaEdit />
  </button>;
};
const TableHeaders = ({ headers }) => {
  return <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
    <tr className="text-center">
      {headers.map((head, i) => <th key={i} scope="col" className="p-2">
        {head.toUpperCase()}
      </th>
      )}
      <th scope="col" className="p-2">
        <span className="sr-only">Actions</span>
      </th>
    </tr>
  </thead>;
};
export const DeleteBtn = ({ deleteFn, id }) => {
  return <button
    className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-400"
    onClick={() => deleteFn(id)}
  >
    <FaTrash />
  </button>;
};
export default Table;
