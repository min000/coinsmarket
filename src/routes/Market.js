import styled from 'styled-components';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import Loader from '../components/Loader';
import Table from '../components/Table';
import SelectBox from '../components/SelectBox';

// interface IMarket {
//     id: string;
//     market_cap_rank: number;
//     name: string;
//     symbol: string;
//     current_price: number;
//     total_volume: number;
//     price_change_percentage_1h_in_currency: number;
//     price_change_percentage_24h_in_currency: number;
//     price_change_percentage_7d_in_currency: number;
// }

const BtnMore  = styled.button`
  padding: 0px 20px;
  margin: 0 auto;
  background: #fff;
  border: 0;
  border-bottom: 1px solid #d8d8d8;
  padding: 10px;
  line-height: 20px;
  display: block;
  width: 100%;
  cursor: pointer;
`;
const OPTIONS = [
	{ value: "krw", name: "KRW 보기" },
	{ value: "usd", name: "USD 보기" }
];

function Market(){
    const [currency, setCurrency] = React.useState(OPTIONS[0].value);
    const [num, setNum] = React.useState(1);
    const {isLoading, data} = useQuery(["Coins",[currency,num]],() => fetchCoins(currency,num),{
      // 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션
      refetchOnWindowFocus: true,
    });
    const onClick = (e) => {
      e.preventDefault();
      setNum(current=> current+1);
    }

  return (
   <>
    <SelectBox options={OPTIONS} defaultValue={currency} setCurrency={setCurrency}/>
     {
        isLoading 
        ? <Loader/>
        : <Table props={data} currency={currency}></Table>
    }
    <BtnMore onClick={onClick}>더 보기</BtnMore>
   </>
  );
}
export default Market;