import { TEXT_HEADER } from '../../constants'
import { Header } from '../Header/Header'
import { Search } from '../Search/Search'

export const GlobalHeader = () => {
  return (
    <>
      <Header text={TEXT_HEADER} variant='header-primary' />
      <Search />
    </>
  )
}
