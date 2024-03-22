import { Loader2, Trash2 } from "lucide-react";
import React from "react";

export const ButtonForm = ({formik,title,icon}) => {
  return (
    <button
      type="submit"
      className={`w-full px-2 py-2 flex items-center justify-center hover:bg-white hover:text-black transition-colors ${icon ? 'bg-red-500' : 'bg-black'} text-white rounded-md`}
    >
      {formik?.isSubmitting ? (
        <Loader2 className="animate-spin animate-infinite" />
      ) : (
        <>
        {title}
        {icon !== null && icon == true ? <Trash2 className="ml-3" /> : ""}
        </>
      )}
    </button>
  );
};
