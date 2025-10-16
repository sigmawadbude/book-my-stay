
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/hotels.json");

let hotels = JSON.parse(
    fs.readFileSync(dataPath)
);

const getAll = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            hotels,
        },
    });
};

const create = (req, res) => {
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

const getById = (req, res) => {
    const hotelId = parseInt(req.params.id);
    const hotel = hotels.find((hotel) => hotel.id === hotelId);
    if (!hotel) {
        return res.status(404).json({ status: "error", message: "Hotel not found" });
    }
    res.status(200).json({
        status: "success",
        data: {
            hotel,
        },
    });
};

const update = (req, res) => {
    const hotelId = parseInt(req.params.id);
    const index = hotels.findIndex((hotel) => hotel.id === hotelId);
    if (index === -1) {
        return res.status(404).json({ status: "error", message: "Hotel not found" });
    }
    const updatedHotel = Object.assign({}, hotels[index], req.body);
    hotels[index] = updatedHotel;
    fs.writeFile(dataPath, JSON.stringify(hotels, null, 2), (err) => {
        if (err) {
            console.error("Error writing hotels file:", err);
            return res.status(500).json({ status: "error", message: "Failed to save hotel data" });
        }

        res.status(200).json({
            status: "success",
            data: {
                hotel: updatedHotel,
            },
        });
    }
    );
};

const deleteHotel = (req, res) => {
    const hotelId = parseInt(req.params.id);
    const index = hotels.findIndex((hotel) => hotel.id === hotelId);
    if (index === -1) {
        return res.status(404).json({ status: "error", message: "Hotel not found" });
    }
    hotels.splice(index, 1);
    fs.writeFile(dataPath, JSON.stringify(hotels, null, 2), (err) => {
        if (err) {
            console.error("Error writing hotels file:", err);
            return res.status(500).json({ status: "error", message: "Failed to save hotel data" });
        }

        res.status(202).json({ status: "success", data: null });
    }
    );
};


module.exports = { getAll, create, getById, update, deleteHotel }