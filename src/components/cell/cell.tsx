import { FC } from "react";
import './cell.scss';

interface CellProps {
  value: number;
}

export const Cell: FC<CellProps> = ({ value }) => {
  const cellValue = value > 0 ? value : '';
  const cellValueClass = value > 0 ? `x${value}` : '';

  return (
    <div className={`cell ${cellValueClass}`}>
      {cellValue}
    </div>
  )
}
