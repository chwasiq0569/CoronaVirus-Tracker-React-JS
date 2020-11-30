import React from "react";

const ListItem = (props) => {
  const { onClickEvent, name, cases, styleClass } = props;
  return (
    <li className={styleClass} onClick={onClickEvent}>
      <span>{name}</span>
      <span>{cases}</span>
    </li>
  );
};
export default ListItem;
