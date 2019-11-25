import * as React from 'react'
import styled from 'styled-components'
import { getColorByType, getCssTransform } from '../helpers'
import { Icon } from './Icon'
import { NotificationProps, Theme, Placement, Status } from '../types'

interface Props extends NotificationProps {
  width?: string
  theme?: Theme
  placement: Placement
  animationTimeout: number
  defaultTimeout: number
  remove: (id: string) => void
  onClose?: NotificationProps['onClose']
}

abstract class BaseNotification extends React.Component<Props> {
  protected timer?: ReturnType<typeof setTimeout>
  
  protected abstract setTimer(): void
  protected abstract onClose(): void

  protected clearTimer = (): void => {
    this.timer && clearTimeout(this.timer)
  }

  protected onMouseOver = (): void => this.clearTimer()

  protected onMouseOut = (): void => {
    this.setTimer()
  }
}

const NotificationWrapper = styled.div<{width?: string; type?: Status; animationTimeout: number; placement: Placement}>`
  display: flex;
  box-sizing: border-box;
  ${({ width }): string => width ? `width: ${width};` : ''}
  margin-top: 25px;
  border: 2px solid;

  ${({ type = 'success', theme: { colors } }): string => `
      border-color: ${getColorByType(type, colors).border}
    `};

  ${({ animationTimeout }): string => `
      transition: all ${animationTimeout}ms ease-in;
    `};
  ${({ placement }): string => getCssTransform(placement)}
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
const IconWrapper = styled.div<{type: Status}>`
  display: inline-block;
  vertical-align: top;
  flex-shrink: 0;
  padding: 16px 16px;

  ${({ type = 'success', theme: { colors } }): string => `background: ${getColorByType(type, colors).background}`};

  box-sizing: border-box;
`
const ContentWrapper = styled.div`
  display: flex;
  flex-shrink: 1;
  font-size: 16px;
  line-height: 24px;
  padding: 20px 0 20px 20px;
  box-sizing: border-box;
`
const TextWrapper = styled.span<{type: Status; theme: Theme}>`
  ${({ type = '', theme: { colors } }): string => `${type === 'error' ? `color: ${colors.red['600']};` : ''}`}
`
const CloseWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-left: auto;
  margin-right: 0;
  height: 100%;
  padding: 20px 24px;
  box-sizing: border-box;
  cursor: pointer;
`

export class Notification extends BaseNotification {    
  componentDidMount(): void {
    this.setTimer()
  }

  componentWillUnmount(): void {
    this.clearTimer()
  }

  setTimer = (): void => {
    const { id, remove, timeout, defaultTimeout, onClose } = this.props

    if (timeout !== null) {
      this.timer = setTimeout(() => {
        remove(String(id))
        onClose && onClose()
      }, timeout || defaultTimeout)
    }
  }

  onClose = (): void => {
    const { id, remove, onClose } = this.props

    remove(String(id))
    onClose && onClose()
  }

  render(): React.ReactNode {
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
