import React, { useState } from "react";

const giaiThuong = [
  "không",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín",
];
export default function GamePage() {
  const [dataGame, setDatagame] = useState();
  const clickGame = () => {
    const number = Math.floor(Math.random() * giaiThuong.length);
    setDatagame(giaiThuong[number]);
    // console.log(giaiThuong[number]);
  };
  return (
    <div>
      <h2>Giải {dataGame || "không có giải thưởng"}</h2>
      <button type="button" onClick={clickGame}>
        Click
      </button>
    </div>
  );
}
