import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "iconify-icon": IconifyIconProps;
    }
  }
}

interface IconifyIconProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> {
  icon?: string;
  width?: string | number;
  height?: string | number;
  flip?: string;
  rotate?: string | number;
  noobserver?: boolean;
}

export {};
