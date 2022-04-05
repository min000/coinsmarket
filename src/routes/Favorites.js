import React, { useEffect } from 'react';
import {useLocalStorage} from '../useLocalStorage';
import Table from '../components/Table';


function Favorites(){
  const [data, setData] = useLocalStorage("Data",[]);


  return (
   <>
      <Table props={data.sort((x,y)=>x.market_cap_rank - y.market_cap_rank)}></Table>
   </>
  );
}
export default Favorites;