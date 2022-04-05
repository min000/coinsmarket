# CoinMarket
## 프로젝트 실행 방법
- yarn
```
yarn start
```
- npm
```
npm run start
```
## 구현 페이지
- 전체 목록
- 북마크 목록
- 상세페이지

## 설계 구조 및 역할 정의
### 1. routes
URL에 따라 다른 페이지와 API를 랜더링 하기위한 역할
#### Home
- 전체목록과 북마크 목록의 공통 컴포넌트
- Market과 Favorites의 부모 router
- 탭을 선택하여 Market과 Favorites 페이지로 전환시켜주는 역할
#### Market
- 전체 목록
- 전체 목록페이지의 API를 불러와서 Table 컴포넌트에 전달함
- 호출 API : https://api.coingecko.com/api/v3/coins/markets
- API 재호출 조건 : 시세통화 변경, 더보기 클릭할 때마다 추가데이터 호출
#### Favorites
- 북마크 목록
- 로컬스토리지에 저장된 북마크 데이터를 불러와서 Table 컴포넌트에 전달 

### 2. component
#### Loader
- API 호출시 로딩중임을 알리는 컴포넌트 
#### Modal
- 상세 페이지
- 페이지 전환이 아닌 컴포넌트를 호출해서 팝업창으로 노출하는 방식
- 컴포넌트 호출시 id를 전달해서 해당 id에 해당하는 코인정보를 호출함
- 호출 API : https://api.coingecko.com/api/v3/coins/{id}
#### SelectBox
- Market의 컴포넌트 시세통화 변경시 API를 재호출

### 3. api
- API 호출
- https://api.coingecko.com/api/v3/coins/markets
- https://api.coingecko.com/api/v3/coins/{id}
### 4. useLocalStorage
- 북마크된 목록들 로컬스토리지에 저장하고 가져오는 역할.

### 5. 실행
앱을 실행하는 역할을 담당
#### App.js
#### index.js
#### Router.js

## 라이브러리
### styled-components
컴포넌트 별 css 관리와 props로 특정상황에서 구분해서 스타일을 주기 위함.
### react
- useState
- useEffect
state 관리와 state 변경시 리랜더링을 위함
### react-query
- useQuery
- QueryClient
- QueryClientProvider
API 데이터 관리와 API 처리 비동기 로직들의 관리를 위함