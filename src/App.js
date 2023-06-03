import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json); //json, 즉 coins을 얻었을 때 json의 값을 setCoins 해줄 것.
        setLoading(false); //하지만 이와 동시에 coins 얻기를 끝냈다면 loading을 fale로 바꿔줄 것.
      }); //json에 data있음, 모든 코인들이 있음
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;

/* Coin Tracker
State 생성 => 1. 하나는 로딩을 위한 거고 2. 또 다른 건 리스트를 잠시 갖고 있기 위한 것
* API 가져옴: https://api.coinpaprika.com/v1/tickers
component가 가장 처음으로 render되었을 때 이 함수를 즉시 실행시키고 싶음, useEffect 생성할 것, 이 Effect는 한 번만 사용

json, 즉 coins을 얻었을 때 json의 값을 setCoins 해줄 것.
하지만 이와 동시에 coins 얻기를 끝냈다면 loading을 fale로 바꿔줄 것.
다른 함수를 사용해서 data를 바꿀 수 있음.
하나의 함수에서는 loading의 state를 반환하고 
또 다른 하나에서 coins의 state를 바꿈.
react.js는 모든 것을 새로고침해서 그걸 우리가 쉽게 하게끔 도와줌.

새로고침하면 API가 빠르게 response한다는 것을 알 수 있음 === coins를 빠르게 가져옴.
coins라는 변수(5줄)에 코인들의 array가 담겨있다는 것을 알고 있음, 이제 무엇을 해야 할까? => array가 있으니, map을 사용하면 됨!
***map => map은 함수가 필요한데, 함수는 첫번째 argument로 차례에 따른 값을 가지고 
그 다음은 index,, 그 다음엔 신경 쓰지 X.
여기서는 coin에 index를 쓸 필요가 없음 -> 이유: id를 가지고 있으니 우리는 id를 key로 써도 됨.
map을 사용하면 react.js는 element에 key를 주도록 했음!

우린 처음에 기본값으로 비어있는 array를 넘겨주기 때문에 coin이 처음에는 0개이다.
적어도 비어있는 array로 두어서 undefined error가 뜨지 않도록 함.
*/
/* 
git commit push 테스트 진행
*/
