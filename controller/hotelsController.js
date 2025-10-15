
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/hotels.json");

let hotels = JSON.parse(
    fs.readFileSync(dataPath)
);

const getAllHotels = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            hotels,
        },
    });
};

const createHotel = (req, res) => {
    const newId =
        hotels[hotels.length - 1].id + 1 || Math.floor(Math.random() * 999);
    const newHotel = Object.assign({ id: newId }, req.body);
    hotels.push(newHotel);
    fs.writeFile(dataPath, JSON.stringify(hotels, null, 2), (err) => {
        if (err) {
            console.error("Error writing hotels file:", err);
            return res.status(500).json({ status: "error", message: "Failed to save hotel data" });
        }

        res.status(201).json({
            status: "success",
            data: {
                hotel: newHotel,
            },
        });
    });
};


module.exports = { getAllHotels, createHotel }