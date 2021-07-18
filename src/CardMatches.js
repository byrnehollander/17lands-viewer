import React from 'react'
import { isMobile } from 'react-device-detect'
import Tilty from 'react-tilty'
import styled from 'styled-components'
import { TypographyShadow } from './sharedStyles'
import { calculateDiffFromAverageWinRate } from './helpers'
import cards from './ratings.json'

const LIMIT = 500

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const MobileCardsContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  min-width: 90vw;
`

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

const types = new Set(['Instant'])

const CardMatches = ({
  searchTerm,
  rarities,
  colors
}) => {
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
        {card.gihWRCount > 0 ? (<div style={{ marginBottom: 20 }}>17Lands: <b>{card.gihWR}</b> [{calculateDiffFromAverageWinRate(card.gihWR.substring(0, 4))}] ({card.gihWRCount})</div>) : ''}
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

  return (
    <>
      {renderMatches(types, colors)}
    </>
  )
}

export default CardMatches
