import React from "react";

export const FormContainer = ({ children,mxw }) => {
  return (
    <div className={`bg-gray-200  h-full min-h-[100dvh] bg-cover bg-fixed`}
    >
      <div className={`${mxw == true ? "" : "max-w-6xl"}  mx-auto`}>
        <div className={` px-[3%]  md:px-0 pt-[18%] md:pt-[8.4%]`}>
          {children}
        </div>
      </div>
    </div>
  );
};
