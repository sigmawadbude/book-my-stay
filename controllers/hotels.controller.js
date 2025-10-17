const Hotel = require("../models/hotels");

const getAll = async (req, res) => {
    try {
        const hotels = await Hotel.find({});
        res.status(200).json({
            status: "success",
            results: hotels.length,
            data: hotels
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        })
    }

};

const create = async (req, res) => {
    try {
        // const hotel = new Hotel(req.body);
        const newHotel = await Hotel.create(req.body);
        res.status(201).json({
            status: "success",
            data: newHotel
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        })
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const hotel = await Hotel.findById(id);
        res.status(200).json({
            status: "success",
            data: hotel
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        })
    }

};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: updatedHotel
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        })
    }

};

const deleteHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
            data: deletedHotel
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        })
    }

};


module.exports = { getAll, create, getById, update, deleteHotel }