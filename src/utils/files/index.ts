import axios from 'axios';

export const convertToLocalFile = async (link: string): Promise<File> => {
  const response = await fetch(link);
  const blob = await response.blob();
  const file = new File([blob], 'filename', { type: blob.type });
  return file;
};

export const convertToLocalFileInBlob = async (link: string): Promise<Blob> => {
  const response = await fetch(link);
  const blob = await response.blob();
  return blob;
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
      context.font = 'bold 20px Arial';
      context.textBaseline = 'top';
      context.textAlign = 'left';

      const maxWidth = canvas.width - 20; // Учитываем отступы справа и слева
      const lineHeight = 30;
      // let y = canvas.height / 2 - (lineHeight * Math.floor(text.length / 20)) / 2;
      let y = 20;
      const words = text.split(' ');
      let line = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          // context.fillText(line, canvas.width / 2, y);
          context.fillText(line, 10, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }

      context.fillText(line, 10, y);

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

export const addTextInLocalPhotoNew = async (
  text: string,
  photo: File,
  _staticText: string,
  width?: number,
  height?: number
): Promise<{ file: File; blob: Blob; base64: string }> => {
  try {
    // Наложение текста на картинку
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = await createImageBitmap(photo);
    canvas.width = width ? width : image.width;
    canvas.height = height ? height : image.height;

    if (context) {
      context.drawImage(image, 0, 0);
      context.fillStyle = 'white';
      context.font = 'bold 16px Arial';
      context.textBaseline = 'middle';
      context.textAlign = 'left';

      const maxWidth = canvas.width - 40; // Учитываем отступы справа и слева 80
      const lineHeight = 30;
      const maxHeight = canvas.height - 20; // Учитываем отступы сверху и снизу
      const maxLines = Math.floor(maxHeight / lineHeight);

      const lines: string[] = [];
      let currentLine = '';
      let currentHeight = 0;

      text.split(' ').forEach((word) => {
        const testLine = currentLine + word + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && currentHeight < maxLines * lineHeight) {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
          currentHeight += lineHeight;
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }

      if (currentHeight >= maxLines * lineHeight) {
        canvas.height += currentHeight - maxLines * lineHeight + lineHeight;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }

      const _textWidth = context.measureText(lines[0]).width; // ширина первой строки текста
      const _textHeight = lines.length * lineHeight; // высота текста
      const _x = (canvas.width - _textWidth) / 2; // центрируем по горизонтали
      const _y = (canvas.height - _textHeight) / 2; // центрируем по вертикали

      lines.forEach((line, index) => {
        const lineHeight = 30;
        const metrics = context.measureText(line);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        const lineY = _y + index * lineHeight;
        context.fillText(line, _x, lineY);
      });

      const staticText = _staticText;
      const metrics = context.measureText(staticText);
      const textWidth = metrics.width;
      const centerX = canvas.width / 2;
      const staticTextY = canvas.height - 50 - lineHeight * Math.ceil(textWidth / maxWidth);
      const textLines = [];

      // Разбиваем текст на строки, которые помещаются в заданную ширину
      let line = '';
      for (let i = 0; i < staticText.length; i++) {
        const testLine = line + staticText[i];
        const testWidth = context.measureText(testLine).width;
        if (testWidth > maxWidth && i > 0) {
          textLines.push(line);
          line = staticText[i];
        } else {
          line = testLine;
        }
      }
      textLines.push(line);

      // Отрисовываем текст по центру
      context.textAlign = 'center';
      context.textBaseline = 'bottom';
      context.fillStyle = '#fff';
      textLines.forEach((line, index) => {
        context.fillText(line, centerX, staticTextY + index * lineHeight);
      });

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

export const uploadImage = async (image: string | File): Promise<string> => {
  // const apiKey = 'af4ce6c5c4954e45a807d8ad653b30ac';
  const apiKey = process.env.REACT_APP_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error('API ключ ImgBB API не найден');
  }

  const url = 'https://api.imgbb.com/1/upload';

  const formData = new FormData();
  formData.append('key', apiKey);

  if (typeof image === 'string') {
    // Если image - строка в формате base64
    formData.append('image', image);
  } else {
    // Если image - объект File
    formData.append('image', image);
  }

  try {
    const response = await axios.post(url, formData);
    return response.data.data.url;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка загрузки изображения');
  }
};
