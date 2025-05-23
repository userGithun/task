const SchoolModel = require('../model/school')

class SchoolController {

    static addSchool = async (req, res) => {
        try {
            const { name, address, latitude, longitude } = req.body;

            // Validate fields (optional, but good practice)
            if (!name || !address || !latitude || !longitude) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const [result] = await SchoolModel.addSchool({ name, address, latitude, longitude });

            res.status(201).json({
                success: true,
                message: "School added",
                insertId: result.insertId
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                error: "Database insert failed"
            });
        }
    };

    static listSchools = async (req, res) => {
        try {
            const { latitude, longitude } = req.query;

            if (!latitude || !longitude) {
                return res.status(400).json({
                    success: false,
                    message: "Latitude and longitude required"
                });
            }

            const userLat = parseFloat(latitude);
            const userLng = parseFloat(longitude);

            if (isNaN(userLat) || isNaN(userLng)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid latitude or longitude"
                });
            }

            const schools = await SchoolModel.getAllSchools();
            console.log('Schools from DB:', schools);
            // Distance calculation function
            const calcDistance = (lat1, lon1, lat2, lon2) => {
                const toRad = (deg) => deg * Math.PI / 180;
                const R = 6371; // Radius of Earth in KM
                const dLat = toRad(lat2 - lat1);
                const dLon = toRad(lon2 - lon1);

                const a = Math.sin(dLat / 2) ** 2 +
                    Math.cos(toRad(lat1)) *
                    Math.cos(toRad(lat2)) *
                    Math.sin(dLon / 2) ** 2;

                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return R * c;
            };

            // Map schools with calculated distance
            const updatedSchools = schools.map((s) => {
                // Convert lat/lng to float if they are string
                const lat = parseFloat(s.latitude);
                const lng = parseFloat(s.longitude);

                if (isNaN(lat) || isNaN(lng)) {
                    return { ...s, distance: null };
                }

                const distance = calcDistance(userLat, userLng, lat, lng);
                return { ...s, distance: parseFloat(distance.toFixed(2)) };
            });

            // Sort by distance ascending
            updatedSchools.sort((a, b) => {
                // If distance null, put at end
                if (a.distance === null) return 1;
                if (b.distance === null) return -1;
                return a.distance - b.distance;
            });

            res.status(200).json({
                success: true,
                schools: updatedSchools
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "Error while fetching schools"
            });
        }
    };


}
module.exports = SchoolController