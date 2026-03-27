import { useId } from 'react';
import { Button, Card, SelectedIcon } from '../../ui';
import lockSvg from '../../../assets/icons/lock.svg';
import {
  tariffPlanCardFeatureListStyles,
  tariffPlanCardPriceRowStyles,
} from './TariffPlanCard.styles';

export interface TariffPlanCardFeature {
  label: string;
  included: boolean;
}

export interface TariffPlanCardData {
  title: string;
  oldPrice: string;
  price: string;
  per: string;
  features: TariffPlanCardFeature[];
}

export interface TariffPlanCardProps {
  plan: TariffPlanCardData;
  onSelect?: (plan: TariffPlanCardData) => void;
}

export function TariffPlanCard({ plan, onSelect }: TariffPlanCardProps) {
  const gradientId = useId();

  return (
    <Card as="article" className="flex h-full flex-col" variant="tariff">
      <h3 className="text-[16px] lg:text-[24px] leading-[1.05] font-semibold text-white">{plan.title}</h3>
      <div className="">
        <div className={tariffPlanCardPriceRowStyles}>
          <span className="text-[24px] lg:text-[36px] font-semibold text-[#FDFEFF]/80 line-through">{plan.oldPrice}</span>
          <span className="text-[24px] lg:text-[36px] font-semibold text-white">{plan.price}</span>
          <span className="text-[16px] lg:text-[24px] text-[#FDFEFF]/80">/ {plan.per}</span>
        </div>
        <p className="text-[16px] lg:text-[18px] text-[#FDFEFF]">15% скидка новому пользователю</p>
      </div>
      <svg className="h-auto w-full" width="591" height="6" viewBox="0 0 591 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M0.001302 2.66699C0.00130213 4.13975 1.19521 5.33366 2.66797 5.33366C4.14073 5.33366 5.33464 4.13975 5.33464 2.66699C5.33464 1.19423 4.14073 0.000325313 2.66797 0.000325441C1.19521 0.00032557 0.00130188 1.19423 0.001302 2.66699ZM2.66797 2.66699L2.66797 3.16699L590.668 3.16694L590.668 2.66694L590.668 2.16694L2.66797 2.66699L2.66797 2.66699Z"
          fill={`url(#tariff_plan_line_${gradientId})`}
        />
        <defs>
          <linearGradient id={`tariff_plan_line_${gradientId}`} x1="2.66797" y1="3.16699" x2="590.668" y2="3.16694" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="#1A1A1A" />
          </linearGradient>
        </defs>
      </svg>

      <div className={tariffPlanCardFeatureListStyles}>
        {plan.features.map((feature) => (
          <div className="flex items-center gap-3" key={feature.label}>
            <span className="inline-flex items-center text-[18px] text-[#0EB8D2]">
              {feature.included ? (
                <SelectedIcon className="h-auto w-[19px]" />
              ) : (
                <img src={lockSvg} alt="" className="" aria-hidden />
              )}
            </span>
            <span className="text-[#FDFEFF]">{feature.label}</span>
          </div>
        ))}
      </div>

      <Button className="mt-auto w-full" onClick={() => onSelect?.(plan)}>Выбрать</Button>
    </Card>
  );
}
