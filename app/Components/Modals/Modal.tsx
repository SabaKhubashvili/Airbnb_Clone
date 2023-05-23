  "use client";
import React, { useCallback } from "react";
import {IoMdClose} from 'react-icons/io'
import { MainButton } from "../Buttons";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  actionLabel:string
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  disabled,
  actionLabel,
  secondaryAction,
  secondaryLabel,
}: Props) => {

    const [showModal, setShowModal] = React.useState(isOpen);
  
  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <React.Fragment>
      <div
        className="flex justify-center items-center h-screen 
                        overflow-x-hidden overflow-y-auto inset-0 fixed  z-[100] outline-none focus:outline-none
                      bg-neutral-800/70"
      >
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto">
          {/* Content */}
          <div
            className={`translate duration-300 h-full 
                        ${showModal ? "translate-y-0" : "translate-y-full"}
                        ${showModal ? "opacity-100" : "opacity-0"}
                        `}
          >
            <div className="translate h-full md:h-auto border-0 rounded-lg 
            shadow-lg relative flex flex-col w-full bg-white focus:outline-none">

                    {/* HEADER */}
                    <div className="flex items-center p-6 rounded-t justify-center border-b-[1px]">
                        <button onClick={handleClose} className="p-1 border-0 outline-none hover:opacity-70 transition absolute left-9">
                            <IoMdClose size={18}/>
                        </button>
                        <div className="text-lg font-semibold">
                            {title}
                        </div>
                    </div>
                    {/* BODY */}
                    <div className="relative p-6 flex-auto">
                        {body}
                    </div>
                    {/* FOOTER */}
                    <div className="flex flex-col gap-2 p-6">
                        <div className="flex flex-row items-center gap-4 w-full">
                            <MainButton label={actionLabel} disabled={disabled}   onClick={handleSubmit} />
                            { secondaryAction && secondaryLabel &&

                                <MainButton label={secondaryLabel} disabled={disabled} outline  onClick={handleSecondaryAction} />
                            }
                        </div>  
                        {footer}
                    </div>
            </div>
         
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
