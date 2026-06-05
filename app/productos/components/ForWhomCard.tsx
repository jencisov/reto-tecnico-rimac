import {RideCardSelector, RideRadioButton} from '@rimac-seguros/ride-system-components';
import type {ReactNode} from 'react';
import type {Audience} from '../../lib/store';

interface Props {
  value: Audience;
  selected: Audience | null;
  title: string;
  description: string;
  icon: ReactNode;
  width: number;
  onSelect: (audience: Audience) => void;
}

export function ForWhomCard({
                              value,
                              selected,
                              title,
                              description,
                              icon,
                              width,
                              onSelect,
                            }: Props) {
  const handleSelect = () => onSelect(value);

  return (
    <button type="button" className="cursor-pointer text-left" onClick={handleSelect}>
      <RideCardSelector
        paddingSize="x-large"
        control={
          <RideRadioButton
            checked={selected === value}
            onChange={handleSelect}
            name="audience"
            value={value}
          />
        }
      >
        <div className="flex flex-col items-start px-1 pb-1" style={{width}}>
          {icon}
          <span className="headline-13-black text-start">{title}</span>
          <p className="paragraph-7-reg text-start">{description}</p>
        </div>
      </RideCardSelector>
    </button>
  );
}

