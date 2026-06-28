// hooks/useBreadcrumb.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "@/store/common/breadcurmb";

const useBreadcrumb = (items) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumb(items));
  }, []);
};

export default useBreadcrumb;