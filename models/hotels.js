const mongoose = require('mongoose');

const ACCOMMODATION_TYPES = ['hotel', 'apartment', 'guesthouse', 'villa', 'resort'];
const HOTEL_CATEGORIES = ['standard', 'deluxe', 'luxury'];

const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Hotel Name is required'],
            trim: true,
            minlength: [3, 'Name must be at least 3 characters long'],
            maxlength: [100, 'Name must be at most 100 characters long'],
        },

        description: {
            type: String,
            required: [true, 'Hotel Description is required'],
            trim: true,
            maxlength: [2000, 'Description is too long'],
        },

        type: {
            type: String,
            enum: ACCOMMODATION_TYPES,
            required: [true, 'Type of accommodation is required'],
            lowercase: true,
            index: true,
        },

        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true,
            maxlength: [100, 'City is too long'],
            index: true,
        },

        address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true,
            maxlength: [200, 'Address is too long'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price must be a positive number'],
            max: [99999, 'Price cannot exceed $99,999'],
        },
        images: {
            type: [String],
            default: [],
            validate: {
                validator: (arr) => arr.every((u) => typeof u === 'string'),
                message: 'Images must be an array of strings (URLs).',
            },
        },
        rating: {
            type: Number,
            default: 0,
            min: [0, 'Rating must be between 0 and 5'],
            max: [5, 'Rating must be between 0 and 5'],
        },
        categories: {
            type: [{ type: String, enum: HOTEL_CATEGORIES, lowercase: true }],
            default: ['standard'],
        },
        rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
        cheapestPrice: {
            type: Number,
            required: [true, 'Cheapest Price is required'],
            min: [0, 'Cheapest Price must be a positive number'],
            validate: {
                validator: function (v) {
                    // Only validate if price is provided
                    if (typeof this.price === 'number') return v <= this.price;
                    return true;
                },
                message: 'Cheapest price cannot exceed the base price.',
            },
        },
        featured: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

/** Useful indexes */
// Unique hotel name within the same city (case-insensitive)
hotelSchema.index({ name: 1, city: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });
// Fast lookups by location/type/price
hotelSchema.index({ city: 1, type: 1, price: 1 });

/** Normalization */
hotelSchema.pre('save', function (next) {
    if (this.name) this.name = this.name.trim();
    if (this.city) this.city = this.city.trim();
    if (this.address) this.address = this.address.trim();
    next();
});

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
