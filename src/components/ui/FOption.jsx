import { React, useState } from 'react'
import { Icon } from '@iconify/react';

export default function FOption({
  option,
  onRemove,
  onChange,
  disabled=false
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(option.name);

  function handleSave() {
    setIsEditing(false);
    onChange({ ...option, name: text });
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleRemove() {
    onRemove(option.id);
  }
  
  return (
    <>
      {
        isEditing ? (
          <>
            <input name='foption'
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Option'
              autoFocus
            />
            <button type='button'
              className='option-btn'
              onClick={handleSave}
            >
              <Icon icon="akar-icons:check" />
            </button>
          </>
        ) : (
          <>
            <h4>{option.name}</h4>
            { disabled || (
            <button type='button'
              className='option-btn'
              onClick={handleEdit}
            >
              <Icon icon="akar-icons:edit" />
            </button>
            )}
          </>
        )
      }
      { disabled || (
      <button type='button'
        className='option-btn'
        onClick={handleRemove}
      >
        <Icon icon="akar-icons:trash" />
      </button>
      )}
    </>
  );
}
