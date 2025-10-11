import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Media } from './Media';
import { Text } from './Text';

type Variant = 'loop' | 'once' | 'hover';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface HeroCinemagraphProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  variant?: Variant;
  animated?: boolean;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onPlay?: () => void;
  onPause?: () => void;
  className?: string;
}

export const HeroCinemagraph: React.FC<HeroCinemagraphProps> = ({
  src,
  alt,
  title,
  subtitle,
  variant = 'loop',
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onPlay,
  onPause,
  className,
}) => {
  const [state, setState] = useState<State>('default');
  const [isPlaying, setIsPlaying] = useState(animated);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    }
  };

  const variants: Record<Variant, string> = {
    loop: 'loop',
    once: '',
    hover: 'hover:animate-pulse',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'opacity-90',
    active: 'scale-105',
    focus: 'ring-2 ring-[var(--color-primary)]',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'border-2 border-[var(--color-primary)]',
    invalid: 'border-2 border-red-500',
    dragging: 'cursor-grabbing',
  };

  return (
    <div
      className={cn(
        'relative bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] overflow-hidden',
        stateClasses[state],
        className
      )}
      role="img"
      aria-label={alt}
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      <Media src={src} alt={alt} className="w-full h-96 object-cover" ref={videoRef} />
      {(title || subtitle) && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
          {title && <Text size="2xl" className="text-white font-bold mb-2">{title}</Text>}
          {subtitle && <Text size="lg" className="text-white">{subtitle}</Text>}
        </div>
      )}
      <button onClick={isPlaying ? handlePause : handlePlay} className="absolute bottom-4 right-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};
