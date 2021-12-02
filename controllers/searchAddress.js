const getAddress = async (lat, long) => {
    // format string as a querry parameter value
    try {
        const res = await fetch(`http://api.digitransit.fi/geocoding/v1/reverse?point.lat=${lat}&point.lon=${long}&size=1`);
        const features = await res.json();
        console.log('features', features.features);
        return features;
    }
    catch (e) {
        console.log('geocoding error', e);

    }
};

export default getAddress;