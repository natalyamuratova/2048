import {useSelector} from "react-redux";
import {Board} from "../../components/board/board.tsx";
import {GameSelectors} from "../../store/game/selectors.ts";

export const Game = () => {
  const score = useSelector(GameSelectors.selectScore);

  return (
    <>
      <h2>Счет: {score}</h2>
      <Board/>
    </>
  )
}
