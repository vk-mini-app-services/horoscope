import { Box, Image, Loader } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useStyles } from './styles';

interface IPhotoResultProps {
  photo: string;
}

export const PhotoResult: FC<IPhotoResultProps> = observer(({ photo }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      {photo ? (
        <Image
          radius="md"
          src={photo}
          alt="Результат совместимости"
          height={`calc(100vh - 250px)`}
          fit="contain"
        />
      ) : (
        <Loader />
      )}
    </Box>
  );
});
