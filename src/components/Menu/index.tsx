import React, { useContext, useState, useEffect } from 'react'
import { Menu as UikitMenu} from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import links from './config'

import PancakeRouterAbi from '../../constants/abis/PancakeRouter.json'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'


const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC ?? 'https://bsc-dataseed1.binance.org:443'));

const PancakeRouterAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';

const PancakeRouterContract = new web3.eth.Contract(PancakeRouterAbi as AbiItem[], PancakeRouterAddress)

const Menu: React.FC = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const priceData = useGetPriceData()
  const cakePriceUsd = priceData ? Number(priceData.prices.Cake) : undefined
  const profile = useGetLocalProfile()
  const [priceToken, setPriceToken] = useState(0);

  const getPriceToken = async () => {
    const pathPcs = ['0x75f01ca420a1cb86df6790d2839e8e34b59b7bb1','0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c','0xe9e7cea3dedca5984780bafc599bd69add087d56']
    const price = await PancakeRouterContract.methods.getAmountsOut(100000000, pathPcs).call()
    setPriceToken(price[2]/10**18)
  }

  useEffect(() => {
    getPriceToken()
  }, [])


  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={priceToken}
      profile={profile}
      {...props}
    />
  )
}

export default Menu
