import React, { useId, useState } from 'react';
import { PackagePlus } from 'lucide-react';
import { Modal } from '../common/Modal';
import { buttonClass } from '../common/buttonStyles';
import { PRODUCT_QUANTITY_MAX, PRODUCT_QUANTITY_MIN, PRODUCT_SIZES, PRODUCT_TYPES } from '../../types/dailyLog';
import type { ProductEntry, ProductType } from '../../types/dailyLog';

interface DailyLogAddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<ProductEntry, 'id'>) => void;
}

type Errors = Partial<Record<'label' | 'quantity' | 'size', string>>;

export const DailyLogAddProductModal: React.FC<DailyLogAddProductModalProps> = (props) =>
  props.isOpen ? <AddProductDialog {...props} /> : null;

/** Mounted per open, so the form always starts clean. */
const AddProductDialog: React.FC<DailyLogAddProductModalProps> = ({ onClose, onAdd }) => {
  const [type, setType] = useState<ProductType>('Pad');
  const [size, setSize] = useState<string>(PRODUCT_SIZES.Pad[0]);
  const [label, setLabel] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [errors, setErrors] = useState<Errors>({});
  const ids = { type: useId(), size: useId(), label: useId(), qty: useId(), form: useId() };
  const sizes = PRODUCT_SIZES[type];

  const changeType = (next: ProductType) => {
    setType(next);
    setSize(PRODUCT_SIZES[next][0] ?? '');
    setErrors({});
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found: Errors = {};
    const qty = Number(quantity);
    if (!/^\d+$/.test(quantity.trim()) || qty < PRODUCT_QUANTITY_MIN || qty > PRODUCT_QUANTITY_MAX) {
      found.quantity = `Enter a whole number from ${PRODUCT_QUANTITY_MIN} to ${PRODUCT_QUANTITY_MAX}.`;
    }
    const trimmedLabel = label.trim();
    if (type === 'Other' && !trimmedLabel) found.label = 'Describe the product, e.g. period underwear.';
    if (trimmedLabel.length > 60) found.label = 'Use 60 characters or fewer.';
    if (sizes.length > 0 && !sizes.includes(size)) found.size = 'Choose a size.';
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onAdd({ type, label: trimmedLabel, size: sizes.length > 0 ? size : null, quantity: qty });
    onClose();
  };

  const fieldClass = (invalid?: string) =>
    `w-full min-h-[44px] bg-[#FAF8FA] border rounded-xl px-3.5 text-sm font-semibold text-[#17152B] focus:outline-none focus:ring-2 focus:ring-[#F43F8F]/30 ${
      invalid ? 'border-rose-400' : 'border-[#F1DDE8]'
    }`;
  const labelClass = 'text-xs font-bold text-[#68708A] uppercase tracking-wider block mb-1';
  const errorOf = (key: keyof Errors, id: string) =>
    errors[key] ? (
      <p id={`${id}-error`} className="text-xs font-medium text-rose-600 mt-1">
        {errors[key]}
      </p>
    ) : null;

  return (
    <Modal
      isOpen
      onClose={onClose}
      icon={<PackagePlus className="w-5 h-5" />}
      title="Add Product"
      description="Log a product or absorbency you used."
      footer={
        <>
          <button type="button" onClick={onClose} className={buttonClass.secondary}>
            Cancel
          </button>
          <button type="submit" form={ids.form} className={buttonClass.primary}>
            Add product
          </button>
        </>
      }
    >
      <form id={ids.form} onSubmit={submit} noValidate className="space-y-4">
        <div>
          <label htmlFor={ids.type} className={labelClass}>
            Product type
          </label>
          <select id={ids.type} value={type} onChange={(e) => changeType(e.target.value as ProductType)} className={fieldClass()}>
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'Other' ? 'Other (e.g. period underwear)' : t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={ids.label} className={labelClass}>
            {type === 'Other' ? 'Description' : 'Label (optional)'}
          </label>
          <input
            id={ids.label}
            type="text"
            value={label}
            maxLength={60}
            required={type === 'Other'}
            aria-invalid={Boolean(errors.label)}
            aria-describedby={errors.label ? `${ids.label}-error` : undefined}
            onChange={(e) => setLabel(e.target.value)}
            placeholder={type === 'Other' ? 'e.g. Period underwear' : 'e.g. Night pad'}
            className={fieldClass(errors.label)}
          />
          {errorOf('label', ids.label)}
        </div>

        <div className={`grid gap-3 ${sizes.length > 0 ? 'grid-cols-1 min-[400px]:grid-cols-2' : 'grid-cols-1'}`}>
          <div>
            <label htmlFor={ids.qty} className={labelClass}>
              Quantity used
            </label>
            <input
              id={ids.qty}
              type="number"
              inputMode="numeric"
              min={PRODUCT_QUANTITY_MIN}
              max={PRODUCT_QUANTITY_MAX}
              step={1}
              value={quantity}
              aria-invalid={Boolean(errors.quantity)}
              aria-describedby={errors.quantity ? `${ids.qty}-error` : undefined}
              onChange={(e) => setQuantity(e.target.value)}
              className={fieldClass(errors.quantity)}
            />
            {errorOf('quantity', ids.qty)}
          </div>

          {sizes.length > 0 && (
            <div>
              <label htmlFor={ids.size} className={labelClass}>
                {type === 'Menstrual cup' ? 'Size' : 'Size / absorbency'}
              </label>
              <select id={ids.size} value={size} onChange={(e) => setSize(e.target.value)} className={fieldClass(errors.size)}>
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errorOf('size', ids.size)}
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};
