
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

/**
 * GET /api/reviews
 * Fetch Google reviews for the business from Google Places API
 */
router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const placeId = process.env.GOOGLE_MAPS_PLACE_ID;

    // Validate credentials
    if (!apiKey || !placeId) {
      console.warn('⚠️ Google Maps credentials not configured');
      return res.status(200).json({
        success: false,
        error: 'Google Maps API credentials not configured',
        result: { reviews: [] }
      });
    }

    // Fetch from Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
    
    const response = await axios.get(url);

    if (response.data.status === 'OK' && response.data.result) {
      console.log(`✓ Fetched ${response.data.result.reviews?.length || 0} reviews from Google Places`);
      return res.status(200).json({
        success: true,
        result: response.data.result
      });
    } else {
      console.error('Google Places API Error:', response.data.error_message);
      return res.status(200).json({
        success: false,
        error: response.data.error_message || 'Failed to fetch reviews',
        result: { reviews: [] }
      });
    }
  } catch (error) {
    console.error('❌ Error fetching Google reviews:', error.message);
    return res.status(200).json({
      success: false,
      error: 'Failed to fetch Google reviews',
      message: error.message,
      result: { reviews: [] }
    });
  }
});

export default router;