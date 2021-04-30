# Vanilla - Redux

### Learning Vanilla-Redux and React-Redux

#### vanilla-Count

```js
const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

let count = 0;

const updateNumber = () => {
  number.innerText = count;
};
const handleAdd = () => {
  count = count + 1;
  console.log(count);
  updateNumber();
};
const handleMinus = () => {
  count = count - 1;
  console.log(count);
  updateNumber();
};
add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);
```

#### vanilla-Redux-Count

```js
import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

number.innerText = 0;
const ADD = 'add';
const MINUS = 'minus';

const countModify = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModify);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);
add.addEventListener('click', () => countStore.dispatch({ type: ADD }));
minus.addEventListener('click', () => countStore.dispatch({ type: MINUS }));
```
