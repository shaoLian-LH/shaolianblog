import React, { FC } from "react";
import './empty.scss';

interface IEmptyProps {
  emptyTitle?: string,
  content?: any
}

const Empty: FC<IEmptyProps> = (props) => {

  const {
    emptyTitle,
    content
  } = props;

  return(
    <div className = "empty-div">
      <p className = "empty-hint">QAQ</p>
      <p className = "empty-p">
        { emptyTitle !== undefined ? emptyTitle:'没有任何数据呢' }
      </p>
      {
        content ?
        <div className = "empty-content">
          {
            content
          }
        </div>
        : ''
      }
    </div>
  )
}
export default Empty;