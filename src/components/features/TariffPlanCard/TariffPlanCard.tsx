import { Button, SectionCard, SelectedIcon } from '../../ui';
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
}

export function TariffPlanCard({ plan }: TariffPlanCardProps) {
  return (
    <SectionCard as="article" className="flex h-full flex-col p-4 sm:p-5" divider={false}>
      <h3 className="mb-5 text-[24px] leading-[1.05] font-semibold text-white">{plan.title}</h3>
      <div className={tariffPlanCardPriceRowStyles}>
        <span className="text-[22px] font-semibold text-white/55 line-through sm:text-[34px]">{plan.oldPrice}</span>
        <span className="text-[28px] font-semibold text-white sm:text-[40px]">{plan.price}</span>
        <span className="pb-1 text-lg text-white/90">/ {plan.per}</span>
      </div>
      <p className="mb-4 text-sm text-white/70">15% скидка новому пользователю</p>
      <div className="mb-5 h-px w-full bg-white/15" />

      <div className={tariffPlanCardFeatureListStyles}>
        {plan.features.map((feature) => (
          <div className="flex items-center gap-3" key={feature.label}>
            <span className={`inline-flex items-center text-[18px] ${feature.included ? 'text-[#0EB8D2]' : 'text-white/65'}`}>
              {feature.included ? <SelectedIcon className="h-[18px] w-[26px]" /> : '⌂'}
            </span>
            <span className={feature.included ? 'text-white/85' : 'text-white/65'}>{feature.label}</span>
          </div>
        ))}
      </div>

      <Button className="mt-auto w-full">Выбрать</Button>
    </SectionCard>
  );
}
