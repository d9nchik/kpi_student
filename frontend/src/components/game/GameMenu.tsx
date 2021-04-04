import React, { FunctionComponent } from 'react';
import { getMenus } from '../../utilities/tools';

import MenuItem from './MenuItem';

interface IProps {
  menuName:
    | ''
    | 'Библиотека'
    | 'Магазин'
    | 'Универ'
    | 'Работа'
    | 'Общага'
    | 'Отдых';
  closeMenu: () => void;
}

const GameMenu: FunctionComponent<IProps> = ({
  menuName,
  closeMenu,
}: IProps) => {
  if (!menuName) {
    return <div />;
  }

  const menus = getMenus();
  const currentMenu = menus[menuName];
  return (
    <div>
      <h2>{menuName}</h2>
      <button onClick={closeMenu}>Close menu</button>
      {currentMenu.map(item => (
        <MenuItem {...item} key={JSON.stringify(item)} />
      ))}
    </div>
  );
};

export default GameMenu;
