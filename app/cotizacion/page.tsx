'use client';

import {
  RideButton,
  RideCheckbox,
  RideLink,
  RideSelect,
  RideTag,
  RideTextField,
} from '@rimac-seguros/ride-system-components';
import {useRouter} from 'next/navigation';
import {type ChangeEvent, type FormEvent, useState} from 'react';
import Image from 'next/image';

import cotizacionImg from '../assets/cotizacion.png';
import {PageHeader} from '../components/PageHeader';
import {appStore, type User, USER_ENDPOINT} from '../lib/store';

type DocumentType = 'DNI' | 'CE';

const DOCUMENT_OPTIONS = [
  {value: 'DNI', label: 'DNI'},
  {value: 'CE', label: 'CE'},
];

const onlyDigits = (value: string, max: number) =>
  value.replace(/\D/g, '').slice(0, max);

const getInputValue = (e: ChangeEvent<HTMLInputElement>) => e.target.value;

export default function CotizacionPage() {
  const router = useRouter();
  const [documentType, setDocumentType] = useState<DocumentType>('DNI');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptCommunications, setAcceptCommunications] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isDniValid = /^\d{8}$/.test(dni);
  const isPhoneValid = /^\d{9}$/.test(phone);
  const isFormValid =
    isDniValid && isPhoneValid && acceptPrivacy && acceptCommunications;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError(null);

    if (!isFormValid) return;

    setLoading(true);
    try {
      const res = await fetch(USER_ENDPOINT);
      if (!res.ok) throw new Error('Error de servicio');

      const user: User = await res.json();
      appStore.setUser({...user, documentNumber: dni, phone});
      router.push('/productos');
    } catch (err) {
      console.error(err);
      setServerError(
        'Ocurrió un error al consultar los servicios. Inténtalo nuevamente.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <PageHeader/>

      <main
        className="max-w-[1200px] mx-auto px-6 py-10 flex gap-12 items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="hidden md:flex flex-1 justify-center items-center">
          <Image
            src={cotizacionImg}
            alt="Familia protegida por Rimac"
            className="max-h-[520px] w-auto object-cover rounded-3xl shadow-lg"
            priority
          />
        </div>

        <div className="flex-1 max-w-[460px]">
          <RideTag case="success" type="strong" text="Seguro Salud Flexible"/>
          <h1 className="text-[40px] font-bold leading-tight text-[#1D1D1B] mt-4 mb-2">
            Creado para ti y
            <br/>
            tu familia
          </h1>
          <p className="text-[#4F4F4F] text-base mb-8 leading-relaxed">
            Tú eliges cuánto pagar. Ingresa tus datos, elige tu plan y disfruta de
            cobertura sin límites
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-stretch gap-0">
              <div className="w-[110px] shrink-0">
                <RideSelect
                  label="Documento"
                  options={DOCUMENT_OPTIONS}
                  value={documentType}
                  onSelect={(option) => setDocumentType(option.value as DocumentType)}
                  required
                />
              </div>
              <div className="flex-1 [&_label]:invisible">
                <RideTextField
                  label="."
                  placeholder="87654321"
                  type="tel"
                  inputMode="numeric"
                  maxLength={8}
                  value={dni}
                  onChange={(e) => setDni(onlyDigits(getInputValue(e), 8))}
                  error={submitted && !isDniValid}
                  errorMessage={
                    submitted && !isDniValid
                      ? 'El documento debe tener 8 dígitos numéricos'
                      : undefined
                  }
                  required
                />
              </div>
            </div>

            <RideTextField
              label="Celular"
              placeholder="987654321"
              type="tel"
              inputMode="numeric"
              maxLength={9}
              value={phone}
              onChange={(e) => setPhone(onlyDigits(getInputValue(e), 9))}
              error={submitted && !isPhoneValid}
              errorMessage={
                submitted && !isPhoneValid
                  ? 'El celular debe tener 9 dígitos numéricos'
                  : undefined
              }
              required
            />

            <div className="space-y-3">
              <RideCheckbox
                checked={acceptPrivacy}
                onChange={(e) => setAcceptPrivacy(e.target.checked)}
                error={submitted && !acceptPrivacy}
              >
                Acepto la Política de Privacidad
              </RideCheckbox>
              <RideCheckbox
                checked={acceptCommunications}
                onChange={(e) => setAcceptCommunications(e.target.checked)}
                error={submitted && !acceptCommunications}
              >
                Acepto la Política de Comunicaciones Comerciales
              </RideCheckbox>
              <p className="text-sm font-semibold text-[#1D1D1B]">
                <RideLink
                  href="#"
                  size="small"
                  text="Aplican Términos y Condiciones."
                  onClick={(e) => e.preventDefault()}
                />
              </p>
            </div>

            {serverError && <p className="text-sm text-[#E11B22]">{serverError}</p>}

            <div className="pt-2">
              <RideButton
                type="submit"
                text={loading ? 'Cargando...' : 'Cotiza aquí'}
                size="x-large"
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
