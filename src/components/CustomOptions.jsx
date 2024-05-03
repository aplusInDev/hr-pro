import { React, useReducer, useState } from 'react'
import FOption from './ui/FOption'
import { Icon } from '@iconify/react';

export default function CustomOptions({
  obj,
  onChange,
  disabled=false
 }) {
  const [text, setText] = useState('');
  const [options, dispatch] = useReducer(
    OptionReducer,
    obj.options
  );

  function handleAddOption() {
    if (!text) {
      return;
    }
    dispatch({ type: 'ADD', id: nextId++, name: text });
    setText('');
    onChange({ ...obj, options: [...obj.options, {id: nextId++, name: text}]});
  }

  function handleChangeOption(option) {
    dispatch({ type: 'EDIT', option: option });
    onChange({ ...obj, options: obj.options.map((o) => {
      return o.id === option.id ? option : o
      })
    });
  }

  function handleRemoveOption(id) {
    dispatch({ type: 'REMOVE', id: id });
    onChange({ ...obj, options: obj.options.filter((o) => o.id !== id)});
  }

  const optionsList = options.map((option) => (
    <li key={option.id}>
      <FOption
        option={option}
        onRemove={handleRemoveOption}
        onChange={handleChangeOption}
        disabled={disabled}
      />
    </li>
  ));


  return (
    <>
      <input name='add-options'
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='options'
        disabled={disabled}
      />
      <button type='button'
        className='add-option-button'
        onClick={handleAddOption}
        disabled={disabled}
      >
        <Icon icon="akar-icons:plus" />
        <span>option</span>
      </button>
      {
        options.length > 0 &&
        <div className='options-list'>
          <ul>
            {optionsList}
          </ul>
        </div>
      }
    </>
  );
}

let nextId = 1;

function OptionReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      if (state.some((o) => o.name === action.name)) {
        return state;
      }
      return [...state, { id: action.id, name: action.name }];
    }
    case 'REMOVE': {
      return state.filter((o) => o.id !== action.id);
    }
    case 'EDIT': {
      return state.map((o) => {
        if (o.id === action.option.id) {
          return action.option;
        }
        return o;
      });
    }
    default:
      return state;
  }
}
