import { Box, Image, Loader } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { addTextInLocalPhoto, convertToLocalFile } from '../../utils/files';

interface IPhotoResultProps {
  localLink: string;
  resultText: string;
}

export const PhotoResult: FC<IPhotoResultProps> = observer(({ localLink, resultText }) => {
  const [photo, setPhoto] = useState<string>('');

  useEffect(() => {
    (async () => {
      const photFile = await convertToLocalFile(localLink);
      const { base64 } = await addTextInLocalPhoto(resultText, photFile, '');
      setPhoto(base64);
    })();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {photo ? (
        <Box sx={{ width: '200px', height: '400px' }}>
          <Image radius="md" src={photo} alt="Результат совместимости" />
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
});
