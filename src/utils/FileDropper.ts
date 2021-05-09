const FileDropperUtil = {
  isDuplicateInList: (newFile: File, oldFiles: Array<File>): boolean => {
    return oldFiles.some((file) => {
      return FileDropperUtil.isEqual(newFile, file);
    });
  },

  isEqual: (file1: File, file2: File): boolean => {
    return (
      file1.name === file2.name &&
      file1.size === file2.size &&
      file1.lastModified === file2.lastModified
    );
  },

  formatBytes: (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  },

  getUniqueFiles: (oldFiles: Array<File>, newFiles: FileList): Array<File> => {
    const filesToAdd = Array.from(newFiles).reduce((acc: Array<File>, file) => {
      if (!FileDropperUtil.isDuplicateInList(file, oldFiles)) {
        acc.push(file);
      }

      return acc;
    }, []);

    return [...oldFiles, ...filesToAdd];
  },
};

export { FileDropperUtil };
