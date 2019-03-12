export const IMAGE_EXTENSIONS = ['jpg', 'bmp', 'jpeg', 'png', 'gif', 'svg'];
export const TEXT_EXTENSIONS = ['txt', 'log', 'yaml', 'yml', 'json', 'csv',
                                'tsv', 'md', 'rst', ];

export const isTextExtension = (path) => {
  let ext = path.split(/[./]/);
  ext = ext[ext.length - 1].toLowerCase();

  return TEXT_EXTENSIONS.includes(ext);
};

export const isImageExtension = (path) => {
  let ext = path.split(/[./]/);
  ext = ext[ext.length - 1].toLowerCase();
  
  return IMAGE_EXTENSIONS.includes(ext);
};
