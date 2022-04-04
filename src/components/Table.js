import React from 'react';
import { useState,useEffect } from "react";
import {useLocalStorage} from '../useLocalStorage';
import styled from 'styled-components';
import Modal from '../components/Modal';



const LinkName = styled.div`
cursor: pointer;
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

  }
  const closeModal = () => {
    setModalVisible(false)
  }

  const onChecked = (e,current) => {
    e.preventDefault();
    let isChecked = e.target.checked;
    let currentId = current.id;
    let currentName = current.name;
    if (isChecked) {
      alert(`${currentName} 북마크가 추가되었습니다.`);
      console.log(current);
      console.log(current.id);
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
        <table>
          <thead>
            <tr>
              {/*  */}
              <th>{titles.favorites}</th>
              <th>{titles.name}</th>
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
                <td><input type="checkbox" checked={favoriteList.includes(coin.id)} onChange={(e)=>onChecked(e,coin)} /></td>
                <td><LinkName onClick={(e)=>openModal(e,coin.id)}>{coin.name}</LinkName></td>
                <td>{coin.symbol}</td>
                {/* 가격 쉼표/ -+ 색구분/소수점2자리/$*/}
                <td>{currencyCode+coin.current_price.toFixed(fixedValue).replace(replaceValue, ",")}</td>
                <td>{coin.price_change_percentage_1h_in_currency.toFixed(fixedValue).replace(replaceValue, ",")}</td>
                <td>{coin.price_change_percentage_24h_in_currency.toFixed(fixedValue).replace(replaceValue, ",")}</td>
                <td>{coin.price_change_percentage_7d_in_currency.toFixed(fixedValue).replace(replaceValue, ",")}</td>
                <td>{currencyCode+coin.total_volume.toFixed(fixedValue).replace(replaceValue, ",")}</td>
              </tr>
          )}
            {console.log(props)}
            <tr><td></td></tr>
          </tbody>
        </table>
        {
          modalVisible && 
              <Modal props={modalCoin} currency={currency} visible={modalVisible}/>
        }
      </>
    );
  }
  
  export default Table;