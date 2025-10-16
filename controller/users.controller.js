const getAll = (req, res) => {
    res.status(200).json({
        status: "success",
        data: [],
    });
}

const getById = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {},
    });
}
module.exports = {
    getAll, getById
}