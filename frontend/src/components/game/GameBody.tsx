import React, { FunctionComponent, useState } from 'react';
import { getDayInUniversity } from '../../utilities/dataStorage';
import { useHistory } from 'react-router-dom';

import GameMenu from './GameMenu';

interface IProps {
  characterName: string;
}

const GameBody: FunctionComponent<IProps> = ({ characterName }: IProps) => {
  const daysInUniversity = getDayInUniversity();
  const history = useHistory();
  const [openedMenuName, setOpenedMenuName] = useState<
    '' | 'Библиотека' | 'Магазин' | 'Универ' | 'Работа' | 'Общага' | 'Отдых'
  >('');

  return (
    <div>
      <div>
        <span>Имя:</span>
        {characterName}
      </div>
      <div>
        <span>В универе:</span>
        {daysInUniversity} дня
      </div>

      <button onClick={() => setOpenedMenuName('Библиотека')}>
        Библиотека
      </button>
      <button onClick={() => setOpenedMenuName('Магазин')}>Магазин</button>
      <button onClick={() => history.push('/purposes')}>Quizzes</button>

      <GameMenu
        menuName={openedMenuName}
        closeMenu={() => setOpenedMenuName('')}
      />

      <button onClick={() => setOpenedMenuName('Универ')}>Универ</button>
      <button onClick={() => setOpenedMenuName('Работа')}>Работа</button>
      <button onClick={() => setOpenedMenuName('Общага')}>Общага</button>
      <button onClick={() => setOpenedMenuName('Отдых')}>Отдых</button>
    </div>
  );
};

export default GameBody;
