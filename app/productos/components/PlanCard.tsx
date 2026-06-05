import {
  RideButton,
  RideCardSelector,
  RideIcHomeLight,
  RideIcHospitalLight,
} from '@rimac-seguros/ride-system-components';
import type {Plan} from '../../lib/store';

const getPlanIcon = (planName: string) =>
  /cl[íi]nica/i.test(planName) ? <RideIcHospitalLight/> : <RideIcHomeLight/>;

interface Props {
  plan: Plan;
  finalPrice: number;
  onSelect: (plan: Plan) => void;
}

export function PlanCard({plan, finalPrice, onSelect}: Props) {
  const hasDiscount = finalPrice !== plan.price;
  const handleSelect = () => onSelect(plan);

  return (
    <button type="button" className="cursor-pointer text-left w-[224px]" onClick={handleSelect}>
      <RideCardSelector paddingSize="large" control={<div/>}>
        <div className="flex flex-col gap-3 pb-2 w-[192px]">
          <div className="flex items-start justify-between text-start">
            <div>
              <h6 className="text-2xl font-bold text-[#1D1D1B]">{plan.name}</h6>
              <p className="text-xs text-[#4F4F4F] uppercase tracking-wide font-medium mb-1">
                COSTO DEL PLAN
              </p>
              {hasDiscount && (
                <p className="text-sm text-[#4F4F4F] line-through">
                  S/ {plan.price.toFixed(2)} al mes
                </p>
              )}
              <p className="text-2xl font-bold text-[#1D1D1B]">
                S/ {finalPrice.toFixed(2)}{' '}
                <span className="text-sm font-normal text-[#4F4F4F]">/mes</span>
              </p>
            </div>
            <div className="w-10 h-10">{getPlanIcon(plan.name)}</div>
          </div>

          <div className="h-px bg-[#E4E8EF]"/>

          <ul className="space-y-2 text-start">
            {plan.description.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-[#4F4F4F] leading-snug break-words whitespace-normal"
              >
                * {item}
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <RideButton fullWidth onClick={handleSelect} text="Seleccionar Plan"/>
          </div>
        </div>
      </RideCardSelector>
    </button>
  );
}

