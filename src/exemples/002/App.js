import React, { useState, useEffect } from 'react';

function App() {
  const [type, setType] = useState('users');
  const [data, setData] = useState([]);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  // console.log('Component render');

  // useEffect(() => {
  //   console.log('render');
  // });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((response) => response.json())
      .then((json) => setData(json));

    return () => {
      console.log('clean type');
    };
  }, [type]);

  const mouseMoveHandler = (event) => {
    setPos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    console.log('ComponentDidMount');

    window.addEventListener('mousemove', (event) => mouseMoveHandler);

    return () => {
      window.removeEventListener('mousemove', (event) => mouseMoveHandler);
    };
  }, []);

  return (
    <div>
      <h1>
        <em>Ресурс:</em> <b>{type}</b>
      </h1>

      <button onClick={() => setType('users')}>Пользователи</button>
      <button onClick={() => setType('Todos')}>Todos</button>
      <button onClick={() => setType('posts')}>Посты</button>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <pre>{JSON.stringify(pos, null, 2)}</pre>
    </div>
  );
}

export default App;
