/* eslint-disable react/prop-types */
import { Pagination } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
function Paginate({ pages, pageNum, setPage }) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === pageNum}
            onClick={() => setPage(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
