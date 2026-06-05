'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {RideGlFamilySolid} from '@rimac-seguros/ride-system-components';

import {PageHeader} from '../components/PageHeader';
import {StepNav} from '../components/StepNav';
import {appStore, type SelectedPlan, type User} from '../lib/store';

export default function ResumenPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<SelectedPlan | null>(null);

  useEffect(() => {
    const currentUser = appStore.getUser();
    const currentPlan = appStore.getSelectedPlan();

    if (!currentUser) {
      router.replace('/cotizacion');
      return;
    }
    if (!currentPlan) {
      router.replace('/productos');
      return;
    }

    setUser(currentUser);
    setPlan(currentPlan);
  }, [router]);

  if (!user || !plan) return null;

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <PageHeader/>
      <StepNav currentStep={1} backHref="/productos"/>

      <main className="max-w-[1360px] mx-auto px-6 py-10">
        <h1 className="text-[32px] font-bold text-[#1D1D1B] mb-1">
          Resumen del seguro
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 max-w-[900px]">
          <div className="flex-1 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E4E8EF] p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide font-bold text-[#1D1D1B]">
                  PRECIOS CALCULADOS PARA:
                </p>
                <p className="text-lg font-bold text-[#1D1D1B] mt-1 flex items-center gap-2">
                  <RideGlFamilySolid/> {user.name} {user.lastName}
                </p>
              </div>

              <div className="h-px bg-[#E4E8EF]"/>

              <div>
                <h3 className="font-semibold text-[#1D1D1B] mb-2">Responsable de pago</h3>
                <p className="text-sm text-[#4F4F4F]">
                  DNI: <span className="text-[#1D1D1B] font-medium">{user.documentNumber ?? '—'}</span>
                </p>
                <p className="text-sm text-[#4F4F4F]">
                  Celular: <span className="text-[#1D1D1B] font-medium">{user.phone ?? '—'}</span>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1D1D1B] mb-2">Plan elegido</h3>
                <p className="text-sm text-[#1D1D1B] font-medium">{plan.name}</p>
                <p className="text-sm text-[#4F4F4F] mt-1">
                  Costo del plan:{' '}
                  <span className="text-[#1D1D1B] font-medium">
                    ${plan.price} al mes
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
