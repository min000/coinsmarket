import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Favorites from './Favorites'
import Market from './Market';

const Tabs = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? "red" : "black"};
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
            <Tab isActive={marketMatch !== null}>
              <Link to={`/market`}>가상자산 시세목록</Link>
            </Tab>
            <Tab isActive={favoritesMatch !== null}>
              <Link to={`/favorites`}>북마크 목록</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/market`}>
              <Market />
            </Route>
            <Route path={`/favorites`}>
              <Favorites />
            </Route>
          </Switch>
        </>
      );
}
export default Home;
