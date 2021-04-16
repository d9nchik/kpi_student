import React, { FunctionComponent, useState } from 'react';
import { GameStatus } from '../../utilities/dataStorage';
import { getStringifiedDays, getDayInUniversity } from '../../utilities/tools';
import { useHistory } from 'react-router-dom';

import GameMenu from './GameMenu';

import Books from './images/books.png';
import Shop from './images/shop.png';
import Info from './images/information.png';

import './GameBode.css';

interface IProps {
  gameStatus: GameStatus;
}

const GameBody: FunctionComponent<IProps> = ({ gameStatus }: IProps) => {
  const daysInUniversity = getDayInUniversity();
  const history = useHistory();
  const [openedMenuName, setOpenedMenuName] = useState<
    '' | 'library' | 'shop' | 'university' | 'work' | 'hostel' | 'relax'
  >('');

  return (
    <div>
      <div id={'nameAndTime'}>
        <div>
          <span>Имя: </span>
          {gameStatus.characterName}
        </div>
        <div>
          <span>В универе: </span>
          {`${daysInUniversity} ${getStringifiedDays(daysInUniversity)}`}
        </div>
      </div>
      <div id={'rightMenu'}>
        <button onClick={() => setOpenedMenuName('library')}>
          <img id={'books'} src={Books} alt="Библиотека" />
        </button>
        <button onClick={() => setOpenedMenuName('shop')}>
          <img id={'shop'} src={Shop} alt="Магазин" />
        </button>
        <button onClick={() => history.push('/purposes')}>
          <img id={'info'} src={Info} alt="Quizzes" />
        </button>
      </div>
      <GameMenu
        menuName={openedMenuName}
        gameStatus={gameStatus}
        closeMenu={() => setOpenedMenuName('')}
      />
      <div className={'grid2'}>
        <button onClick={() => setOpenedMenuName('university')}>Универ</button>
        <button onClick={() => setOpenedMenuName('work')}>Работа</button>
        <button onClick={() => setOpenedMenuName('hostel')}>Общага</button>
        <button onClick={() => setOpenedMenuName('relax')}>Отдых</button>
      </div>
    </div>
  );
};

export default GameBody;
