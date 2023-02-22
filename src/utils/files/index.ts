export const convertToLocalFile = async (link: string): Promise<File> => {
  const response = await fetch(link);
  const blob = await response.blob();
  const file = new File([blob], 'filename', { type: blob.type });
  return file;
};

export const blobToBase64 = async (blob: Blob) => {
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Поскольку readAsDataURL() возвращает строку, которая начинается с "data:*/*;base64,",
      // мы разделяем строку по запятой и используем вторую часть (после запятой) как base64.
      const base64 = reader.result?.toString().split(',')[1];
      if (base64) {
        resolve(base64);
      } else {
        reject(new Error('Не удалось преобразовать файл в base64.'));
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
};

export const addTextInLocalPhoto = async (
  text: string,
  photo: File,
  _staticText: string
): Promise<{ file: File; blob: Blob; base64: string }> => {
  try {
    // Наложение текста на картинку
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = await createImageBitmap(photo);
    canvas.width = image.width;
    canvas.height = image.height;

    if (context) {
      context.drawImage(image, 0, 0);
      context.fillStyle = 'white';
      context.font = 'bold 16px Roboto';
      context.textBaseline = 'middle';
      context.textAlign = 'center';

      const maxWidth = canvas.width - 20; // Учитываем отступы справа и слева
      const lineHeight = 30;
      let y = canvas.height / 2 - (lineHeight * Math.floor(text.length / 20)) / 2;
      const words = text.split(' ');
      let line = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, canvas.width / 2, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }

      // Добавляем статичный текст с переносом строки, когда достигает ширины изображения
      const staticText = _staticText;
      let staticTextY = canvas.height - 50;
      let staticTextLine = '';

      for (let i = 0; i < staticText.length; i++) {
        const testLine = staticTextLine + staticText[i];
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && i > 0) {
          context.fillText(staticTextLine, canvas.width / 2, staticTextY);
          staticTextLine = staticText[i];
          staticTextY += lineHeight;
        } else {
          staticTextLine = testLine;
        }
      }
      context.fillText(staticTextLine, canvas.width / 2, staticTextY);

      // Преобразуем наши данные в нужный формат
      const base64 = canvas.toDataURL();
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob from canvas'));
            }
          },
          'image/jpeg',
          0.95
        );
      });
      const file = new File([blob], 'new-photo.jpeg', { type: 'image/jpeg' });

      return { file, blob, base64 };
    } else {
      throw new Error('Failed to create canvas context');
    }
  } catch (e) {
    console.log(e);
    throw new Error('Failed to add text to photo');
  }
};
