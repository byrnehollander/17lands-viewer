import { useState } from 'react'
import styled from 'styled-components'
import CardMatches from './CardMatches'
import ColorsHeader from './ColorsHeader'
import RaritiesHeader from './RaritiesHeader'
import DescriptionBlock from './DescriptionBlock'
import Search from './Search'
import { TypographyShadow } from './sharedStyles'
import './App.css'
import './Rune.css'

const Container = styled.div`
  margin: 5vw;
`

const OptionsContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  @media only screen and (max-width: 1300px) {
    flex-direction: column;
  }
`

function App () {
  const [searchTerm, setSearchTerm] = useState('')
  const [colors, setColors] = useState(new Set(['C', 'R', 'G', 'B', 'U', 'W']))
  const [rarities, setRarities] = useState(new Set(['common', 'uncommon', 'rare', 'mythic']))

  return (
    <Container>
      <TypographyShadow variant='h3' gutterBottom>How good is this card?</TypographyShadow>
      <DescriptionBlock />
      <OptionsContainer>
        <ColorsHeader
          setColors={setColors}
          colors={colors}
        />
        <RaritiesHeader
          setRarities={setRarities}
          rarities={rarities}
        />
      </OptionsContainer>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <CardMatches
        searchTerm={searchTerm}
        rarities={rarities}
        colors={colors}
      />
    </Container>
  )
}

export default App
