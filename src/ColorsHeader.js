import React from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import { ReactComponent as Black } from './assets/black.svg'
import { ReactComponent as Blue } from './assets/blue.svg'
import { ReactComponent as Colorless } from './assets/colorless.svg'
import { ReactComponent as Green } from './assets/green.svg'
import { ReactComponent as Red } from './assets/red.svg'
import { ReactComponent as White } from './assets/white.svg'
import { TypographyShadow } from './sharedStyles'

const Container = styled.div`
  display: flex;
  align-items: end;
`

const UnselectedIconButton = styled(IconButton)`
  opacity: 0.4;
  :hover {
    opacity: 0.9;
  }
`

const ButtonContainer = styled.div`
  margin-top: 40px;
`

const StyledWhiteIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(254 251 213 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledBlueIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(170 224 250 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledBlackIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(202 194 190 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledRedIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(249 170 143 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledGreenIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(155 211 174 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledColorlessIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(203 193 191 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const ColorsHeader = ({ setColors, colors }) => {
  const toggleColor = (color) => {
    const newColors = new Set(colors)
    if (colors.has(color)) {
      newColors.delete(color)
    } else {
      newColors.add(color)
    }
    setColors(newColors)
  }

  return (
    <ButtonContainer>
      <Container>
        <Tooltip title='All colors are selected by default' placement='top-start'>
          <TypographyShadow variant='h6' gutterBottom>COLORS</TypographyShadow>
        </Tooltip>
        {colors.size === 0
          ? (
            <Button
              size='small'
              variant='outlined'
              color='default'
              style={{ marginLeft: 20 }}
              onClick={() => setColors(new Set(['C', 'R', 'G', 'B', 'U', 'W']))}
            >SELECT ALL
            </Button>
            )
          : (
            <Button
              size='small'
              variant='outlined'
              color='default'
              style={{ marginLeft: 20 }}
              onClick={() => setColors(new Set())}
            >Clear
            </Button>
            )}
      </Container>
      <Tooltip title='White' placement='bottom'>
        {colors.has('W')
          ? (
            <StyledWhiteIconButton onClick={() => toggleColor('W')} color='primary' aria-label='White Mana' component='span'>
              <White width={50} />
            </StyledWhiteIconButton>
            )
          : (
            <UnselectedIconButton onClick={() => toggleColor('W')} color='primary' aria-label='White Mana' component='span'>
              <White width={50} />
            </UnselectedIconButton>
            )}
      </Tooltip>
      <Tooltip title='Blue' placement='bottom'>
        {colors.has('U')
          ? (
            <StyledBlueIconButton onClick={() => toggleColor('U')} color='primary' aria-label='Blue Mana' component='span'>
              <Blue width={50} />
            </StyledBlueIconButton>
            )
          : (
            <UnselectedIconButton onClick={() => toggleColor('U')} color='primary' aria-label='Blue Mana' component='span'>
              <Blue width={50} />
            </UnselectedIconButton>
            )}
      </Tooltip>
      <Tooltip title='Black' placement='bottom'>
        {colors.has('B')
          ? (
            <StyledBlackIconButton onClick={() => toggleColor('B')} color='primary' aria-label='Black Mana' component='span'>
              <Black width={50} />
            </StyledBlackIconButton>
            )
          : (
            <UnselectedIconButton onClick={() => toggleColor('B')} color='primary' aria-label='Black Mana' component='span'>
              <Black width={50} />
            </UnselectedIconButton>
            )}
      </Tooltip>
      <Tooltip title='Red' placement='bottom'>
        {colors.has('R')
          ? (
            <StyledRedIconButton onClick={() => toggleColor('R')} color='primary' aria-label='Red Mana' component='span'>
              <Red width={50} />
            </StyledRedIconButton>
            )
          : (
            <UnselectedIconButton onClick={() => toggleColor('R')} color='primary' aria-label='Red Mana' component='span'>
              <Red width={50} />
            </UnselectedIconButton>
            )}
      </Tooltip>
      <Tooltip title='Green' placement='bottom'>
        {colors.has('G')
          ? (
            <StyledGreenIconButton onClick={() => toggleColor('G')} color='primary' aria-label='Green Mana' component='span'>
              <Green width={50} />
            </StyledGreenIconButton>
            )
          : (
            <UnselectedIconButton onClick={() => toggleColor('G')} color='primary' aria-label='Green Mana' component='span'>
              <Green width={50} />
            </UnselectedIconButton>
            )}
      </Tooltip>
      <Tooltip title='Colorless' placement='bottom'>
        {colors.has('C')
          ? (
            <StyledColorlessIconButton onClick={() => toggleColor('C')} color='primary' aria-label='Colorless Mana' component='span'>
              <Colorless width={50} />
            </StyledColorlessIconButton>
            )
          : (
            <UnselectedIconButton onClick={() => toggleColor('C')} color='primary' aria-label='Colorless Mana' component='span'>
              <Colorless width={50} />
            </UnselectedIconButton>
            )}
      </Tooltip>
    </ButtonContainer>
  )
}

export default ColorsHeader
