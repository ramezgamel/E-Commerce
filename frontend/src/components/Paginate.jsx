/* eslint-disable react/prop-types */
function Paginate({ pages, pageNum, setPage }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="mt-2 inline-flex -space-x-px text-sm">
        <li>
          {pageNum > 1 && 
          <button
            onClick={() => setPage(pageNum - 1)}
            className="flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-slate-50 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:disabled:bg-slate-300 dark:disabled:text-slate-50"
            disabled={pageNum == 1}
          >
            Previous
          </button>}
        </li>
        {[...Array(pages).keys()].map((x) => (
          <li key={x}>
            <button
              className={`${
                pageNum == x + 1
                  ? 'bg-blue-400 text-white dark:bg-violet-800'
                  : 'bg-slate-50'
              } flex h-8 items-center justify-center border border-gray-300 px-3  leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              onClick={() => setPage(x + 1)}
            >
              {x + 1}
            </button>
          </li>
        ))}
        {pageNum < pages && 
        <li>
          <button
            onClick={() => setPage(pageNum + 1)}
            disabled={pageNum == pages}
            className="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-slate-50 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:disabled:bg-slate-300 dark:disabled:text-slate-50"
          >
            Next
          </button>
        </li>
        }
      </ul>
    </nav>
  );
}

export default Paginate;
