import { HiSwitchVertical } from "react-icons/hi";

function Sort({ sort, setSort, setToggle, values }) {
  return (
    <div className="flex  w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
      <div className="flex w-full flex-shrink-0 gap-2 items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
        <label htmlFor="sort" className="my-auto">
          Sort
        </label>
        <select
          value={sort}
          className="cursor-pointer px-2 py-1"
          name="sort"
          id="sort"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default</option>
          {values.map(val =>
            <option key={val} value={val}>{val}</option>
          )}
        </select>
        <HiSwitchVertical
          className="h-10 w-10 cursor-pointer text-main"
          onClick={() => setToggle((prev) => (prev == '+' ? '-' : '+'))}
        />
      </div>
    </div>
  );
}

export default Sort;
