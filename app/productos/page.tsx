'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {RideIcAddUserLight, RideIcProtectionLight,} from '@rimac-seguros/ride-system-components';

import {PageHeader} from '../components/PageHeader';
import {StepNav} from '../components/StepNav';
import {calculateAge} from '../lib/age';
import {appStore, type Audience, DISCOUNT_FOR_OTHERS, type Plan, PLANS_ENDPOINT,} from '../lib/store';
import {ForWhomCard} from './components/ForWhomCard';
import {PlanCard} from './components/PlanCard';

export default function ProductosPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [audience, setAudience] = useState<Audience | null>('para-ti');

  const user = appStore.getUser();
  const userAge = calculateAge(user?.birthDay);

  useEffect(() => {
    if (!user) router.replace('/cotizacion');
  }, [user, router]);

  useEffect(() => {
    if (!audience) return;

    const applyPlans = (list: Plan[]) => {
      setPlans(userAge > 0 ? list.filter((p) => p.age >= userAge) : list);
      setLoading(false);
    };

    const cached = appStore.getPlans();
    if (cached.length > 0) {
      applyPlans(cached);
      return;
    }

    setLoading(true);
    fetch(PLANS_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        const list: Plan[] = data.list ?? [];
        appStore.setPlans(list);
        applyPlans(list);
      })
      .catch(() => {
        setPlans([]);
        setLoading(false);
      });
  }, [audience, userAge]);

  const getFinalPrice = (price: number) =>
    audience === 'para-alguien-mas'
      ? Number((price * (1 - DISCOUNT_FOR_OTHERS)).toFixed(2))
      : price;

  const handleSelectPlan = (plan: Plan) => {
    if (!audience) return;

    appStore.setSelectedPlan({
      ...plan,
      originalPrice: plan.price,
      price: getFinalPrice(plan.price),
      audience,
    });
    router.push('/resumen');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <PageHeader/>
      <StepNav currentStep={0}/>

      <main className="max-w-[1360px] mx-auto px-6 py-10 flex flex-col items-center text-center">
        <h1 className="text-[32px] font-bold text-[#1D1D1B] mb-2">
          {user.name ?? 'Hola'}, ¿Para quién deseas <br/>cotizar?
        </h1>
        <p className="text-[#4F4F4F] text-sm mb-8">
          Selecciona la opción que se ajuste más a tus necesidades.
        </p>

        <div className="flex gap-3 mb-8 justify-center">
          <ForWhomCard
            value="para-ti"
            selected={audience}
            title="Para mí"
            description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
            icon={<RideIcProtectionLight/>}
            width={140}
            onSelect={setAudience}
          />
          <ForWhomCard
            value="para-alguien-mas"
            selected={audience}
            title="Para alguien más"
            description="Realiza una cotización para uno de tus familiares o cualquier persona."
            icon={<RideIcAddUserLight/>}
            width={164}
            onSelect={setAudience}
          />
        </div>

        {audience && (loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#E11B22] border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8 w-full justify-items-center">
            {plans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                finalPrice={getFinalPrice(plan.price)}
                onSelect={handleSelectPlan}
              />
            ))}
          </div>
        ))}
      </main>
    </div>
  );
}
