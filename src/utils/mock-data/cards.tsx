import { Text } from '@mantine/core';
import { BlockIcon, EditIcon, InfoIcon, TeleportIcon } from '../../assets/icons';
import { IInfoCard } from '../../components/info-card';
import { themeColors } from '../constants/colors';

export const infoCards: IInfoCard[] = [
  {
    header: true,
    headerLeftContent: <Text>Тема дня</Text>,
    headerRightContent: <EditIcon stroke={themeColors.brandWhite[0]} />,
    mainText: (
      <Text sx={{ fontSize: '20px', color: 'white', lineHeight: '24px', fontWeight: 500 }}>
        Моё самое яркое путешествие
      </Text>
    ),
    bgColor: themeColors.brandBlack[0]
  },
  {
    header: true,
    headerCenterContent: <BlockIcon stroke="black" />,
    mainText: (
      <Text color={themeColors.brandBlack[0]} ta="center">
        Конкурсную тему мы откроем Х января 00:01, ты сможешь заполнить её до Х января 23:59
      </Text>
    ),
    bgColor: 'white'
  },
  {
    header: false,
    mainLeftIcon: <InfoIcon stroke="black" />,
    mainText: (
      <Text color={themeColors.brandBlack[0]} ta="start">
        Всё о конкурсе
      </Text>
    ),
    bgColor: 'white'
  },
  {
    header: false,
    mainLeftIcon: <TeleportIcon stroke="black" />,
    mainText: (
      <Text color={themeColors.brandBlack[0]} ta="start">
        Телепорт в группу “Beauty Bomb” в ВКонтакте
      </Text>
    ),
    bgColor: 'white'
  }
];
