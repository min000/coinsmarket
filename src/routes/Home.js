import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Favorites from './Favorites'
import Market from './Market';

const Tabs = styled.ul`
  display: flex;
  border: 2px solid #d8d8d8;
  border-left: 0;
  border-right: 0;
`;

const Tab = styled.li`
  font-size: 15px;
  line-height: 20px;
  margin-right: 25px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 900;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? "black" : "#BDBDBD"};
  a {
    display: block;
  }
`;

function Home(){
  const marketMatch = useRouteMatch("/market");
  const favoritesMatch = useRouteMatch("/favorites");
    return (
        <>
           <Tabs>
            <Tab isActive={marketMatch !== null || (marketMatch  === null && favoritesMatch === null)}>
              <Link to={`/market`}>가상자산 시세목록</Link>
            </Tab>
            <Tab isActive={favoritesMatch !== null}>
              <Link to={`/favorites`}>북마크 목록</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/favorites`}>
              <Favorites />
            </Route>
            <Route path={`/`}>
              <Market />
            </Route>
          </Switch>
        </>
      );
}
export default Home;
