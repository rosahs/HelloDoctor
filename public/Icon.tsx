import React from 'react';

interface IconProps {
  id: string; // The id of the symbol in the sprite
  width?: number;
  height?: number;
}

const Icon: React.FC<IconProps> = ({ id, width = 24, height = 24 }) => {
  return (
    <svg width={width} height={height} aria-hidden="true">
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
};

export default Icon;