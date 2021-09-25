const FileDropperUtil = {
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
   * @returns {[key: string]: File} - File object without duplicates
   */
  getUniqueFiles: async (oldFiles: { [key: string]: File }, newFiles: FileList): Promise<{ [key: string]: File }> => {
    const filesToAdd: { [key: string]: File } = {};

    for (const file of Array.from(newFiles)) {
      const fileDataString = file.name + file.type + file.size + file.lastModified;

      const fileDataHash = await FileDropperUtil.getSHA256(fileDataString);

      filesToAdd[fileDataHash] = file;
    }

    return { ...oldFiles, ...filesToAdd };
  },

  /**
   * Function to calculate the total file size of an array of files
   *
   * @param files - List of all files whose size is to be calculated
   * @returns number - Total file size in bytes
   */
  getAllFilesSize: (filesObject: { [key: string]: File }): number => {
    return Object.keys(filesObject).reduce((acc, fileHash) => {
      return acc + filesObject[fileHash].size;
    }, 0);
  },

  getSHA256: async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);

    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
      .map((b) => {
        return b.toString(16).padStart(2, '0');
      })
      .join('');

    return hashHex;
  },
};

export { FileDropperUtil };
