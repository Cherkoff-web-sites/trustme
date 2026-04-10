import { cn } from '../../../lib/cn';
import { Button, Card, CardHeaderDecorDivider, SelectedIcon } from '../../ui';
import { cardInsetAccentHoverStyles } from '../../ui/Card/Card.styles';
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
  return (
    <Card as="article" className={cn('flex h-full flex-col', cardInsetAccentHoverStyles)} variant="tariff">
      <h3 className="text-[16px] lg:text-[24px] leading-[1.05] font-semibold text-white">{plan.title}</h3>
      <div className="">
        <div className={tariffPlanCardPriceRowStyles}>
          <span className="text-[24px] lg:text-[36px] font-semibold text-[#FDFEFF]/80 line-through">{plan.oldPrice}</span>
          <span className="text-[24px] lg:text-[36px] font-semibold text-white">{plan.price}</span>
          <span className="text-[16px] lg:text-[24px] text-[#FDFEFF]/80">/ {plan.per}</span>
        </div>
        <p className="text-[16px] lg:text-[18px] text-[#FDFEFF]">15% скидка новому пользователю</p>
      </div>
      <CardHeaderDecorDivider />

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
