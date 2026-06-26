'use client';

import { Fragment } from 'react/jsx-runtime';

import { ThemeCycleButton } from './ThemeCycleButton';
import { ThemeGroupControl } from './ThemeGroupControl';

export function ThemeSwitcher() {
  return (
    <Fragment>
      <div
        className={`
          hidden
          sm:block
        `}
      >
        <ThemeGroupControl />
      </div>

      <div className='sm:hidden'>
        <ThemeCycleButton />
      </div>
    </Fragment>
  );
}
