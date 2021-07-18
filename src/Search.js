import React from 'react'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 40px;
`

const SearchInputAndClearButton = styled.div`
  display: flex;
`

const Search = ({
  clear,
  textRef,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <Container>
      <SearchInputAndClearButton>
        <FormControl color='secondary' variant='outlined' style={{ width: 300 }}>
          <InputLabel style={{ color: 'white' }} htmlFor='search-input'>Search</InputLabel>
          <OutlinedInput
            autoFocus
            inputRef={textRef}
            color='secondary'
            id='search-input'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label='Search'
          />
        </FormControl>
        <Button
          size='large'
          variant='outlined'
          color='default'
          style={{ marginLeft: 20 }}
          onClick={clear}
        >Clear
        </Button>
      </SearchInputAndClearButton>
      <div style={{ marginLeft: 5, marginTop: 10 }}>When searching, your other filters will be ignored</div>
    </Container>
  )
}

export default Search
