import React from "react";

const numnum = num => num <= 9 ? "0"+num : String(num);

const ImageLink = props => {
  // This components requires following options:
  // a. goal: goal, short, image_src, isSelected
  // b. onClick: function to pass to onClick
  // c. disabled: a boolean to disable to not
  // d. className: A className to format the tiles
  const { goal, onClick, disabled, className } = props;
  return (
    <input
      width="100%"
      id={"Goal-" + numnum(goal.goal)}
      type="image"
      src={goal.image_src}
      name={goal.goal}
      alt={goal.short}
      onClick={onClick}
      className={className}
      disabled={disabled}
    />
  );
};

export default ImageLink;
