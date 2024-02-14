/* eslint-disable react/prop-types */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function Model({ children, show, setShow, header }) {
  const handleClose = () => {
    setShow(false)
  }
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle text-main shadow-xl transition-all dark:bg-gray-800">
                  <span
                    className="absolute right-4 top-1  cursor-pointer p-1 text-main"
                    onClick={handleClose}
                  >
                    X
                  </span>
                  <Dialog.Title
                    as="h3"
                    className="bd border-b pb-3 text-center text-lg font-medium leading-6 text-main"
                  >
                    {header}
                  </Dialog.Title>
                  <div className="mt-2 bg-slate-50 dark:bg-gray-800">
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Model;
