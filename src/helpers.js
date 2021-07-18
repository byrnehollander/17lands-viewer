import { AVERAGE_WIN_RATE } from './aggregateData'

export const calculateDiffFromAverageWinRate = (colorWinRate) => {
  let delta = (colorWinRate - AVERAGE_WIN_RATE).toFixed(2)
  if (delta > 0) {
    delta = '+' + delta
  }
  return delta
}
