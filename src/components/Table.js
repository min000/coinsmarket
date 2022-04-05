import React from 'react';
import { useState } from "react";
import {useLocalStorage} from '../useLocalStorage';
import styled from 'styled-components';
import Modal from '../components/Modal';
import beforeIcon from '../img/beforeIcon.png';
import afterIcon from '../img/afterIcon.png';

const TableContainer = styled.table`
  margin: 30px auto 0;
  width: 98%;
  text-align: right;
  font-size: 13px;
  font-weight: 600;

  .tableTitle{
    text-align: left;
    text-indent: 20px;
  }
  tr{
    border-bottom: 1px solid #d8d8d8;
    border-right: 0;
    border-left: 0;
  }
  th{
    padding: 10px 5px;
    line-height: 20px;
    background: #d8d8d8;
    color: #848484;
    font-size:12px;
  }
  td{
    padding: 10px 5px;
    line-height: 20px;
  }
`;
const LinkName = styled.div`
  cursor: pointer;
`;
const PerBox = styled.span`
  color: ${(props) => (props.color == "true"? "red" : "blue")};
`;
const Favorites = styled.div`
  text-align: center;
  input{
    display:none;
  }
  input + label{
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: url(${beforeIcon}) center center /cover no-repeat;
  }
  input:checked + label{
    background: url(${afterIcon}) center center /cover no-repeat;
  }
`;


function Table({props,currency="krw"}) {
  const titles = {
    favorites : "",
    name : "자산",
    symbol : "",
    current_price :"Price",
    price_change_percentage_1h_in_currency :"1H",
    price_change_percentage_24h_in_currency :"24H",
    price_change_percentage_7d_in_currency :"7D",
    total_volume :"24H Volume"
  }
  const replaceValue = /\B(?=(\d{3})+(?!\d))/g;
  const fixedValue = 2;

  let currencyCode = currency === "krw"?"₩":"$";

  const [favoriteList, setFavoriteList] = useLocalStorage("List",[]);
  const [favoriteData, setFavoriteData] = useLocalStorage("Data",[]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCoin, setModalCoin] = useState("");
  
  const openModal = (e,coinId) => {
    e.preventDefault();
    setModalCoin(coinId);
    setModalVisible(true);
    document.getElementById('root').style.overflow = "hidden";
    document.getElementById('root').style.height = "100%";

  }

  const onChecked = (e,current) => {
    e.preventDefault();
    let isChecked = e.target.checked;
    let currentId = current.id;
    let currentName = current.name;
    if (isChecked) {
      alert(`${currentName} 북마크가 추가되었습니다.`);
      setFavoriteList([...favoriteList, currentId]);
      setFavoriteData([...favoriteData, current]);
    // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
    } else {
        alert(`${currentName} 북마크가 해제되었습니다.`);
        setFavoriteList(favoriteList.filter((id) => id !== currentId));
        setFavoriteData(favoriteData.filter((coin) => coin.id !== currentId));

    }
  }
  

    return (
      <>
        <TableContainer>
          <thead>
            <tr>
              <th>{titles.favorites}</th>
              <th className="tableTitle">{titles.name}</th>
              <th>{titles.symbol}</th>
              <th>{titles.current_price}</th>
              <th>{titles.price_change_percentage_1h_in_currency}</th>
              <th>{titles.price_change_percentage_24h_in_currency}</th>
              <th>{titles.price_change_percentage_7d_in_currency}</th>
              <th>{titles.total_volume}</th>
            </tr>
          </thead>
          <tbody>
            {props.map(coin =>
              <tr key={coin.id}>
                <td><Favorites><input type="checkbox" id={coin.id} checked={favoriteList.includes(coin.id)} onChange={(e)=>onChecked(e,coin)} /><label htmlFor={coin.id}></label></Favorites></td>
                <td className="tableTitle"><LinkName onClick={(e)=>openModal(e,coin.id)}>{coin.name}</LinkName></td>
                <td>{coin.symbol}</td>
                <td>{currencyCode+coin.current_price.toFixed(fixedValue).replace(replaceValue, ",")}</td>
                <td><PerBox color={coin.price_change_percentage_1h_in_currency>0?"true":"false"}>{coin.price_change_percentage_1h_in_currency.toFixed(fixedValue)}</PerBox></td>
                <td><PerBox color={coin.price_change_percentage_24h_in_currency>0?"true":"false"}>{coin.price_change_percentage_24h_in_currency.toFixed(fixedValue)}</PerBox></td>
                <td><PerBox color={coin.price_change_percentage_7d_in_currency>0?"true":"false"}>{coin.price_change_percentage_7d_in_currency.toFixed(fixedValue)}</PerBox></td>
                <td>{currencyCode+coin.total_volume.toFixed(fixedValue).replace(replaceValue, ",")}</td>
              </tr>
          )}
          </tbody>
        </TableContainer>
        {
          modalVisible && 
              <Modal props={modalCoin} currency={currency} visible={modalVisible} setModalVisible={setModalVisible}/>
        }
      </>
    );
  }
  
  export default Table;