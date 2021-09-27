import React, { useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import Tilty from 'react-tilty'
import styled from 'styled-components'
import {
  calculateDiffFromAverageWinRate,
  calculateDiffFromAverageBGWinRate,
  calculateDiffFromAverageBRWinRate,
  calculateDiffFromAverageRGWinRate,
  calculateDiffFromAverageUBWinRate,
  calculateDiffFromAverageUGWinRate,
  calculateDiffFromAverageURWinRate,
  calculateDiffFromAverageWBWinRate,
  calculateDiffFromAverageWGWinRate,
  calculateDiffFromAverageWRWinRate,
  calculateDiffFromAverageWUWinRate
} from './helpers'

const MobileCardsContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  min-width: 90vw;
`

const CardImages = ({ cards }) => {
  const smallMode = useMemo(() => cards?.length > 2, [cards])

  const renderRows = (gihWRByColors) => {
    const items = Object.keys(gihWRByColors).map(function(key) {
      return [key, gihWRByColors[key]];
    })
    
    items.sort(function(first, second) {
      return parseFloat(second[1].gihWR) - parseFloat(first[1].gihWR)
    })

    return items.map((item, i) => {
      const [colorPairName, color] = item
      if (color.gihWRCount > 0) {
        let func = calculateDiffFromAverageWinRate
        if (colorPairName === "BG") {
          func = calculateDiffFromAverageBGWinRate
        }
        else if (colorPairName === "BR") {
          func = calculateDiffFromAverageBRWinRate
        }
        else if (colorPairName === "RG") {
          func = calculateDiffFromAverageRGWinRate
        }
        else if (colorPairName === "UB") {
          func = calculateDiffFromAverageUBWinRate
        }
        else if (colorPairName === "UG") {
          func = calculateDiffFromAverageUGWinRate
        }
        else if (colorPairName === "UR") {
          func = calculateDiffFromAverageURWinRate
        }
        else if (colorPairName === "WB") {
          func = calculateDiffFromAverageWBWinRate
        }
        else if (colorPairName === "WG") {
          func = calculateDiffFromAverageWGWinRate
        }
        else if (colorPairName === "WR") {
          func = calculateDiffFromAverageWRWinRate
        }
        else if (colorPairName === "WU") {
          func = calculateDiffFromAverageWUWinRate
        }
        return (
          <div key={i} style={{ marginBottom: 20 }}>{colorPairName}: <b>{color.gihWR}</b> [{func(color.gihWR.substring(0, 4))}] ({color.gihWRCount})</div>
        )
      }
      return ""
    })
  }

  const renderRatingAndDescription = (card, fontSize) => {
    const arr = []
    arr.push(
      <div style={{ fontSize: fontSize, marginBottom: 5 }}>
        {renderRows(card.gihWRByColors)}
      </div>
    )
    return arr
  }

  const renderSingleImage = (url, name, width) => {
    return <img src={url} alt={name} width={width} />
  }

  const renderImage = (url, backUrl, name, width) => {
    if (backUrl != null) {
      return (
        <>
          {renderSingleImage(url, name, width)}
          {renderSingleImage(backUrl, name, width)}
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
            {renderImage(c.image, c.backImage, c.name, 150)}
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
          style={{ minWidth: smallMode ? 298 : 406, marginRight: 20, marginBottom: 20 }}
        >
          {renderImage(c.image, c.backImage, c.name, smallMode ? 288 : 396)}
        </Tilty>
        <div style={{ width: smallMode ? 278 : 386, marginLeft: smallMode ? 10 : 30, marginBottom: 70 }}>
          {renderRatingAndDescription(c, 18)}
        </div>
      </div>
    )
  })
}

export default CardImages
