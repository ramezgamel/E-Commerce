/* eslint-disable react/prop-types */
function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <ol className="flex w-full items-center p-0 text-rcenter text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
      <li className="after:border-1 flex items-center  after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-blue-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
        {step1 ? (
          <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg
              className="mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          </span>
        ) : (
          <span className="mr-2">1</span>
        )}
        <span className={`${step1 ? 'text-blue-600' : 'text-gray-200'}`}>
          Login
        </span>
      </li>
      <li className="after:border-1 flex items-center  after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-blue-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
          {step2 ? (
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <svg
                className="mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            </span>
          ) : (
            <span className="mr-2">2</span>
          )}
          <span className={`${step2 ? 'text-blue-600' : 'text-gray-200'}`}>
            Shipping
          </span>
        </span>
      </li>
      <li className="after:border-1 flex items-center  after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-blue-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
          {step3 ? (
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <svg
                className="mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            </span>
          ) : (
            <span className="mr-2 text-main">3</span>
          )}
          <span className={`${step3 ? 'text-blue-600' : 'text-gray-200'}`}>
            Payment
          </span>
        </span>
      </li>
      <li className="flex items-center">
        {step4 ? (
          <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg
              className="mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          </span>
        ) : (
          <span className="mr-2 text-main">4</span>
        )}
        <span className={`${step4 ? 'text-blue-600' : 'text-gray-200'}`}>
          Place Order
        </span>
      </li>
    </ol>
  );
}
{
  /* <div className="text-main flex justify-between w-full">
      <div>
        {step1 ? (
          // <Link role="button" to="/login" disabled className="text-main disabled:text-gray-300">
          //   <Nav.Link>Login</Nav.Link>
          // </Link>
          <button disabled={true} className="text-main disabled:text-gray-200 disabled:cursor-not-allowed">
            <Link to="/login" disabled='disabled' className="disabled:text-gray-400">Login</Link>
          </button>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </div>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </div> */
}
export default CheckoutSteps;
