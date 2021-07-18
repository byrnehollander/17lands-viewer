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

  const toggleColor = (color) => {
    const newColors = new Set(colors)
    if (colors.has(color)) {
      newColors.delete(color)
    } else {
      newColors.add(color)
    }
    setColors(newColors)
  }

  const toggleRarity = (rarity) => {
    const newRarities = new Set(rarities)
    if (rarities.has(rarity)) {
      newRarities.delete(rarity)
    } else {
      newRarities.add(rarity)
    }
    setRarities(newRarities)
  }

  return (
    <Container>
      <TypographyShadow variant='h3' gutterBottom>How good is this card?</TypographyShadow>
      <DescriptionBlock />
      <OptionsContainer>
        <ColorsHeader
          setColors={setColors}
          toggleColor={toggleColor}
          colors={colors}
        />
        <RaritiesHeader
          setRarities={setRarities}
          rarities={rarities}
          toggleRarity={toggleRarity}
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
