
const getGeocoding = async (address) => {
  // format string as a querry parameter value
  try{
    const validatedAddress = address.split(' ').join('%20');
    console.log('address formatted', validatedAddress);

  const res = await fetch(`https://api.digitransit.fi/geocoding/v1/search?text=${validatedAddress}`);
  const features = await res.json();
  console.log('features', features.features);
  
  return features.features;
  }
  catch(e) {
    console.log('geocoding error', e);
    
  }
};

export default getGeocoding;
