import SocketService from './SocketService';
import { SOCKET_EVENTS } from '../constants/SocketEvents';
import { getSlugRoute } from '../routes';

class RoomService {
  /**
   * Function to create a new room at the server
   * The room is used to transfer signalling information for
   * webRTC connection between peers
   *
   * @returns Promise to return room slug
   */
  createRoom = (): Promise<string> => {
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
  }

  /**
   * Function to create socket connection with backend to relay signalling information
   * and join room
   *
   * @param roomSlug - slug of room to connect
   */
  joinRoom = (roomSlug: string): void => {
    SocketService.emitEvent(SOCKET_EVENTS.JOIN_ROOM, roomSlug);
  }

  /**
   * Function to return the slug currently present in address bar
   *
   * @returns roomSlug - A kind of human readable room id
   */
  getCurrentRoomSlug = (): string | null => {
    const currentURL = window.location.href;

    return currentURL.split('room/')?.[1];
  }
}

export default new RoomService();
