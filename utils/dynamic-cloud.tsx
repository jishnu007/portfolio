import React from "react";
import { fetchSimpleIcons, Cloud } from "react-icon-cloud";
import { renderSimpleIcon, ICloud, SimpleIcon } from "react-icon-cloud";
import { invertBg, lightTheme, useTheme } from "./use-theme";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  // https://www.goat1000.com/tagcanvas-options.php
  options: {
    clickToFront: 500,
    depth: 1,
    imageScale: 2,
    initial: [0.1, -0.1],
    outlineColour: "#0000",
    reverse: true,
    tooltip: "native",
    tooltipDelay: 0,
    wheelZoom: false,
  },
};
export const renderCustomIcon = (icon: SimpleIcon, bg: string) => {
  return renderSimpleIcon({
    icon,
    minContrastRatio: bg === lightTheme.color ? 1.2 : 2,
    bgHex: bg,
    size: 42,
    fallbackHex: invertBg(bg),
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};
export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export const DynamicCloud = (props: DynamicCloudProps) => {
  const color = "#fff";
  const [data, setData] = React.useState<IconData>();
  React.useEffect(() => {
    fetchSimpleIcons({ slugs: props.iconSlugs }).then(setData);
  }, [props.iconSlugs]);
  const renderedIcons = React.useMemo(() => {
    if (!data) {
      return null;
    }

    const icons = [];
    for (const k of Object.keys(data.simpleIcons)) {
      icons.push(data.simpleIcons[k]);
    }

    return icons.map((i) => renderCustomIcon(i, color));
  }, [data, color]);

  return <Cloud {...cloudProps}>{renderedIcons as any}</Cloud>;
};
