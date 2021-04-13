import React, { FunctionComponent } from 'react';
import { GameStatus } from '../../utilities/dataStorage';
import { getMenus } from '../../utilities/tools';

import MenuItem from './MenuItem';
import './GameMenu.css';
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
  gameStatus: GameStatus;
}

const GameMenu: FunctionComponent<IProps> = ({
  menuName,
  closeMenu,
  gameStatus,
}: IProps) => {
  if (!menuName) {
    return <div />;
  }

  const menus = getMenus();
  const currentMenu = menus[menuName];
  return (
    <div id={'menuForTask'}>
      <div id={'headerMenu'}>
        <h2>{menuName}</h2>
        <button onClick={closeMenu}>Close menu</button>
      </div>

      <div id={'tasks'}>
        {currentMenu.map(item => (
          <MenuItem
            item={item}
            gameObj={gameStatus}
            key={JSON.stringify(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameMenu;
