import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@utils/cn";
import * as React from "react";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(() => {
    if (Array.isArray(value)) {
      return value;
    }
    if (Array.isArray(defaultValue)) {
      return defaultValue;
    }
    return [min, max];
  }, [defaultValue, value, max, min]);

  return (
    <SliderPrimitive.Root
      className={cn(
        "relative flex w-full cursor-pointer touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[disabled]:cursor-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50",
        className,
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-hidden rounded-full bg-border data-[orientation=horizontal]:h-2 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5",
        )}
        data-slot="slider-track"
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute bg-main-blue data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
          data-slot="slider-range"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          className="block size-5 shrink-0 rounded-full border border-main-blue bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 data-[disabled]:pointer-events-none"
          data-slot="slider-thumb"
          // biome-ignore lint/suspicious/noArrayIndexKey: stable array with no reordering
          key={index}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
