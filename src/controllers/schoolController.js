const pool = require('../config/db');

//Haversine formula — returns distance in km between two lat/lng points.
 
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

//POST /addSchool
async function addSchool(req, res) {
  try {
    const { name, address, latitude, longitude } = req.body;

    // --- Validation ---
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.push('name is required and must be a non-empty string.');
    }
    if (!address || typeof address !== 'string' || address.trim() === '') {
      errors.push('address is required and must be a non-empty string.');
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (latitude === undefined || latitude === null || latitude === '') {
      errors.push('latitude is required.');
    } else if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.push('latitude must be a valid number between -90 and 90.');
    }

    if (longitude === undefined || longitude === null || longitude === '') {
      errors.push('longitude is required.');
    } else if (isNaN(lon) || lon < -180 || lon > 180) {
      errors.push('longitude must be a valid number between -180 and 180.');
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    //Insert ---
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name.trim(), address.trim(), lat, lon]
    );

    return res.status(201).json({
      success: true,
      message: 'School added successfully.',
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude: lat,
        longitude: lon,
      },
    });
  } catch (err) {
    console.error('addSchool error:', err);
    return res.status(500).json({ success: false, error: 'Failed to add school.' });
  }
}

//GET /listSchools?latitude=XX&longitude=YY

async function listSchools(req, res) {
  try {
    const { latitude, longitude } = req.query;

    //Validation ---
    const errors = [];

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    if (latitude === undefined || latitude === '') {
      errors.push('latitude query parameter is required.');
    } else if (isNaN(userLat) || userLat < -90 || userLat > 90) {
      errors.push('latitude must be a valid number between -90 and 90.');
    }

    if (longitude === undefined || longitude === '') {
      errors.push('longitude query parameter is required.');
    } else if (isNaN(userLon) || userLon < -180 || userLon > 180) {
      errors.push('longitude must be a valid number between -180 and 180.');
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Fetch all schools ---
    const [schools] = await pool.execute(
      'SELECT id, name, address, latitude, longitude FROM schools'
    );

    // Sort by proximity ---
    const sorted = schools
      .map((school) => ({
        ...school,
        distance_km: parseFloat(
          haversineDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)
        ),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      count: sorted.length,
      user_location: { latitude: userLat, longitude: userLon },
      data: sorted,
    });
  } catch (err) {
    console.error('listSchools error:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch schools.' });
  }
}

module.exports = { addSchool, listSchools };
