export function load_google_maps() {
  return new Promise(function (resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function () {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = process.env.REACT_APP_API_KEY;
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export function load_hotspots() {
  let lat = 12.84
  let lng = 77.61
  var apiURL = `https://ebird.org/ws2.0/ref/hotspot/geo?lat=${lat}&lng=${lng}&fmt=json`
  return fetch(apiURL, {
    headers: {
      'X-eBirdApiToken': 'bbrc0dgm44c7'
    }
  }).then(resp => resp.json())
}

