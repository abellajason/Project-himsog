// children-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const children = new Schema({
    firstname: { type: String },
    middlename: { type: String },
    lastname: { type: String },
    gender: { type: String },
    birthdate: { type: Date },
    region: String,
    province: String,
    city: String,
    barangay: String,
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bmi: { type: Number },
    isMalnourished: { type: Boolean },
    age: Number,
  }, {
    timestamps: true
  });

  return mongooseClient.model('children', children);
};
