const mongoose = require('mongoose');
const slugify = require('slugify');
//Making a schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    slug:String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number, // Added type: Number
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      type: String, //Fixed typo
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//virtual properties
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
//document middleware: runs before .save() and .create()
// tourSchema.pre('save', function (next) {
//     this.slug = slugify(this.name, { lower: true });
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

//QUERY MIDDLEWARE
// /^find/ is a regular expression that matches any method that starts with 'find'
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } }); // Exclude secret tours
  this.start = Date.now();
  next();
});
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

//Creating a model
// Model is a class with which we can create and read documents from the underlying MongoDB database.
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
