'use client';

import {RideButton, RideGlBack, RideIconButton, RideStepper,} from '@rimac-seguros/ride-system-components';
import {useRouter} from 'next/navigation';

const STEPS = [{title: 'Planes y coberturas'}, {title: 'Resumen'}];

interface Props {
  currentStep: 0 | 1;
  backHref?: string;
}

export function StepNav({currentStep, backHref = '/cotizacion'}: Props) {
  const router = useRouter();
  const goBack = () => router.push(backHref);

  return (
    <>
      <div className="bg-[#EDEFFC] px-6 py-2">
        <div className="max-w-[1360px] mx-auto flex justify-center">
          <RideStepper
            steps={STEPS}
            currentStep={currentStep}
            orientation="horizontal"
          />
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 pt-6 flex items-center gap-2">
        <RideIconButton glyph={<RideGlBack/>} variant="outline" onClick={goBack}/>
        <RideButton text="Volver" variant="text-primary" onClick={goBack}/>
      </div>
    </>
  );
}

