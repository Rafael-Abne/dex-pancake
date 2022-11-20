import React from "react";
import styled from "styled-components";
import { PancakeRoundIcon } from "../../../components/Svg";
import Text from "../../../components/Text/Text";
import Skeleton from "../../../components/Skeleton/Skeleton";
import LogoIcon from "../../../assets/logo.webp";

interface Props {
  cakePriceUsd?: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CakePrice: React.FC<Props> = ({ cakePriceUsd }) => {
  return cakePriceUsd ? (
    <PriceLink href="https://pancakeswap.info/token/0x9E354B618d472b76cE35a4ab76916B4B51355428" target="_blank">
      <img src={LogoIcon} width="24px" style={{ marginRight: '10px' }} />
      <Text color="textSubtle" bold>{`$${cakePriceUsd.toFixed(6)}`}</Text>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={24} />
  );
};

export default React.memo(CakePrice);
