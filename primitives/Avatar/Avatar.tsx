import clsx from "clsx";
import Image from "next/image";
import { ComponentProps, forwardRef } from "react";
import { Tooltip, TooltipProps, tooltipVariants } from "../Tooltip";
import { getInitials } from "../../utils";
import { avatarVariants, avatarClassName } from "./Avatar.module.css";

const DEFAULT_SIZE = 24;
const FONT_SIZE_FACTOR = 0.36;

export interface AvatarProps extends Omit<ComponentProps<"div">, "color"> {
  src?: string;
  name: string;
  size?: number;
  color?: string;
  outline?: boolean;
  tooltip?: boolean;
  tooltipProps?: Omit<TooltipProps, "children" | "content">;
  variants?: string;
  className?: string;
  sx?: ComponentProps<"div">["style"];
  ref?: React.Ref<HTMLDivElement>;
}

export interface AvatarEllipsisProps
  extends Omit<ComponentProps<"div">, "color" | "ellipsis"> {
  ellipsis: number;
  size?: number;
  outline?: boolean;
  tooltip?: boolean;
  tooltipProps?: Omit<TooltipProps, "children" | "content">;
  color?: string;
  title?: string;
  variants?: string;
  className?: string;
  sx?: ComponentProps<"div">["style"];
  ref?: React.Ref<HTMLDivElement>;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, name, size = DEFAULT_SIZE, color, outline, tooltip, tooltipProps, variants, className, sx, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={clsx(
          avatarClassName.base,
          outline && avatarClassName.outline,
          variants,
          className
        )}
        style={{ width: size, height: size, color, ...sx, ...props.style }}
        aria-label={name}
      >
        {src && (
          <Image
            alt={name}
            src={src}
            height={size}
            width={size}
            aria-hidden
          />
        )}
        <span
          style={{ fontSize: size * FONT_SIZE_FACTOR }}
          className={avatarClassName.label}
          aria-hidden
        >
          {getInitials(name)}
        </span>
      </div>
    );

    return tooltip ? (
      <Tooltip
        content={name}
        {...tooltipProps}
        variants={tooltipVariants}
        ref={ref}
      >
        {content}
      </Tooltip>
    ) : (
      content
    );
  }
);

export const AvatarEllipsis = forwardRef<HTMLDivElement, AvatarEllipsisProps>(
  ({
    ellipsis,
    size = DEFAULT_SIZE,
    outline = false,
    tooltip = false,
    tooltipProps,
    color,
    title,
    variants,
    className,
    sx,
    ...props
  }, ref) => {
    const content = (
      <div
        ref={ref}
        className={clsx(
          avatarClassName.base,
          outline && avatarClassName.outline,
          variants,
          className
        )}
        style={{ width: size, height: size, color, ...sx, ...props.style }}
        title={title}
      >
        <span
          style={{ fontSize: size * FONT_SIZE_FACTOR }}
          className={avatarClassName.label}
        >
          +{ellipsis}
        </span>
      </div>
    );

    return tooltip ? (
      <Tooltip
        content={`${ellipsis} other${ellipsis > 1 ? "s" : ""}`}
        {...tooltipProps}
        variants={tooltipVariants}
        ref={ref}
      >
        {content}
      </Tooltip>
    ) : (
      content
    );
  }
);
