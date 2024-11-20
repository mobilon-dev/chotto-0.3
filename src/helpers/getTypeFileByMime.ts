
export const getTypeFileByMime = (mime: string): string|boolean => {
  let type: string | boolean = false;
  if (mime.startsWith("image/")) {
    type = 'image';
  } else if (mime.startsWith("video/")) {
    type = 'video';
  }
  return type;
}
