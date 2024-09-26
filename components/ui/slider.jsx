import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,  // The URL of the image
  },
  caption: {
    type: String,    // Text that will appear on the slide
  },
  link: {
    type: String,    // Optional URL to link the slide to a page
  },
  order: {
    type: Number,    // Optional field to control the order of the slides
  }
});

const sliderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // Name of the slider (in case you have multiple sliders)
  },
  slides: [slideSchema],  // Array of slide objects
});

const Slider = mongoose.model('Slider', sliderSchema);

export default Slider;