import { FC, ReactNode } from 'react';
import { Box } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStyles } from './styles';

export interface IInfoCard {
  header?: boolean;
  headerLeftContent?: ReactNode;
  headerCenterContent?: ReactNode;
  headerRightContent?: ReactNode;
  mainLeftIcon?: ReactNode;
  mainText?: string | ReactNode;
  bgColor?: string;
  fontColor?: string;
}

const InfoCard: FC<IInfoCard> = observer(
  ({
    header,
    headerLeftContent,
    headerCenterContent,
    headerRightContent,
    mainLeftIcon,
    mainText,
    bgColor,
    fontColor
  }) => {
    const { classes } = useStyles();

    return (
      <Box className={classes.card} sx={{ backgroundColor: bgColor, color: fontColor }}>
        {header && (
          <Box className={classes.header}>
            <Box className={classes.headerLeftContent}>{headerLeftContent}</Box>
            <Box className={classes.headerCenterContent}>{headerCenterContent}</Box>
            <Box className={classes.headerRightContent}>{headerRightContent}</Box>
          </Box>
        )}
        <Box className={classes.main}>
          {mainLeftIcon && <Box className={classes.mainLeftIcon}>{mainLeftIcon}</Box>}
          <Box className={classes.mainText}>{mainText}</Box>
        </Box>
      </Box>
    );
  }
);

export { InfoCard };
