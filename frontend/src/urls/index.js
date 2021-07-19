const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

export const shopsIndex = `${DEFAULT_API_LOCALHOST}/shops`
export const photosIndex = (shopId) =>
  `${DEFAULT_API_LOCALHOST}/shops/${shopId}/photos`
export const linePhotos = `${DEFAULT_API_LOCALHOST}/line_photos`;
export const linePhotosReplace = `${DEFAULT_API_LOCALHOST}/line_photos/replace`;
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;
