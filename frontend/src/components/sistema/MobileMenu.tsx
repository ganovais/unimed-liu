import * as React from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NavigationLinks from "./NavigationLinks";

interface MobileMenuProps {
  open: boolean;
  onClose: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => (
  <Dialog className="lg:hidden" open={open} onClose={onClose}>
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />
    <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-lg">
      <div className="flex items-center justify-between">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
        </a>
        <button
          type="button"
          className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
          onClick={() => onClose(false)}
        >
          <span className="sr-only">Close menu</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            <NavigationLinks />
          </div>
          <div className="py-6">
            <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors duration-300"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
);

export default MobileMenu;
