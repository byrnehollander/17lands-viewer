import React, { useMemo } from 'react'
import CardImages from './CardImages'
import styled from 'styled-components'
import { TypographyShadow } from './sharedStyles'
import cards from './ratingsPairs.json'

const LIMIT = 500

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const hasColor = (card, colors) => {
  const colorless = ['C']
  let cardColors = card.colors || colorless
  if (cardColors?.length === 0) {
    cardColors = colorless
  }
  return cardColors.some(c => colors.has(c))
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
      const term = searchTerm.toLowerCase().trim()
      return cards.filter(c => c.name.toLowerCase().includes(term) || c.keywords.join(' ').toLowerCase().includes(term) || c.type.toLowerCase().includes(term))
    } else {
      return cards.filter(c => hasColor(c, colors) && hasRarity(c, rarities)).slice(0, LIMIT)
    }
  }, [searchTerm, rarities, colors])

  const sortedCards = useMemo(() => matches.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => parseFloat(b.gihWRByColors.Overall?.gihWR.substring(0, 4) || 0) - parseFloat(a.gihWRByColors.Overall?.gihWR.substring(0, 4)  || 0)), [matches])
  
  if (matches.length === 0) {
    return <TypographyShadow variant='h6' gutterBottom>No cards match your filters</TypographyShadow>
  }

  if (sortedCards?.length > 0) {
    return (
      <>
        {sortedCards?.length > 2 && <TypographyShadow variant='h6' gutterBottom>Showing {sortedCards.length} cards</TypographyShadow>}
        <FlexContainer>
          <CardImages cards={sortedCards} />
        </FlexContainer>
      </>
    )
  }
}

export default CardMatches
