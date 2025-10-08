import { Search } from 'iconoir-react';
import { Autocomplete } from '@mantine/core';
import classes from './Search.module.css';
import Anu from '../../assets/ANU - Apresentação Identidade Visual 2.png'

export function HeaderSearch() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <img 
          src={Anu}
          alt="Logo"
          width={107} 
          className={classes.logo}
        />
        <Autocomplete
          className={classes.search}
          placeholder="No que podemos te ajudar hoje?"
          rightSection={
            <Search
              width={16} 
              stroke="1.5" 
              color='#A39787'
            />
          }
          visibleFrom="xs"
          size='md'
        />
      </div>
    </header>
  );
}