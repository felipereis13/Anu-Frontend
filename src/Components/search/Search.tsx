import { Search } from 'iconoir-react';
import { Autocomplete } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import classes from './Search.module.css';
import Anu from '../../assets/ANU - Apresentação Identidade Visual 2.png'

export function HeaderSearch() {
  const { width } = useViewportSize();
  
  const placeholder = width <= 576 ? '' : 'No que podemos te ajudar hoje?';

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
          placeholder={placeholder}
          rightSection={
            <Search
              width={16} 
              stroke="1.5" 
              color='#A39787'
            />
          }
          size='md'
        />
      </div>
    </header>
  );
}