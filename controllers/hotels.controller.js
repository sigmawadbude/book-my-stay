const Hotel = require("../models/hotels");

function getQueryOptions(query) {
  let queryStr = {};
  for (let key in query) {
    const value = query[key];
    const match = key.match(/^(.*)\[(gt|gte|lt|lte)\]$/);

    if (match) {
      const fieldName = match[1];
      const operator = `$${match[2]}`;

      if (!queryStr[fieldName]) {
        queryStr[fieldName] = { [operator]: value };
      } else {
        queryStr[fieldName][operator] = value;
      }
    } else {
      queryStr[key] = value;
    }
  }
  return queryStr;
}

const getAll = async (req, res) => {
  try {
    const { sort, fields, ...rest } = req.query;
    const filteredQuery = getQueryOptions(rest);
    let query = Hotel.find(filteredQuery);
    // sorting
    if (sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("name");
    }

    // fields limiting
    if (fields) {
      const selectedFields = req.query.fields.split(",").join(" ");
      query.select(selectedFields);
    } else {
      query.select("-__v");
    }
    
    const hotels = await query;
    res.status(200).json({
      status: "success",
      results: hotels.length,
      data: hotels
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
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