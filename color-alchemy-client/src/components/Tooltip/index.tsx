import React, { memo } from "react";

export type TooltipProps = {
  children: React.ReactNode;
  text: string;
};

const Tooltip = memo((props: TooltipProps) => {
  return (
    <span className="group relative">
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-300 px-2 py-1 text-black opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-gray-300 before:content-[''] group-hover:opacity-100 text-xs">
        {props.text}
      </span>
      {props.children}
    </span>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
