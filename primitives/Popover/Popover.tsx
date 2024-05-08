import * as RadixPopover from "@radix-ui/react-popover";
import { CSSProperties, ReactNode } from "react";
import styles from "./Popover.module.css";

type PopoverProps = RadixPopover.PopoverProps & {
  content: ReactNode;
  aboveOverlay?: boolean;
};

type PopoverContentProps = RadixPopover.PopoverContentProps & {
  side?: RadixPopover.PopoverContentProps["side"];
  sideOffset?: RadixPopover.PopoverContentProps["sideOffset"];
  align?: RadixPopover.PopoverContentProps["align"];
  alignOffset?: RadixPopover.PopoverContentProps["alignOffset"];
  defaultSide?: RadixPopover.PopoverContentProps["side"];
  defaultAlign?: RadixPopover.PopoverContentProps["align"];
};

export function Popover({
  content,
  children,
  aboveOverlay,
  ...props
}: PopoverProps) {
  return (
    <RadixPopover.Root {...props}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <RadixPopover.Portal>
        <PopoverContent
          side={props.side}
          sideOffset={props.sideOffset}
          align={props.align}
          alignOffset={props.alignOffset}
          defaultSide={"bottom"}
          defaultAlign={"center"}
          style={
            {
              zIndex: aboveOverlay ? "var(--z-overlay)" : undefined,
            } as CSSProperties
          }
        >
          {content}
        </PopoverContent>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

const PopoverTrigger = (props: RadixPopover.PopoverTriggerProps) => {
  return <RadixPopover.Trigger {...props} />;
};

const PopoverContent = (props: PopoverContentProps) => {
  return <RadixPopover.Content {...props} />;
};
