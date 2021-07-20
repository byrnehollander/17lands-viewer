import React, { useMemo } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import {
  LAST_UPDATED,
  WIN_RATES_BY_COLOR,
  AVERAGE_WIN_RATE,
  FORMAT_NAME
} from './aggregateData'
import { calculateDiffFromAverageWinRate } from './helpers'

const StyledAccordionDetails = withStyles({
  root: {
    flexDirection: 'column'
  }
})(AccordionDetails)

const DescriptionBlock = () => {
  const SORTED_WIN_RATES_BY_COLOR = useMemo(() => {
    const items = Object.keys(WIN_RATES_BY_COLOR).map(function (key) {
      return [key, WIN_RATES_BY_COLOR[key]]
    })

    return items.sort((first, second) => {
      return second[1] - first[1]
    })
  }, [])

  const renderWinRatesByColor = useMemo(() => {
    return SORTED_WIN_RATES_BY_COLOR.map((c, i) => {
      const diff = calculateDiffFromAverageWinRate(c[1])
      return <li key={i}><div style={{ minWidth: 120, display: 'inline-block' }}><i>{c[0]}</i>:</div><div style={{ minWidth: 55, display: 'inline-block' }}>{c[1].toFixed(1)}%</div> ({diff})</li>
    })
  }, [SORTED_WIN_RATES_BY_COLOR])

  return (
    <Accordion defaultExpanded={false} style={{ maxWidth: 980 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography variant='h6' style={{ fontWeight: 400, fontSize: 16 }}>Learn more about this site</Typography>
      </AccordionSummary>
      <StyledAccordionDetails>
        <Typography variant='h6' gutterBottom style={{ maxWidth: 950, fontWeight: 400, fontSize: 16 }}>
          This site uses <Link color='textPrimary' onClick={(event) => event.preventDefault()} href='https://www.17lands.com/card_ratings' target='_blank' rel='noopener noreferrer'>17Lands</Link> data to show how {FORMAT_NAME} cards perform.
        </Typography>
        <Typography variant='h6' gutterBottom style={{ maxWidth: 950, fontWeight: 400, fontSize: 16 }}>
          All percentages are for the <b>Games In Hand Win Rate</b> (GIH WR) metric for Premier Draft as of {LAST_UPDATED}. This is the win rate of games where the card was drawn at some point (including in the opening hand). The number in square brackets is the difference from 17Lands users' average win rate. The number in parentheses is the number of games used to calculate the win rate (i.e., number of games where the card was ever in the player's hand). There seems to be some consensus that GIH WR is the best metric currently on 17Lands, but note that it is biased towards late game cards.
        </Typography>
        <Typography variant='h6' gutterBottom style={{ maxWidth: 950, fontWeight: 400, fontSize: 16 }}>
          Also note that the collective average win rate from 17Lands users is <b>{AVERAGE_WIN_RATE}%</b> (in Adventures in the Forgotten Realms Premier Draft).
        </Typography>
        <Typography variant='h6' style={{ maxWidth: 950, fontWeight: 400, fontSize: 16 }}>
          Lastly, here are the win rates by color pair for 17Lands users (looking at <i>exactly</i> 2 colors):
          <ol>
            {renderWinRatesByColor}
          </ol>
        </Typography>
      </StyledAccordionDetails>
    </Accordion>
  )
}

export default DescriptionBlock
