import React, { FunctionComponent, useState } from 'react';
import { GameStatus, getDayInUniversity } from '../../utilities/dataStorage';
import { useHistory } from 'react-router-dom';

import GameMenu from './GameMenu';
import './GameBode.css';
interface IProps {
  gameStatus: GameStatus;
}

const GameBody: FunctionComponent<IProps> = ({ gameStatus }: IProps) => {
  const daysInUniversity = getDayInUniversity();
  const history = useHistory();
  const [openedMenuName, setOpenedMenuName] = useState<
    '' | 'Библиотека' | 'Магазин' | 'Универ' | 'Работа' | 'Общага' | 'Отдых'
  >('');

  const daysInUniversityString = `${daysInUniversity} ${
    daysInUniversity === 1
      ? 'день'
      : daysInUniversity <= 4 && daysInUniversity > 1
      ? 'дня'
      : 'дней'
  }`;

  return (
    <div>
      <div>
        <span>Имя:</span>
        {gameStatus.characterName}
      </div>
      <div>
        <span>В универе:</span>
        {daysInUniversityString}
      </div>

      <button onClick={() => setOpenedMenuName('Библиотека')}>
        Библиотека
      </button>
      <button onClick={() => setOpenedMenuName('Магазин')}>Магазин</button>
      <button onClick={() => history.push('/purposes')}>Quizzes</button>

      <GameMenu
        menuName={openedMenuName}
        gameStatus={gameStatus}
        closeMenu={() => setOpenedMenuName('')}
      />
      <div className={'grid2'}>
        <button onClick={() => setOpenedMenuName('Универ')}>Универ</button>
        <button onClick={() => setOpenedMenuName('Работа')}>Работа</button>
        <button onClick={() => setOpenedMenuName('Общага')}>Общага</button>
        <button onClick={() => setOpenedMenuName('Отдых')}>Отдых</button>
      </div>
    </div>
  );
};

export default GameBody;
