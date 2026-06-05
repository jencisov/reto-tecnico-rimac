import {RideGlTelephoneSolid, RideLogoRimac} from '@rimac-seguros/ride-system-components';

export function PageHeader() {
  return (
    <header className="px-6 py-4">
      <div className="max-w-[1360px] mx-auto flex justify-between items-center">
        <RideLogoRimac orientation="horizontal"/>
        <div className="flex items-center gap-4">
          <p>¡Compra por este medio!</p>
          <a
            href="tel:014116001"
            className="text-sm text-[#4F4F4F] flex items-center gap-1 font-medium"
          >
            <RideGlTelephoneSolid/>
            (01) 411 6001
          </a>
        </div>
      </div>
    </header>
  );
}

