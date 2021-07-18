import React, { useMemo } from 'react'
import CardImages from './CardImages'
import styled from 'styled-components'
import { TypographyShadow } from './sharedStyles'
import cards from './ratings.json'

const LIMIT = 500

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
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

const CardMatches = ({
  searchTerm,
  rarities,
  colors
}) => {
  const matches = useMemo(() => {
    if (searchTerm.length > 0) {
      return cards.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    } else {
      return cards.filter(c => hasColor(c, colors) && hasRarity(c, rarities)).slice(0, LIMIT)
    }
  }, [searchTerm, rarities, colors])

  const sortedCards = useMemo(() => matches.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => parseFloat(b.gihWR.substring(0, 4)) - parseFloat(a.gihWR.substring(0, 4))), [matches])

  if (matches.length === 0) {
    return <TypographyShadow variant='h6' gutterBottom>No cards match your filters</TypographyShadow>
  }

  if (sortedCards?.length > 0) {
    return (
      <FlexContainer>
        <CardImages cards={sortedCards} />
      </FlexContainer>
    )
  }
}

export default CardMatches
