import { useState } from 'react';
import type { ProductVariant, VariantOption } from '../types/index';

export function useProductVariants(variants: ProductVariant[] = []) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string | number, VariantOption>>(() => {
    const initial: Record<string | number, VariantOption> = {};
    variants.forEach((variant) => {
      if (variant.options && variant.options.length > 0) {
        initial[variant.id] = variant.options[0];
      }
    });
    return initial;
  });

  const handleSelectOption = (variantId: string | number, option: VariantOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [variantId]: option,
    }));
  };

  const calculateTotalPrice = (basePrice: number) => {
    return Object.values(selectedOptions).reduce((total, option) => {
      return total + (option.priceDifference || 0);
    }, basePrice);
  };

  return {
    selectedOptions,
    handleSelectOption,
    calculateTotalPrice,
  };
}