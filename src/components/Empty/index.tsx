import React, { FC } from "react";
import './empty.scss';

interface IEmptyProps {
  emptyTitle?: string
}

const Empty: FC<IEmptyProps> = (props) => {
  return(
    <div className = "empty-div">
      <p className = "empty-hint">QAQ</p>
      <p className = "empty-p">
        { props.emptyTitle !== undefined?props.emptyTitle:'没有任何数据呢' }
      </p>
    </div>
  )
}
export default Empty;