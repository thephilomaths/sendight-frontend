import { getSlugRoute } from '../routes';

const RoomService = {
  /**
   * Function to create a new room at the server
   * The room is used to transfer signalling information for
   * webRTC connection between peers
   *
   * @returns Promise to return room slug
   */
  createRoom: (): Promise<string> => {
    return new Promise((resolve, reject) => {
      fetch(getSlugRoute)
        .then((response) => {
          if (!response.ok) {
            throw response;
          }

          // Parsing response
          response
            .json()
            .then((json) => {
              resolve(json && json.data && json.data.slug);
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  /**
   * Function to return the slug currently present in address bar
   *
   * @returns roomSlug - A kind of human readable room id
   */
  getCurrentRoomSlug: (): string | null => {
    const pathNameRegex = new RegExp(
      /\/room\/(?<roomSlug>[a-zA-Z]+-[a-zA-Z]+)$/
    );
    const currentUrl = new URL(window.location.href);

    const { groups: { roomSlug = null } = {} } =
      pathNameRegex.exec(currentUrl.pathname) || {};

    return roomSlug;
  },
};

export { RoomService };
