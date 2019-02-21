import { style, media } from 'typestyle';
import { mediaBreakWidth } from '@core/base.styles';

export const hide_on_mobile = style(
  media({ minWidth: mediaBreakWidth }, { display: 'none' })
);
