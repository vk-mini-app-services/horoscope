import { Box, Button, Image, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { useStores } from '../../../../../utils/hooks/useStores';
import { getUserToken } from '../../../../../utils/vk/bridge-methods';
import { useStyles } from './styles';
import scroll from '../../../../../assets/img/scroll.png';
import defaultResultPhoto from '../../../../../assets/img/access-publish-photo/pic14.png';
import { postPhotoOnWall } from '../../../../../utils/vk/sharing-method';
import { convertToLocalFileInBlob } from '../../../../../utils/files';
interface IAccessPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

export const AccessPanel: FC<IAccessPanelProps> = observer(({ setActivePanel }) => {
  const { classes } = useStyles();
  const { UserStore } = useStores();

  const handleAction = useCallback(async (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.dataset.value;

    if (value === 'yes') {
      const token = await getUserToken('friends,wall,photos,stories,groups');

      if (token) {
        UserStore.setUserToken(token);
        const blob = await convertToLocalFileInBlob(defaultResultPhoto);
        await postPhotoOnWall(blob, token);
        setActivePanel('select');
      }
    } else {
      setActivePanel('select');
    }
  }, []);

  return (
    <Box className={classes.container}>
      <Image src={scroll} width={200} height={200} />

      <Box sx={{ width: '100%' }}>
        <Text fw={600} ta="center" size="xl" color="white" mb={12}>
          Хотите опубликовать свой демонический гороскоп в фотоальбом?
        </Text>
      </Box>

      <Box className={classes.actions}>
        <Button
          data-value="yes"
          color="button.0"
          onClick={handleAction}
          radius={8}
          w="49%"
          sx={{ fontWeight: 500 }}
        >
          Да
        </Button>
        <Button
          data-value="no"
          color="button.4"
          onClick={handleAction}
          radius={8}
          w="49%"
          sx={{ fontWeight: 500 }}
        >
          Нет
        </Button>
      </Box>
    </Box>
  );
});
