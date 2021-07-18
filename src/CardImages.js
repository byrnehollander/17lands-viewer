import React, { useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import Tilty from 'react-tilty'
import styled from 'styled-components'
import { calculateDiffFromAverageWinRate } from './helpers'

const MobileCardsContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  min-width: 90vw;
`

const CardImages = ({ cards }) => {
  const smallMode = useMemo(() => cards?.length > 2, [cards])

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

export default CardImages
