export const getDateOfRegistration = (): Date => new Date();

export interface GameStatus {
  gameLevel: number;
  characterName: string;
  heartsPoint: number;
  satietyLevel: number;
  mentalStrength: number;
  money: number;
  educationLevel: number;
  careLevel: number;
  isDead: boolean;
}

export const newGameObj: GameStatus = {
  gameLevel: 1,
  characterName: 'Sam',
  heartsPoint: 100,
  satietyLevel: 100,
  mentalStrength: 100,
  money: 5000,
  educationLevel: 25,
  careLevel: 75,
  isDead: false,
};

export let gameObj: GameStatus = { ...newGameObj };

export const newGame = (characterName: string): boolean => {
  gameObj = { ...newGameObj, characterName };
  return true;
};

export const getGameObj = async (): Promise<GameStatus> => gameObj;

export const getUserAvatar = (): null => null;

export const setGameObj = (gameObject: GameStatus): void => {
  gameObj = gameObject;
};
