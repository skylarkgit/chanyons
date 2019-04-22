import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
// import { google } from '@agm/core/services/google-maps-types';
declare const google: any;

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;

  markers = [
    {lat: 51, lng: 7},
    {lat: 51.5, lng: 7},
    {lat: 51, lng: 7.5},
    {lat: 51.5, lng: 7.5}];

  @ViewChild('gmap') gmap: AgmMap;

  constructor() { }

  ngOnInit() {
    this.markers.forEach(marker => marker['icon'] = ({url: 'https://robohash.org/74854DFE0280928C5984670DCC20CA74.png', scaledSize: {
      width: 40,
      height: 60
    }})
    );
    this.gmap.mapReady.subscribe(map => {
      const bounds = new google.maps.LatLngBounds();
      for (const mm of this.markers) {
        bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
      }
      map.fitBounds(bounds);
    });
  }

}

// style = [
//   {
//     'elementType': 'geometry',
//     'stylers': [
//       {
//         'color': '#212121'
//       }
//     ]
//   },
//   {
//     'elementType': 'labels.icon',
//     'stylers': [
//       {
//         'visibility': 'off'
//       }
//     ]
//   },
//   {
//     'elementType': 'labels.text.fill',
//     'stylers': [
//       {
//         'color': '#757575'
//       }
//     ]
//   },
//   {
//     'elementType': 'labels.text.stroke',
//     'stylers': [
//       {
//         'color': '#212121'
//       }
//     ]
//   },
//   {
//     'featureType': 'administrative',
//     'elementType': 'geometry',
//     'stylers': [
//       {
//         'color': '#757575'
//       }
//     ]
//   },
//   {
//     'featureType': 'administrative.country',
//     'elementType': 'labels.text.fill',
//     'stylers': [
//       {
//         'color': '#9e9e9e'
//       }
//     ]
//   },
//   {
//     'featureType': 'administrative.land_parcel',
//     'stylers': [
//       {
//         'visibility': 'off'
//       }
//     ]
//   },
//   {
//     'featureType': 'administrative.locality',
//     'elementType': 'labels.text.fill',
//     'stylers': [
//       {
//         'color': '#bdbdbd'
//       }
//     ]
//   },
//   {
//     'featureType': 'administrative.neighborhood',
//     'stylers': [
//       {
//         'visibility': 'off'
//       }
//     ]
//   },
//   {
//     'featureType': 'poi',
//     'elementType': 'labels.text',
//     'stylers': [
//       {
//         'visibility': 'off'
//       }
//     ]
//   },
//   {
//     'featureType': 'poi',
//     'elementType': 'labels.text.fill',
//     'stylers': [
//       {
//         'color': '#757575'
//       }
//     ]
//   },
//   {
//     'featureType': 'poi.business',
//     'stylers': [
//       {
//         'visibility': 'off'
//       }
//     ]
//   },
//   {
//     'featureType': 'poi.park',
//     'elementType': 'geometry',
//     'stylers': [
//       {
//         'color': '#181818'
//       }
//     ]
//   },
//   {
//     'featureType': 'poi.park',
//     'elementType': 'labels.text.fill',
//     'stylers': [
//       {
//         'color': '#616161'
//       }
//     ]
//   },
//   {
//     'featureType': 'poi.park',
//     'elementType': 'labels.text.stroke',
//     'stylers': [
//       {
//         'color': '#1b1b1b'
//       }
//     ]
//   },
//   {
//     'featureType': 'road',
//     'stylers': [
//       {
//         'visibility': 'off'
//       }
//     ]
//   },
//   {
//     'featureType': 'road',
//     'elementType': 'geometry.fill',
//     'stylers': [
//       {
//         'color': '#2c2c2c'
//       }
//     ]
//   },
//   {
//     'featureType': 'road',
//     'elementType': 'labels',
//     'stylers': [
//       {
//         'visibility': 'off'
//       }
//     ]
//   },
//   {
//     'featureType': 'road',
//     'elementType': 'labels.icon',
//     'stylers': [
//       {
//         'visibility': 'off'
//       }
//     ]
//   },
//   {
//     'featureType': 'road',
//     'elementType': 'labels.text.fill',
//     'stylers': [
//       {
//         'color': '#8a8a8a'
//       }
//     ]
//   },
//   {
//     'featureType': 'road.arterial',
//     'elementType': 'geometry',
//     'stylers': [
//       {
//         'color': '#373737'
//       }
//     ]
//   },
//   {
//     'featureType': 'road.highway',
//     'elementType': 'geometry',
//     'stylers': [
//       {
//         'color': '#3c3c3c'
//       }
//     ]
//   },
//   {
//     'featureType': 'road.highway.controlled_access',
//     'elementType': 'geometry',
//     'stylers': [
//       {
//         'color': '#4e4e4e'
//       }
//     ]
//   },
//   {
//     'featureType': 'road.local',
//     'elementType': 'labels.text.fill',
//     'stylers': [
//       {
//         'color': '#616161'
//       }
//     ]
//   },
//   {
//     'featureType': 'transit',
//     'stylers': [
//       {
//         'visibility': 'off'
//       }
//     ]
//   },
//   {
//     'featureType': 'transit',
//     'elementType': 'labels.text.fill',
//     'stylers': [
//       {
//         'color': '#757575'
//       }
//     ]
//   },
//   {
//     'featureType': 'water',
//     'elementType': 'geometry',
//     'stylers': [
//       {
//         'color': '#000000'
//       }
//     ]
//   },
//   {
//     'featureType': 'water',
//     'elementType': 'labels.text',
//     'stylers': [
//       {
//         'visibility': 'off'
//       }
//     ]
//   },
//   {
//     'featureType': 'water',
//     'elementType': 'labels.text.fill',
//     'stylers': [
//       {
//         'color': '#3d3d3d'
//       }
//     ]
//   }
// ];
