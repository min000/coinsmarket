import styled from 'styled-components';
import React from 'react';
import { fetchCoinInfo } from '../api';
import { useQuery } from 'react-query';
import { useState,useEffect } from "react";
import convertIcon from '../img/convertIcon.png'

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;
const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`;
const CloseButton = styled.button`
    position: absolute;
    display: block;
    top: 0;
    padding: 30px 15px 10px;
    right: 0;
    font-size: 12px;
    border: 0;
    text-decoration: underline;
    cursor: pointer;
    color: #BDBDBD;
    background: #ffffff;
`;
const ModalInner = styled.div`
    overflow: hidden;
    position: relative;
    top: 50%;
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 90%;
    margin: 0 auto;
    padding: 30px 0px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    background-color: #fff;
    transform: translateY(-50%);
`;
const Title = styled.h1`
    flex: none;
    font-size: 18px;
    line-height: 30px;
    vertical-align: top;
    padding: 0 15px;
    
`;
const Thumb = styled.img`
    width: 28px;
    height: 28px;
    margin-right: 8px;
    vertical-align: top;
`;
const InfoWrapper = styled.div`
    display: flex;
    flex: none;
    font-size: 12px;
    font-weight: 600;
    margin: 10px 15px 0;
`;
const InfoList = styled.dl`
    display: flex;
    flex: 1 1 50%;
    flex-wrap: wrap;
    border: 1px solid #d8d8d8;
`;
const InfoTitle = styled.dt`
    flex: 1 1 50%;
    line-height: 20px;
    padding: 8px;
    min-width:100px;
    background: #BDBDBD;
    text-align: center;
    
`;
const InfoContent = styled.dd`
    flex: 1 1 50%;
    padding: 10px;
    line-height: 20px;
    min-width:100px;

    a{
        text-decoration: underline;
        color: blue;
        cursor: pointer;
    }
`;
const InfoPrice = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 50%;
    text-align: right;
`;
const PriceBox = styled.div`
    flex: 1;
    strong {
        font-size: 18px;
        line-height: 20px;
        margin-top: 10px;
        display: inline-block;
        vertical-align: top;
    }
`;
const PriceList = styled.div`
    display: flex;
    flex: 1;
    vertical-align: top;
    margin-top:10px;
    dl{
        flex: 1;
    }
`;
const ConvertWrapper = styled.div`
    background: #BDBDBD;
    margin: 10px 15px 0;
    font-size: 14px;
    font-weight: 700;

`;
const ConvertTitle = styled.div`
    padding: 10px 10px 0;
  
`;
const ConvertBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    margin-top: 5px;

    span{
        display:inline-block;
        width:28px;
        height:28px;
        margin: 0  10px;
        background: url(${convertIcon}) center center /cover no-repeat;
    }
`;
const ConvertBox = styled.div`
    label {
        display: inline-block;
        padding: 0 15px;
        line-height: 28px;
        background: #D8D8D8;
    }
    input {
        border: 1px solid #bdbdbd;
        line-height: 26px;
        text-align: right;
    }
`;
const ModalDesc = styled.div`
    overflow-y: auto;
    flex: 1;
    font-size: 13px;
    border-top: 1px solid #d8d8d8;
    padding: 10px 15px;
    margin: 10px 0 0;
    line-height:25px;
`;
const PerBox = styled.span`
    color: ${(props) => (props.color == true? "red" : "blue")};
    display: inline-block;
    line-height: 20px;
    margin: 10px 0 0 10px;
    vertical-align: top;
}
`;
function Modal({props,currency,visible,setModalVisible}) {
    const {isLoading,data} = useQuery(["Coin",props],() => fetchCoinInfo(props),{
        refetchOnWindowFocus: true,
      });
    const [convertCoin,setConvertCoin] = useState(1);
    const [convertCurrency,setConvertCurrency] = useState(0);
    const replaceValue = /\B(?=(\d{3})+(?!\d))/g;
    let currencyCode = currency === "krw"?"₩":"$";

    useEffect(() => {
        setConvertCurrency(convertCurrency);
        setConvertCoin(convertCoin);
    }, [convertCurrency,convertCoin]);

    const onClickClose = () => {
        document.getElementById('root').style.overflow = "auto";
        document.getElementById('root').style.height = "auto";
        setModalVisible(false);
    }
    const onKeyUp = (e) =>{
        e.target.id === 'coin'?
            convertCoin = e.target.value.replace(/[^-\.0-9]/g,'')
            :
            convertCurrency = e.target.value.replace(/[^-\.0-9]/g,'')
    }
    const onChangeConvert = (e) => {
        let currentId = e.target.id;
        let coinValue = e.target.value;
        let currencyValue = e.target.value;
        let currentPrice = data.market_data.current_price[currency];

        if(currentId === 'coin'){
            currencyValue = currencyValue * currentPrice;
            if(currency === "usd") currencyValue = currencyValue * 1100;
        }else{
            coinValue = coinValue / currentPrice;
        }
        setConvertCurrency(currencyValue);
        setConvertCoin(coinValue);
    }
    return (
    <>
        <ModalOverlay visible={visible}>
            <ModalWrapper visible={visible}>
            {isLoading ? null:
                <ModalInner>
                    <Title><Thumb src={data.image.large} alt="" width="100%" height="100%"/>{data.localization.ko} ({data.symbol})</Title>
                    <InfoWrapper>
                        <InfoList>
                            <InfoTitle>시가총액</InfoTitle>
                            <InfoContent>Rank #{data.market_cap_rank}</InfoContent>
                            <InfoTitle>웹사이트</InfoTitle>
                            <InfoContent><a href={data.links.homepage} target="_blank">{data.links.homepage}</a></InfoContent>
                        </InfoList>
                        <InfoPrice>
                            <PriceBox>
                                <strong>{currencyCode+data.market_data.current_price[currency].toFixed(0).replace(replaceValue, ",")}</strong>
                                <PerBox color={data.market_data.price_change_percentage_24h_in_currency[currency]>0?"true":"false"}>{data.market_data.price_change_percentage_24h_in_currency[currency].toFixed(2)}%</PerBox> 
                            </PriceBox>
                            <PriceList>
                                <dl>
                                    <dt>시가 총액</dt>
                                    <dd>{currencyCode+data.market_data.market_cap[currency].toFixed(0).replace(replaceValue, ",")}</dd>
                                </dl>
                                <dl>
                                    <dt>24시간 거래대금</dt>
                                    <dd>{currencyCode+data.market_data.total_volume[currency].toFixed(0).replace(replaceValue, ",")}</dd>
                                </dl>
                            </PriceList>
                        </InfoPrice>
                    </InfoWrapper>
                    <ConvertWrapper>
                        <ConvertTitle>가격 계산</ConvertTitle>
                        <ConvertBoxContainer>
                            <ConvertBox>
                                <label htmlFor="coin">{data.symbol.toUpperCase()}</label>
                                <input 
                                value={convertCoin}
                                id="coin" 
                                type="number" 
                                onChange={onChangeConvert}
                                onKeyUp={onKeyUp}
                                />
                            </ConvertBox>
                            <span></span>
                            <ConvertBox>
                                <label htmlFor="currency">{currency.toUpperCase()}</label>
                                <input 
                                value={convertCurrency?setConvertCurrency:data.market_data.current_price[currency]}
                                id="currency" 
                                type="number"
                                onChange={onChangeConvert}
                                onKeyUp={onKeyUp}
                                />
                            </ConvertBox>
                        </ConvertBoxContainer>
                    </ConvertWrapper>
                    <ModalDesc>{data.description.ko}</ModalDesc>
                    <CloseButton onClick={onClickClose}>닫기</CloseButton>
                </ModalInner>
                }
            </ModalWrapper>
        </ModalOverlay>
    </>
    );
  }
  
  export default Modal;