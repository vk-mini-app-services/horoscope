import { Box, Button, Text, Collapse } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { useStyles } from './styles';
import { IZodiac } from '../../../../../types';
import { getAllHoroscopes } from '../../../../../api';
import { showNotification } from '@mantine/notifications';
import { zodiacRus } from '../../../../../utils/mock-data/zodiac-signs';
import { ScrollContainer } from '../../../../../components/scroll-container';
import { IconChevronUp } from '@tabler/icons';

export const GetAllHoroscopePanel = observer(() => {
  const { classes, theme } = useStyles();

  const [list, setList] = useState<IZodiac[]>([]);

  const openCollapse = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.dataset.id) ?? '';

    setList((prevState) =>
      prevState.map((item) => {
        return {
          ...item,
          checked: item.id === id ? !item.checked : item.checked
        };
      })
    );
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllHoroscopes();

        if (data) {
          if (data.success) {
            const convertData = data.message.map((item: any) => ({ ...item, checked: false }));
            setList(convertData);
          } else {
            showNotification({
              title: data.message,
              message: '',
              autoClose: 10_000,
              color: 'red'
            });
          }
        }
      } catch (e) {
        showNotification({
          title: 'Ошибка!',
          message: '',
          autoClose: 2_000,
          color: 'red'
        });
      }
    })();
  }, []);

  return (
    <Box className={classes.container}>
      <ScrollContainer sx={{ height: `calc(100vh - 280px)`, width: '100%', marginBottom: '24px' }}>
        {list.map((item: IZodiac) => {
          return (
            <Box key={item.id} className={classes.collapseContainer}>
              <Button
                className={classes.collapseBtn}
                data-id={item.id}
                onClick={openCollapse}
                fullWidth
                rightIcon={
                  <IconChevronUp
                    className={classes.chevron}
                    size={24}
                    stroke={1.5}
                    style={{
                      transform: item.checked
                        ? `rotate(${theme.dir === 'rtl' ? -180 : 180}deg)`
                        : 'none'
                    }}
                  />
                }
              >
                {item.date}
              </Button>
              <Collapse in={item.checked} className={classes.collapse}>
                {Object.entries(item).map((zodiac, index) => {
                  const [key, value] = zodiac;
                  const checkValue = key === 'id' || key === 'checked' || key === 'date';
                  const itemValue = zodiacRus[key] ? zodiacRus[key] : checkValue;
                  return (
                    <>
                      {!checkValue ? (
                        <Text key={index} color="white">
                          {itemValue} : {value}
                        </Text>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </Collapse>
            </Box>
          );
        })}
      </ScrollContainer>
    </Box>
  );
});
