import { useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Typography from '@material-ui/core/Typography'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { useHotkeys } from 'react-hotkeys-hook'
import Tilty from 'react-tilty'
import ColorsHeader from './ColorsHeader'
import RaritiesHeader from './RaritiesHeader'
import DescriptionBlock from './DescriptionBlock'
import './App.css'
import './Rune.css'
import cards from './ratings.json'

const LIMIT = 500

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

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const MobileCardsContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  min-width: 90vw;
`

const SearchContainer = styled.div`
  margin-bottom: 40px;
`

const SearchInputAndClearButton = styled.div`
  display: flex;
`

/* const hasType = (card, types) => {
  if (!card.types) {
    return false
  }
  const cardTypesArray = card.types
  for (let i = 0; i <= cardTypesArray.length; i++) {
    if (types.has(cardTypesArray[i])) {
      return true
    }
  }
  return false
} */

const hasColor = (card, colors) => {
  if (!card.colors) {
    return false
  }
  const cardColorsArray = card.colors
  for (let i = 0; i <= cardColorsArray.length; i++) {
    if (colors.has(cardColorsArray[i])) {
      return true
    }
  }
  return false
}

const hasRarity = (card, rarities) => {
  return rarities.has(card.rarity)
}

const TypographyShadow = styled(Typography)`
  text-shadow: 1px 2px 3px rgb(0 0 0 / 70%);
`

const types = new Set(['Instant'])

function App () {
  const textInput = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [colors, setColors] = useState(new Set(['C', 'R', 'G', 'B', 'U', 'W']))
  const [rarities, setRarities] = useState(new Set(['common', 'uncommon', 'rare', 'mythic']))
  useHotkeys('cmd+k', () => textInput.current.focus())

  const clearSearchInputAndFocus = () => {
    textInput.current.focus()
    setSearchTerm('')
  }

  const getMatches = (types, colors) => {
    if (searchTerm.length > 0) {
      return cards.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    } else {
      return cards.filter(c => hasColor(c, colors) && hasRarity(c, rarities)).slice(0, LIMIT)
    }
  }

  const renderMatches = (types, colors) => {
    const matches = getMatches(types, colors)
    if (matches.length === 0) {
      return <TypographyShadow variant='h6' gutterBottom>No cards match your filters</TypographyShadow>
    }
    return renderMatchesByCMC(matches)
  }

  const renderSingleImage = (url, name, width) => {
    return <img src={url} alt={name} width={width} />
  }

  const renderImage = (url, name, width) => {
    if (url.includes('/back/')) {
      const front = url.replace('/back/', '/front/')
      return (
        <>
          {renderSingleImage(front, name, width)}
          {renderSingleImage(url, name, width)}
        </>
      )
    }
    return renderSingleImage(url, name, width)
  }

  const renderImages = (cards) => {
    let smallMode = false
    if (cards.length > 2) {
      smallMode = true
    }
    if (isMobile) {
      return cards.map((c, i) => {
        return (
          <MobileCardsContainer key={i}>
            <div style={{ marginRight: 10, width: 'fit-content' }}>
              {renderImage(c.image, c.name, 150)}
            </div>
            <div style={{ width: 'calc(90vw-155)', marginLeft: 5, marginTop: 8 }}>
              {renderRatingAndDescription(c, 14)}
            </div>
          </MobileCardsContainer>
        )
      })
    }
    return cards.map((c, i) => {
      return (
        <div key={i}>
          <Tilty
            scale={1.05}
            max={8}
            style={{ minWidth: smallMode ? 330 : 450, marginRight: 20, marginBottom: 20 }}
          >
            {renderImage(c.image, c.name, smallMode ? 320 : 440)}
          </Tilty>
          {/* <div style={{ display: 'flex', width: smallMode ? 310 : 420, marginLeft: smallMode ? 10 : 30, marginBottom: 70 }}>
             <b style={{ marginRight: 20, fontSize: 20 }}>{c.rating.toFixed(1)}</b> // LSV Rating */}
          <div style={{ width: smallMode ? 310 : 420, marginLeft: smallMode ? 10 : 30, marginBottom: 70 }}>
            {renderRatingAndDescription(c, 18)}
          </div>
        </div>
      )
    })
  }

  const renderRatingAndDescription = (card, fontSize) => {
    const arr = []
    arr.push(
      <div style={{ fontSize: fontSize, marginBottom: 5 }}>
        {card.gihWRCount > 0 ? (<div style={{ marginBottom: 20 }}>17Lands: <b>{card.gihWR}</b> ({card.gihWRCount})</div>) : ''}
        <div><b>{card.rating.toFixed(1)}</b> (LSV)</div>
        <div>{card.lsvDescription}</div>
      </div>
    )
    return arr
  }

  const renderMatchesByCMC = (elements, CMC) => {
    const filteredCards = elements.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => parseFloat(b.gihWR.substring(0, 4)) - parseFloat(a.gihWR.substring(0, 4)))
    if (filteredCards.length > 0) {
      return (
        <FlexContainer>
          {renderImages(filteredCards)}
        </FlexContainer>
      )
    }
  }

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
      <SearchContainer>
        <SearchInputAndClearButton>
          <FormControl color='secondary' variant='outlined' style={{ width: 300 }}>
            <InputLabel style={{ color: 'white' }} htmlFor='search-input'>Search</InputLabel>
            <OutlinedInput autoFocus inputRef={textInput} color='secondary' id='search-input' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} label='Search' />
          </FormControl>
          <Button
            size='large'
            variant='outlined'
            color='default'
            style={{ marginLeft: 20 }}
            onClick={clearSearchInputAndFocus}
          >Clear
          </Button>
        </SearchInputAndClearButton>
        <div style={{ marginLeft: 5, marginTop: 10 }}>When searching, your other filters will be ignored</div>
      </SearchContainer>
      {renderMatches(types, colors)}
    </Container>
  )
}

export default App
