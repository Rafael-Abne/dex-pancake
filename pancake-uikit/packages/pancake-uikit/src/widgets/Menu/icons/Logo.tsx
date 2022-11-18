import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";
import logoMimos from '../../../assets/logo.webp';

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <img src={logoMimos} />
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
