import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Compass, 
  Navigation, 
  Layers, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  ChevronDown,
  Info
} from 'lucide-react';
import { 
  ALL_INDIA_STATES_LIST, 
  stateDistrictsData, 
  getDistrictInfo 
} from '../data/districtDirectory';
import { 
  fetchGeoDistricts, 
  fetchGeoSubdistricts, 
  reverseGeocodeCoordinates 
} from '../services/api';

const LocationCatchmentPicker = ({
  formData,
  setFormData,
  lang = 'en'
}) => {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState(null);
  const [districtsList, setDistrictsList] = useState([]);
  const [subdistrictsList, setSubdistrictsList] = useState([]);
  const [isLeafletReady, setIsLeafletReady] = useState(false);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  const currentLat = formData.latitude || 18.5204;
  const currentLon = formData.longitude || 73.8567;
  const currentRadius = Number(formData.catchment_radius_km) || 5;

  // 1. Initialize Leaflet from CDN dynamically if not globally present
  useEffect(() => {
    let isMounted = true;

    const loadLeaflet = async () => {
      if (window.L) {
        if (isMounted) setIsLeafletReady(true);
        return;
      }

      // Add CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Add Script
      if (!document.getElementById('leaflet-js')) {
        const script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = () => {
          if (isMounted) setIsLeafletReady(true);
        };
        document.body.appendChild(script);
      }
    };

    loadLeaflet();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Setup Map Instance
  useEffect(() => {
    if (!isLeafletReady || !mapContainerRef.current || !window.L) return;

    try {
      if (!mapInstanceRef.current) {
        // Prevent "Map container is already initialized" error in React StrictMode
        if (mapContainerRef.current._leaflet_id) {
          mapContainerRef.current._leaflet_id = null;
        }

        const map = window.L.map(mapContainerRef.current, {
          center: [currentLat, currentLon],
          zoom: 12,
          zoomControl: true
        });

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);

        // Custom Pin Icon
        const customPin = window.L.divIcon({
          className: 'custom-pin',
          html: `<div style="background-color: #0B3D91; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-weight: bold;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 34]
        });

        const marker = window.L.marker([currentLat, currentLon], {
          draggable: true,
          icon: customPin
        }).addTo(map);

        const circle = window.L.circle([currentLat, currentLon], {
          radius: currentRadius * 1000,
          color: '#0B3D91',
          fillColor: '#3B82F6',
          fillOpacity: 0.18,
          weight: 2
        }).addTo(map);

        // Click on map to relocate pin
        map.on('click', async (e) => {
          const { lat, lng } = e.latlng;
          marker.setLatLng([lat, lng]);
          circle.setLatLng([lat, lng]);
          await handleCoordinatesResolved(lat, lng);
        });

        // Drag pin to relocate
        marker.on('dragend', async () => {
          const pos = marker.getLatLng();
          circle.setLatLng(pos);
          await handleCoordinatesResolved(pos.lat, pos.lng);
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;
        circleRef.current = circle;
      } else {
        // Update existing map view
        mapInstanceRef.current.setView([currentLat, currentLon], 12);
        if (markerRef.current) markerRef.current.setLatLng([currentLat, currentLon]);
        if (circleRef.current) {
          circleRef.current.setLatLng([currentLat, currentLon]);
          circleRef.current.setRadius(currentRadius * 1000);
        }
      }
    } catch (mapErr) {
      console.warn('Leaflet map init notice:', mapErr);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, [isLeafletReady]);

  // Update radius circle dynamically
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setRadius(currentRadius * 1000);
    }
  }, [currentRadius]);

  // Load districts when State changes
  useEffect(() => {
    const loadDistricts = async () => {
      const stateObj = stateDistrictsData.find(
        s => s.state.toLowerCase() === (formData.state || '').toLowerCase()
      );
      if (stateObj && stateObj.districts?.length > 0) {
        setDistrictsList(stateObj.districts);
      } else {
        const fetched = await fetchGeoDistricts(formData.state);
        setDistrictsList(fetched.map(d => (typeof d === 'string' ? { name: d, nameHi: d } : d)));
      }
    };
    if (formData.state) {
      loadDistricts();
    }
  }, [formData.state]);

  // Load subdistricts when District changes
  useEffect(() => {
    const loadSubdistricts = async () => {
      const stateObj = stateDistrictsData.find(
        s => s.state.toLowerCase() === (formData.state || '').toLowerCase()
      );
      const distObj = stateObj?.districts?.find(
        d => d.name.toLowerCase() === (formData.district || '').toLowerCase()
      );
      
      if (distObj?.subdistricts?.length > 0) {
        setSubdistrictsList(distObj.subdistricts);
      } else {
        const fetched = await fetchGeoSubdistricts(formData.state, formData.district);
        setSubdistrictsList(fetched);
      }
    };
    if (formData.state && formData.district) {
      loadSubdistricts();
    }
  }, [formData.state, formData.district]);

  // Resolve geocoded address when pin changes
  const handleCoordinatesResolved = async (lat, lon) => {
    try {
      const geoData = await reverseGeocodeCoordinates(lat, lon);
      if (geoData) {
        // 1. Resolve State
        const targetState = geoData.state || formData.state || 'Maharashtra';
        const stateObj = stateDistrictsData.find(
          s => s.state.toLowerCase() === targetState.toLowerCase() ||
               targetState.toLowerCase().includes(s.state.toLowerCase()) ||
               s.state.toLowerCase().includes(targetState.toLowerCase())
        );
        const resolvedState = stateObj?.state || targetState;

        // 2. Resolve District
        let targetDist = geoData.district || '';
        let matchedDistObj = null;
        if (stateObj && targetDist) {
          const cleanTarget = targetDist.toLowerCase().replace(/\b(district|division|taluka|tehsil)\b/gi, '').trim();
          matchedDistObj = stateObj.districts.find(d => {
            const dClean = d.name.toLowerCase();
            return dClean === cleanTarget || dClean.includes(cleanTarget) || cleanTarget.includes(dClean);
          });
        }

        const resolvedDistrict = matchedDistObj ? matchedDistObj.name : (targetDist || formData.district || 'Nagpur');

        // Update districts list for state
        if (stateObj) {
          setDistrictsList(stateObj.districts);
        } else if (resolvedDistrict) {
          setDistrictsList(prev => {
            if (prev.some(d => d.name.toLowerCase() === resolvedDistrict.toLowerCase())) return prev;
            return [...prev, { name: resolvedDistrict, nameHi: resolvedDistrict }];
          });
        }

        // 3. Resolve Sub-districts (Tehsils)
        let availableSubs = matchedDistObj?.subdistricts || [];
        let resolvedSub = geoData.sub_district || (availableSubs.length > 0 ? availableSubs[0] : `${resolvedDistrict} Sadar`);
        
        if (availableSubs.length > 0) {
          const matchSub = availableSubs.find(s => {
            const sLower = s.toLowerCase();
            const gLower = (geoData.sub_district || '').toLowerCase();
            return sLower === gLower || gLower.includes(sLower) || sLower.includes(gLower);
          });
          if (matchSub) resolvedSub = matchSub;
          setSubdistrictsList(availableSubs);
        } else {
          setSubdistrictsList([resolvedSub, `${resolvedDistrict} Sadar`, `${resolvedDistrict} North`, `${resolvedDistrict} South`]);
        }

        setFormData(prev => ({
          ...prev,
          latitude: Number(lat.toFixed(5)),
          longitude: Number(lon.toFixed(5)),
          state: resolvedState,
          district: resolvedDistrict,
          sub_district: resolvedSub,
          village_or_town: geoData.village_or_town || prev.village_or_town || '',
          pincode: geoData.pincode || prev.pincode || ''
        }));
      }
    } catch (e) {
      console.warn('Coordinates reverse geocode failed:', e);
    }
  };

  // 3. Browser GPS Geolocation Handler
  const handleDetectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGpsError(lang === 'hi' ? 'आपके ब्राउज़र में जीपीएस लोकेशन सुविधा उपलब्ध नहीं है।' : 'GPS geolocation is not supported by your browser.');
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setGpsLoading(false);

        if (mapInstanceRef.current && markerRef.current && circleRef.current) {
          mapInstanceRef.current.setView([lat, lon], 13);
          markerRef.current.setLatLng([lat, lon]);
          circleRef.current.setLatLng([lat, lon]);
        }

        await handleCoordinatesResolved(lat, lon);
      },
      (err) => {
        setGpsLoading(false);
        console.warn('Geolocation permission error:', err);
        setGpsError(
          lang === 'hi' 
            ? 'कृपया लोकेशन अनुमति (Location Permission) को अनुमति दें या नीचे दिए गए नक्शे पर अपनी दुकान/फार्म का स्थान चुनें।' 
            : 'Please enable Location Permissions in browser, or click your exact spot on the map below.'
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // State selection handler
  const handleStateSelect = (selectedState) => {
    const stateObj = stateDistrictsData.find(s => s.state === selectedState);
    const firstDistObj = stateObj?.districts?.[0];
    const firstDist = firstDistObj?.name || '';
    const firstSub = firstDistObj?.subdistricts?.[0] || '';

    setDistrictsList(stateObj?.districts || []);
    setSubdistrictsList(firstDistObj?.subdistricts || []);

    setFormData(prev => ({
      ...prev,
      state: selectedState,
      district: firstDist,
      sub_district: firstSub,
      latitude: firstDistObj?.lat || prev.latitude,
      longitude: firstDistObj?.lon || prev.longitude
    }));

    if (firstDistObj?.lat && firstDistObj?.lon && mapInstanceRef.current) {
      mapInstanceRef.current.setView([firstDistObj.lat, firstDistObj.lon], 11);
      if (markerRef.current) markerRef.current.setLatLng([firstDistObj.lat, firstDistObj.lon]);
      if (circleRef.current) circleRef.current.setLatLng([firstDistObj.lat, firstDistObj.lon]);
    }
  };

  // District selection handler
  const handleDistrictSelect = (selectedDistrict) => {
    const stateObj = stateDistrictsData.find(
      s => s.state.toLowerCase() === (formData.state || '').toLowerCase()
    );
    const distObj = stateObj?.districts?.find(d => d.name === selectedDistrict);
    const firstSub = distObj?.subdistricts?.[0] || `${selectedDistrict} Sadar`;

    setSubdistrictsList(distObj?.subdistricts || [firstSub]);

    setFormData(prev => ({
      ...prev,
      district: selectedDistrict,
      sub_district: firstSub,
      latitude: distObj?.lat || prev.latitude,
      longitude: distObj?.lon || prev.longitude
    }));

    if (distObj?.lat && distObj?.lon && mapInstanceRef.current) {
      mapInstanceRef.current.setView([distObj.lat, distObj.lon], 12);
      if (markerRef.current) markerRef.current.setLatLng([distObj.lat, distObj.lon]);
      if (circleRef.current) circleRef.current.setLatLng([distObj.lat, distObj.lon]);
    }
  };

  const estimatedPopulation = Math.round(3.14159 * (currentRadius ** 2) * 260);

  return (
    <div className="space-y-5 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      
      {/* Header & GPS Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-[#0B3D91] dark:text-blue-400">
            <Compass className="w-5 h-5 text-[#FF9933]" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              {lang === 'hi' ? 'व्यावसायिक स्थान व 5-10 किमी कैचमेंट क्षेत्र' : lang === 'mr' ? 'व्यवसाय स्थान व ५-१० किमी परिसर' : 'Business Location & Catchment Area'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi' 
              ? 'सटीक बाजार पहुंच और स्थानीय प्रतिस्पर्धियों के वास्तविक विश्लेषण हेतु स्थान चुनें।' 
              : 'Select exact location or drop pin on map for live catchment & competitor intelligence.'}
          </p>
        </div>

        {/* GPS Button */}
        <button
          type="button"
          onClick={handleDetectCurrentLocation}
          disabled={gpsLoading}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-70 flex-shrink-0"
        >
          {gpsLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{lang === 'hi' ? 'जीपीएस खोज रहा है...' : 'Acquiring GPS...'}</span>
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4" />
              <span>{lang === 'hi' ? 'मेरा वर्तमान स्थान चुनें (GPS)' : lang === 'mr' ? 'माझे सध्याचे स्थान वापरा' : 'Detect My Location (GPS)'}</span>
            </>
          )}
        </button>
      </div>

      {gpsError && (
        <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Interactive Map Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>
              {lang === 'hi' ? 'नक्शे पर पिन लगाएं (क्लिक या ड्रैग करें):' : 'Pinpoint on Map (Click or drag marker):'}
            </span>
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            {formData.latitude ? `${formData.latitude}, ${formData.longitude}` : '18.5204, 73.8567'}
          </span>
        </div>

        {/* Leaflet Map Box */}
        <div 
          ref={mapContainerRef} 
          className="w-full h-64 sm:h-72 rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden shadow-inner z-0"
          style={{ minHeight: '260px' }}
        />

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <span>💡 {lang === 'hi' ? 'नीले रंग का दायरा आपके 5-10 किमी के व्यावसायिक कैचमेंट को दर्शाता है।' : 'Blue circle visualizes your localized 5-10 km customer catchment.'}</span>
          <span className="font-semibold text-blue-700 dark:text-blue-400">OpenStreetMap Live</span>
        </div>
      </div>

      {/* Catchment Radius Slider */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
          <span>{lang === 'hi' ? 'स्थानीय व्यापार दायरा (Catchment Radius):' : 'Catchment Radius:'}</span>
          <span className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-blue-600 dark:text-blue-400 font-extrabold text-sm">
            {currentRadius} km
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="10"
          step="1"
          value={currentRadius}
          onChange={(e) => setFormData(prev => ({ ...prev, catchment_radius_km: Number(e.target.value) }))}
          className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <span>2 km (वार्ड / गांव केंद्र)</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {lang === 'hi' ? `अनुमानित आबादी दायरा: ~${estimatedPopulation.toLocaleString()} नागरिक` : `Estimated Reach: ~${estimatedPopulation.toLocaleString()} residents`}
          </span>
          <span>10 km (ब्लॉक / तहसील)</span>
        </div>
      </div>

      {/* Cascading Administrative Hierarchy: State -> District -> Sub-district -> Village -> Pincode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
        
        {/* State Selector (All 28 States + 8 UTs) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            {lang === 'hi' ? 'राज्य / केंद्र शासित प्रदेश (State / UT) *' : 'State / UT *'}
          </label>
          <div className="relative">
            <select
              value={formData.state || 'Maharashtra'}
              onChange={(e) => handleStateSelect(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none pr-8 text-slate-800 dark:text-slate-100"
            >
              {ALL_INDIA_STATES_LIST.map((st) => (
                <option key={st.name} value={st.name}>
                  {lang === 'hi' ? `${st.nameHi} (${st.name})` : st.name} {st.type === 'UT' ? '(UT)' : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* District Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            {lang === 'hi' ? 'जिला (District) *' : 'District *'}
          </label>
          <div className="relative">
            <select
              value={formData.district || ''}
              onChange={(e) => handleDistrictSelect(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none pr-8 text-slate-800 dark:text-slate-100"
            >
              {formData.district && !districtsList.some(d => d.name.toLowerCase() === formData.district.toLowerCase()) && (
                <option value={formData.district}>{formData.district}</option>
              )}
              {districtsList.map((d) => (
                <option key={d.name} value={d.name}>
                  {lang === 'hi' && d.nameHi ? `${d.nameHi} (${d.name})` : d.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Sub-District / Tehsil Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            {lang === 'hi' ? 'तहसील / उप-जिला / ब्लॉक (Tehsil / Block) *' : 'Tehsil / Sub-district *'}
          </label>
          <div className="relative">
            <select
              value={formData.sub_district || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, sub_district: e.target.value }))}
              className="w-full px-3.5 py-2.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none pr-8 text-slate-800 dark:text-slate-100"
            >
              {formData.sub_district && !subdistrictsList.includes(formData.sub_district) && (
                <option value={formData.sub_district}>{formData.sub_district}</option>
              )}
              {subdistrictsList.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Village / Gram Panchayat / Town */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            {lang === 'hi' ? 'ग्राम पंचायत / कस्बा / वार्ड' : 'Village / Town / Ward'}
          </label>
          <input
            type="text"
            placeholder={lang === 'hi' ? 'उदा. शिवणे, वाघोली, सदर बाजार' : 'e.g. Shivane, Wagholi, Ward 4'}
            value={formData.village_or_town || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, village_or_town: e.target.value }))}
            className="w-full px-3.5 py-2.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
        </div>

        {/* PIN Code */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            {lang === 'hi' ? 'पिन कोड (Postal PIN Code)' : 'Postal PIN Code'}
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="e.g. 411001"
            value={formData.pincode || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
            className="w-full px-3.5 py-2.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
        </div>

        {/* Nodal DIC Office Info preview */}
        {(() => {
          const dInfo = getDistrictInfo(formData.state, formData.district);
          return (
            <div className="flex items-center p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
              <Info className="w-4 h-4 text-[#0B3D91] dark:text-blue-400 flex-shrink-0 mr-2" />
              <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                  {lang === 'hi' ? 'जिला उद्योग केंद्र (DIC):' : 'Nodal Agency:'}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {dInfo?.district?.dicOffice || `${formData.district || 'District'} DIC Office`}
                </span>
                {dInfo?.district?.leadBank && (
                  <span className="block text-[10px] text-blue-700 dark:text-blue-300 mt-0.5 font-medium">
                    Lead Bank: {dInfo.district.leadBank}
                  </span>
                )}
              </div>
            </div>
          );
        })()}

      </div>

    </div>
  );
};

export default LocationCatchmentPicker;
