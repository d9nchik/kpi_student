import React, { FunctionComponent } from 'react';
import { GameStatus } from '../../data/dataStorage';
import { getMenus } from '../../data/tools';
import CloseMenu from './images/closeMenu.png';
import MenuItem from './MenuItem';
import './GameMenu.css';
interface IProps {
  menuName:
    | ''
    | 'library'
    | 'shop'
    | 'university'
    | 'work'
    | 'hostel'
    | 'relax';
  closeMenu: () => void;
  gameStatus: GameStatus;
}

const translationOfMenuNames = {
  library: 'Библиотека',
  shop: 'Магазин',
  university: 'Универ',
  work: 'Работа',
  hostel: 'Общага',
  relax: 'Отдых',
};

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
        <h2>{translationOfMenuNames[menuName]}</h2>
        <button onClick={closeMenu}>
          <img src={CloseMenu} alt="Close" />
        </button>
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
