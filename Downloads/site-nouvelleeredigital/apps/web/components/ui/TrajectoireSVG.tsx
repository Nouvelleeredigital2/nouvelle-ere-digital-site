import React from 'react';

interface TrajectoireSVGProps {
  trajectories: Array<{ id: string; points: Array<{ x: number; y: number }>; color: string }>;
  variant: 'line' | 'path' | 'animated';
  onSelect: (id: string) => void;
}

export const TrajectoireSVG: React.FC<TrajectoireSVGProps> = ({
  trajectories,
  variant,
  onSelect,
}) => {
  return (
    <svg className="w-full h-full">
      {trajectories.map((trajectory) => (
        <polyline
          key={trajectory.id}
          points={trajectory.points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke={trajectory.color}
          strokeWidth="2"
          className={variant === 'animated' ? 'animate-draw' : ''}
          onClick={() => onSelect(trajectory.id)}
        />
      ))}
    </svg>
  );
};
