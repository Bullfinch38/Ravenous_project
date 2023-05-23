const apiKey = 'paste in apiKey';


const Yelp = {
  search(term, location, sortBy) {
    // Check if either term or location is missing, and return a rejected promise with an error message
    if (!term && !location) {
      return Promise.reject(new Error('Please enter a business name or a location.'));
    }

    const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => ({
            id: business.id,
            image: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
          }));
        } else {
          throw new Error('Error retrieving business listings.');
        }
      })
      .catch((error) => {
        console.error(error);
        return []; // Return an empty array if there was an error
      });
  },
};



export default Yelp;
