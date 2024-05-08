import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { CheckIcon, SelectIcon } from "../../icons";
import styles from "./Select.module.css";

type Item = RadixSelect.SelectItemProps & {
  value: string;
  title?: string;
  description?: string;
};

type Props = Omit<RadixSelect.SelectProps, "onValueChange"> & {
  variant?: "regular" | "subtle";
  initialValue?: string;
  value?: string;
  items: Item[];
  onChange?: RadixSelect.SelectProps["onValueChange"];
  placeholder?: RadixSelect.SelectValueProps["placeholder"];
  aboveOverlay?: boolean;
  className?: RadixSelect.SelectTriggerProps["className"];
};

const getPrefixClasses = (variant: Props["variant"]) =>
  clsx(styles.trigger, {
    [styles.triggerSubtle]: variant === "subtle",
  });

const getContentClasses = (aboveOverlay: Props["aboveOverlay"]) =>
  clsx(styles.select, {
    [styles.aboveOverlay]: aboveOverlay,
  });

export function Select({
  variant = "regular",
  initialValue,
  value,
  items,
  onChange,
  placeholder,
  aboveOverlay,
  className,
  ...props
}: Props) {
  const [internalValue, setInternalValue] = useState<string | null>(initialValue);

  const handleValueChange = useCallback(
    (newValue: string | null) => {
      if (newValue !== null) {
        setInternalValue(newValue);
        onChange?.(newValue);
      }
    },
    [onChange]
  );

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <RadixSelect.Root
      value={internalValue}
      onValueChange={handleValueChange}
      defaultValue={initialValue}
      {...props}
    >
      <RadixSelect.Trigger
        className={getPrefixClasses(variant)}
      >
        <RadixSelect.Value
          placeholder={placeholder}
          className={styles.triggerValue}
        />
        <RadixSelect.Icon className={styles.triggerIcon}>
          <SelectIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className={getContentClasses(aboveOverlay)}
          style={
            {
              zIndex: aboveOverlay ? "var(--z-overlay)" : undefined,
            } as CSSProperties
          }
        >
          <RadixSelect.Viewport>
            {items.map((item) => (
              <RadixSelect.Item
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                className={styles.item}
                {...item}
              >
                <div className={styles.itemIndicator}>
                  <RadixSelect.ItemIndicator>
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <CheckIcon />
                    </svg>
                  </RadixSelect.ItemIndicator>
                </div>
                <div className={styles.itemInfo}>
                  <RadixSelect.ItemText className={styles.itemTitle}>
                    {item.title ?? item.value}
                  </RadixSelect.ItemText>
                  {item.description && (
                    <span className={styles.itemDescription}>
                      {item.description}
                    </span>
                  )}
                </div>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
