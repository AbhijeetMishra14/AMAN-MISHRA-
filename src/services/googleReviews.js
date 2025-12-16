
import axios from 'axios';

export const getGoogleReviews = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/reviews');
    
    if (response.data.success && response.data.result?.reviews) {
      console.log(`✓ Fetched ${response.data.result.reviews.length} reviews`);
      return response.data.result.reviews || [];
    } else {
      console.warn('⚠️ No reviews data:', response.data.error);
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching Google reviews:', error.message);
    return [];
  }
};
