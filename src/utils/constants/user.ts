// получение ID пользователя который зашел в приложение
export const USER_ID = Number(new URLSearchParams(document.location.search).get('vk_user_id'));
export const vkValidationParams = globalThis.location.search;
