import React from "react";
import Skeleton from "react-loading-skeleton";

export default function Loading({ ...rest }) {
  return <Skeleton width={100} {...rest} />;
}
