import React, { useId } from 'react';
import { Plus, Minus, Trash2, ChevronDown } from 'lucide-react';
import { PRODUCT_QUANTITY_MAX, PRODUCT_QUANTITY_MIN, PRODUCT_SIZES } from '../../types/dailyLog';
import type { ProductEntry } from '../../types/dailyLog';
import { EmptyState } from '../common/AsyncState';
import { ProductIcon } from './ProductIcon';

interface DailyLogProductsUsedCardProps {
  products: ProductEntry[];
  onChangeProduct: (id: string, patch: Partial<Pick<ProductEntry, 'quantity' | 'size'>>) => void;
  onDeleteProduct: (id: string) => void;
  onOpenAddModal: () => void;
  disabled?: boolean;
}

export const DailyLogProductsUsedCard: React.FC<DailyLogProductsUsedCardProps> = ({
  products,
  onChangeProduct,
  onDeleteProduct,
  onOpenAddModal,
  disabled,
}) => {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="w-full bg-white rounded-[22px] p-5 sm:p-6 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap text-left">
        <h3 id={headingId} className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#68708A] flex items-center gap-1.5">
          <span>PRODUCTS USED</span>
          <span className="text-[#8A92A6] text-xs font-normal" aria-hidden="true">ⓘ</span>
        </h3>
        <button
          type="button"
          onClick={onOpenAddModal}
          disabled={disabled}
          aria-haspopup="dialog"
          className="px-4 min-h-[44px] rounded-full bg-[#FFF0F6] hover:bg-pink-100 text-[#C2185B] text-xs font-bold transition-colors border border-pink-200 flex items-center gap-1 shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Add another entry</span>
        </button>
      </div>

      {products.length === 0 ? (
        <EmptyState title="No products logged" description="Add pads, tampons, a cup or other products you used." />
      ) : (
        <ul className="space-y-3">
          {products.map((prod) => {
            const name = prod.label || (prod.type === 'Pad' ? 'Pads' : prod.type === 'Tampon' ? 'Tampons' : prod.type);
            const sizes = PRODUCT_SIZES[prod.type];
            const subtitle =
              prod.type === 'Pad'
                ? 'Disposable pads'
                : prod.type === 'Tampon'
                  ? 'Internal protection'
                  : prod.type === 'Menstrual cup'
                    ? 'Reusable cup'
                    : 'Product';
            return (
              <li key={prod.id} className="p-3.5 sm:p-4 rounded-2xl bg-[#FFF8FA] border border-[#F5E2EC] space-y-3 text-left">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white border border-pink-200 flex items-center justify-center shrink-0 shadow-2xs">
                      <ProductIcon type={prod.type} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-[#17152B] leading-tight break-words">{name}</h4>
                      <p className="text-[0.72rem] text-[#68708A] font-medium leading-tight">{subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-auto">
                    <div className="flex items-center bg-white rounded-full border border-pink-200 shadow-2xs">
                      <button
                        type="button"
                        aria-label={`Decrease ${name} quantity`}
                        onClick={() => onChangeProduct(prod.id, { quantity: prod.quantity - 1 })}
                        disabled={disabled || prod.quantity <= PRODUCT_QUANTITY_MIN}
                        className="w-11 h-11 rounded-full text-[#68708A] hover:text-[#F43F8F] flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span className="text-sm font-black text-[#17152B] min-w-[20px] text-center" aria-live="polite">
                        <span className="sr-only">Quantity </span>
                        {prod.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${name} quantity`}
                        onClick={() => onChangeProduct(prod.id, { quantity: prod.quantity + 1 })}
                        disabled={disabled || prod.quantity >= PRODUCT_QUANTITY_MAX}
                        className="w-11 h-11 rounded-full text-[#C2185B] hover:bg-pink-50 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteProduct(prod.id)}
                      disabled={disabled}
                      aria-label={`Remove ${name}`}
                      className="w-11 h-11 rounded-full hover:bg-red-50 text-pink-400 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {sizes.length > 0 && (
                  <div className="space-y-1">
                    <label htmlFor={`product-size-${prod.id}`} className="text-[0.68rem] font-bold text-[#68708A] uppercase tracking-wider block">
                      {prod.type === 'Menstrual cup' ? 'Size' : 'Size / absorbency'}
                    </label>
                    <div className="relative">
                      <select
                        id={`product-size-${prod.id}`}
                        value={prod.size ?? sizes[0]}
                        disabled={disabled}
                        onChange={(e) => onChangeProduct(prod.id, { size: e.target.value })}
                        className="w-full min-h-[44px] bg-white border border-[#F1DDE8] rounded-xl px-3.5 pr-9 text-sm font-semibold text-[#17152B] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F43F8F]/30"
                      >
                        {sizes.map((sz) => (
                          <option key={sz} value={sz}>
                            {sz}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#68708A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-[0.72rem] text-[#68708A] text-left leading-relaxed">
        Used more than one size today? Add a separate entry for each size or absorbency.
      </p>
    </section>
  );
};
