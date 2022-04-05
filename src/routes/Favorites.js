import React, { useEffect } from 'react';
import styled from 'styled-components';
import {useLocalStorage} from '../useLocalStorage';
import { useQuery } from 'react-query';
import Table from '../components/Table';


function Favorites(){
  const [data, setData] = useLocalStorage("Data",[]);
  //   const {isLoading, data} = useQuery(["Coins",currency],() => fetchCoins(currency),{
  //     // 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션
  //     refetchOnWindowFocus: true,
  //   });

  return (
   <>
      <Table props={data.sort((x,y)=>x.market_cap_rank - y.market_cap_rank)}></Table>
   </>
  );
}
export default Favorites;