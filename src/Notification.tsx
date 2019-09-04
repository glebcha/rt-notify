import * as React from 'react'
import styled from 'styled-components'
import { getColorByType, getCssTransform } from './helpers'
import { Icon } from './components/Icon'
import { INotification } from './types'

type Props = INotification & {
  width?: string
  placement: string
  animationTimeout: number
  defaultTimeout: number
  remove: (id: string) => void
  onClose?: INotification['onClose']
}

const NotificationWrapper = styled('div')`
  display: flex;
  box-sizing: border-box;
  ${({ width }): string => width ? `width: ${width};` : ''}
  margin-top: 25px;
  border: 2px solid;

  ${({ type = '', theme: { colors } }): string => `
      border-color: ${getColorByType(type, colors).border}
    `};

  ${({ animationTimeout }): string => `
      transition: all ${animationTimeout}ms ease-in;
    `};
  ${({ placement }: {placement: string}) => getCssTransform(placement)}
  box-sizing: border-box;

  &.notification-enter,
  &.notification-exit-active {
    opacity: 0.01;
  }

  &.notification-enter-active,
  &.notification-exit-active {
    transition: all 800ms ease-in;
  }

  &.notification-exit,
  &.notification-enter-active {
    opacity: 1;
  }
`
const IconWrapper = styled('div')`
  display: inline-block;
  vertical-align: top;
  flex-shrink: 0;
  padding: 16px 16px;

  ${({ type = '', theme: { colors } }): string => `
      background: ${getColorByType(type, colors).background}
    `};

  box-sizing: border-box;
`
const ContentWrapper = styled('div')`
  display: flex;
  flex-shrink: 1;
  font-size: 16px;
  line-height: 24px;
  padding: 20px 0 20px 20px;
  box-sizing: border-box;
`
const TextWrapper = styled('span')`
  ${({ type, theme: { colors } }): string => 
    `${type === 'error' ? `color: ${colors.red['600']};` : ''}`}
`
const CloseWrapper = styled('div')`
  display: flex;
  flex-shrink: 0;
  margin-left: auto;
  margin-right: 0;
  height: 100%;
  padding: 20px 24px;
  box-sizing: border-box;
`

export class Notification extends React.Component<Props> {
  timer: ReturnType<typeof setTimeout> | null = null

  componentDidMount() {
    this.setTimer()
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  setTimer = () => {
    const { id, remove, timeout, defaultTimeout, onClose } = this.props

    if (timeout !== null) {
      this.timer = setTimeout(() => {
        remove(String(id))
        onClose && onClose()
      }, timeout || defaultTimeout)
    }
  }

  onClose = () => {
    const { id, remove, onClose } = this.props

    remove(String(id))
    onClose && onClose()
  }

  onMouseOver = () => {
    this.timer && clearTimeout(this.timer)
  }

  onMouseOut = () => {
    this.setTimer()
  }

  render() {
    const {
      width,
      type = 'success',
      content = 'Sample Notifier',
      placement,
      animationTimeout,
    } = this.props

    return (
      <NotificationWrapper
        type={type}
        width={width}
        placement={placement}
        animationTimeout={animationTimeout}
        className={placement}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <IconWrapper type={type}>
          <Icon fill='#fff' width='32' viewBox='0 0 500 500' name={type} />
        </IconWrapper>
        <ContentWrapper>
          <TextWrapper type={type}>{content}</TextWrapper>
        </ContentWrapper>
        <CloseWrapper>
          <Icon fill='#a1a9b2' width='24' viewBox='0 0 500 500' name="cross" onClick={this.onClose} />
        </CloseWrapper>
      </NotificationWrapper>
    )
  }
}
