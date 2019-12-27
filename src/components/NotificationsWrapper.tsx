import styled from 'styled-components';
import { Placement } from '../types';

export const NotificationsWrapper = styled.div<{placement: Placement}>`
    position: fixed;
    z-index: 999999;
    max-width: 80%;
    
    &.top, &.bottom {
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    
    &.top {  
      top: 0;
      padding: 15px 0 0 0;
    }
    
    &.bottom {
      bottom: 0;
      padding: 0 0 15px 0;
    }
    
    &.left {
      bottom 0;
      left: 0;
      padding: 0 0 15px 15px;
    }
    
    &.right {
      bottom 0;
      right: 0;
      padding: 0 15px 15px 0;
    }
    `;
