import React from 'react';
import Icon from '../Icon';

function AddSegmentRow() {
  return (
    <div className="flex">
      <div className="w-[28px] h-[28px]"></div>
      <div className="group ml-0.5 mt-1">
        <div className="text-primary-active flex group-hover:bg-secondary-dark items-center rounded-sm pr-2">
          <div className="w-[28px] h-[28px] grid place-items-center">
            <Icon name="icon-add" />
          </div>
          <span className="text-[13px]">Add Segment</span>
        </div>
      </div>
    </div>
  );
}

export default AddSegmentRow;