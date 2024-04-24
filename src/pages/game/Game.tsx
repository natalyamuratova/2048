import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Board} from "../../components/board/board.tsx";
import {GameSelectors} from "../../store/game/selectors.ts";
import {resetState} from "../../store/game";

export const Game = () => {
  const dispatch = useDispatch();

  const score = useSelector(GameSelectors.selectScore);

  useEffect(() => {
    document.addEventListener('touchstart', function(e: TouchEvent) {
      e.preventDefault();
      e.stopPropagation();
      document.documentElement.style.overflow = 'hidden';
    });

    document.addEventListener('touchend', function(e: TouchEvent) {
      e.preventDefault();
      e.stopPropagation();
      document.documentElement.style.overflow = 'auto';
    });

    return () => { dispatch(resetState()); };
  }, []);

  return (
    <>
      <h2>Счет: {score}</h2>
      <Board/>
    </>
  )
}
