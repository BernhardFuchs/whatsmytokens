import { style, media } from 'typestyle';
import { mediaBreakWidth } from '@core/base.styles';

export const address_container = style(
  {
    display: 'flex',
    flexDirection: 'column',
    margin: '2% 3%'
  },
  media(
    { minWidth: mediaBreakWidth },
    {
      display: 'flex',
      flexDirection: 'row'
    }
  )
);

export const address_formField = style(
  media(
    { minWidth: mediaBreakWidth },
    {
      flexBasis: '300px',
      marginRight: '5px'
    }
  )
);
