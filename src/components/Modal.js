import styled from 'styled-components';
import React from 'react';
import { fetchCoinInfo } from '../api';
import { useQuery } from 'react-query';
import { Link, useParams} from 'react-router-dom';


const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`;
const CloseButton = styled.button`

`;
const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 10px;
    width: 360px;
    max-width: 480px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
`;
//딤드 처리
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
function Modal({props,currency,visible}) {
    const {isLoading,data} = useQuery(["Coin",props],() => fetchCoinInfo(props),{
        // 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션
        refetchOnWindowFocus: true,
      });
    const onClickClose = () => {

    }
    console.log(props);
    console.log(data);
    console.log(currency)
    return (
    <>
        <ModalOverlay visible={visible} />
        <ModalWrapper visible={visible}>
        {isLoading ? null:
            <ModalInner>
                <h1>{data.localization.ko}</h1>
                <div>
                    <dl>
                        <dt>시가총액</dt>
                        <dd>{data.market_cap_rank}
                        </dd>
                        <dt>웹사이트</dt>
                        <dd>{data.links.homepage}</dd>
                    </dl>
                    <div>
                        <dl>
                            <dt></dt>
                            <dd>{data.market_data.price_change_percentage_24h_in_currency[currency]}</dd>
                            <dd>퍼센트</dd>
                        </dl>
                        <div>
                            <dl>
                                <dt>시가 총액</dt>
                                <dd>{data.market_data.market_cap_rank[currency]}</dd>
                            </dl>
                            <dl>
                                <dt>24시간 거래대금</dt>
                                <dd>{data.market_data.market_cap[currency]}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div></div>
                <div>{data.description.ko}</div>
            </ModalInner>
            }
            <CloseButton onClick={onClickClose} />
        </ModalWrapper>
    </>
    );
  }
  
  export default Modal;