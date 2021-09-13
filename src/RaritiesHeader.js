import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { TypographyShadow } from './sharedStyles'

const SET_CODE = 'mid'

const FlexEndContainer = styled.div`
  display: flex;
  align-items: end;
`

const SetIconLarge = styled.span`
  font-size: 40px;
`

const SelectedRarityIconButton = withStyles({
  label: {
    padding: 4,
    boxShadow: 'inset 0 0 12px 10px rgb(255 255 255 / 15%), 0 0 5px 3px rgb(255 255 255 / 15%)',
    borderRadius: 100
  }
})(IconButton)

const UnselectedIconButton = styled(IconButton)`
  opacity: 0.4;
  :hover {
    opacity: 0.9;
  }
`

const RarityContainer = styled.div`
  margin-top: 40px;
  margin-left: 50px;
  @media only screen and (max-width: 1300px) {
    margin-left: 0px;
  }
`

const RaritiesHeader = ({ setRarities, rarities }) => {
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
    <RarityContainer>
      <FlexEndContainer>
        <Tooltip title='All rarities are selected by default' placement='top-start'>
          <TypographyShadow variant='h6' gutterBottom>RARITIES</TypographyShadow>
        </Tooltip>
        {rarities.size === 0
          ? (
            <Button
              size='small'
              variant='outlined'
              color='default'
              style={{ marginLeft: 20 }}
              onClick={() => setRarities(new Set(['common', 'uncommon', 'rare', 'mythic']))}
            >SELECT ALL
            </Button>
            )
          : (
            <Button
              size='small'
              variant='outlined'
              color='default'
              style={{ marginLeft: 20 }}
              onClick={() => setRarities(new Set())}
            >Clear
            </Button>
            )}
      </FlexEndContainer>
      <Tooltip title='Common' placement='bottom'>
        {rarities.has('common')
          ? (
            <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('common')} color='primary' aria-label='Common Cards' component='span'>
              <SetIconLarge className={`ss ss-common ss-grad ss-${SET_CODE}`} />
            </SelectedRarityIconButton>
            )
          : (
            <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('common')} color='primary' aria-label='Common Cards' component='span'>
              <SetIconLarge className={`ss ss-common ss-grad ss-${SET_CODE}`} />
            </UnselectedIconButton>
            )}
      </Tooltip>
      <Tooltip title='Uncommon' placement='bottom'>
        {rarities.has('uncommon')
          ? (
            <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('uncommon')} color='primary' aria-label='Uncommon Cards' component='span'>
              <SetIconLarge className={`ss ss-uncommon ss-grad ss-${SET_CODE}`} />
            </SelectedRarityIconButton>
            )
          : (
            <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('uncommon')} color='primary' aria-label='Uncommon Cards' component='span'>
              <SetIconLarge className={`ss ss-uncommon ss-grad ss-${SET_CODE}`} />
            </UnselectedIconButton>
            )}
      </Tooltip>
      <Tooltip title='Rare' placement='bottom'>
        {rarities.has('rare')
          ? (
            <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('rare')} color='primary' aria-label='Rare Cards' component='span'>
              <SetIconLarge className={`ss ss-rare ss-grad ss-${SET_CODE}`} />
            </SelectedRarityIconButton>
            )
          : (
            <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('rare')} color='primary' aria-label='Rare Cards' component='span'>
              <SetIconLarge className={`ss ss-rare ss-grad ss-${SET_CODE}`} />
            </UnselectedIconButton>
            )}
      </Tooltip>
      <Tooltip title='Mythic' placement='bottom'>
        {rarities.has('mythic')
          ? (
            <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('mythic')} color='primary' aria-label='Mythic Cards' component='span'>
              <SetIconLarge className={`ss ss-mythic ss-grad ss-${SET_CODE}`} />
            </SelectedRarityIconButton>
            )
          : (
            <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('mythic')} color='primary' aria-label='Mythic Cards' component='span'>
              <SetIconLarge className={`ss ss-mythic ss-grad ss-${SET_CODE}`} />
            </UnselectedIconButton>
            )}
      </Tooltip>
    </RarityContainer>
  )
}

export default RaritiesHeader
