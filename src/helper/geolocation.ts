import {Coordinates} from "../type/coordinates";

export function getGeolocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const coordinates: Coordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          resolve(coordinates);
        },
        function (error) {
          console.error("Помилка отримання геоданих:", error.message);
          reject(error);
        }
      );
    } else {
      reject(new Error("Геолокація не підтримується браузером"));
    }
  });
}
