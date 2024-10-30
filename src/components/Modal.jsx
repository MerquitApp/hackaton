export const Modal = ({ isOpen, children }) => {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${isOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-black/20`}>
      <div className="relative p-4 w-full max-w-2xl max-h-full mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};
