import { Box, Button } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { InfoCard } from '../../../../../components/info-card';
import { useStores } from '../../../../../utils/hooks/useStores';
import { getUserToken } from '../../../../../utils/vk/bridge-methods';
import { useStyles } from './styles';

interface IAccessPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

export const AccessPanel: FC<IAccessPanelProps> = observer(({ setActivePanel }) => {
  const { classes } = useStyles();
  const { UserStore } = useStores();

  const handleAction = useCallback(async (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.dataset.value;

    if (value === 'yes') {
      const hasToken = await getUserToken('friends,wall,photos,stories');

      if (hasToken) {
        UserStore.setUserToken(hasToken);
        setActivePanel('select');
      }
    } else {
      setActivePanel('select');
    }
  }, []);

  return (
    <Box className={classes.container}>
      <Box sx={{ width: '100%' }}>
        <InfoCard
          fontSize="16px"
          height="100px"
          bgColor="#15aabf"
          fontColor="white"
          mainText="Хотите опубликовать свой демонический гороскоп в фотоальбом?"
        />
      </Box>

      <Box className={classes.actions}>
        <Button data-value="yes" color="cyan" onClick={handleAction} radius={8} w="49%">
          Да
        </Button>
        <Button data-value="no" color="cyan" onClick={handleAction} radius={8} w="49%">
          Нет
        </Button>
      </Box>
    </Box>
  );
});
