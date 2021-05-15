const FileDropperUtil = {
  /**
   * Function to check if there exist a duplicate to new file in the old
   * files list
   *
   * @param newFile
   * @param oldFiles
   * @returns boolean - Whether duplicate exist or not
   */
  isDuplicateInList: (newFile: File, oldFiles: Array<File>): boolean => {
    return oldFiles.some((file) => {
      return FileDropperUtil.isEqual(newFile, file);
    });
  },

  /**
   * Function to check if two files are equal
   *
   * TODO: A very naive method, try to implement a better one
   *
   * @param file1
   * @param file2
   * @returns boolean - Whether two files are equal or not
   */
  isEqual: (file1: File, file2: File): boolean => {
    return (
      file1.name === file2.name &&
      file1.size === file2.size &&
      file1.lastModified === file2.lastModified
    );
  },

  /**
   * Function to convert bytes into human readable format
   *
   * @param bytes
   * @param decimals
   * @returns string - Human readable format of bytes input
   */
  formatBytes: (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  },

  /**
   * Function to find out unique files in two file list
   * basically a union of two file list
   *
   * @param oldFiles
   * @param newFiles
   * @returns Array<File> - File list without duplicates
   */
  getUniqueFiles: (oldFiles: Array<File>, newFiles: FileList): Array<File> => {
    const filesToAdd = Array.from(newFiles).reduce((acc: Array<File>, file) => {
      if (!FileDropperUtil.isDuplicateInList(file, oldFiles)) {
        acc.push(file);
      }

      return acc;
    }, []);

    return [...oldFiles, ...filesToAdd];
  },

  /**
   * Function to calculate the total file size of an array of files
   *
   * @param files - List of all files whose size is to be calculated
   * @returns number - Total file size in bytes
   */
  getAllFilesSize: (files: Array<File>): number => {
    return files.reduce((acc, { size }) => {
      return acc + size;
    }, 0);
  },
};

export { FileDropperUtil };
