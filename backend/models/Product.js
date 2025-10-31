const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, default: "", trim: true },
    precio: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    imagenUrl: { type: String, default: "" },
    categoria: { type: String, default: "general", trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.virtual("imagen").get(function () {
  return this.imagenUrl;
});

productSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id.toHexString();
    if (!ret.imagen && ret.imagenUrl) {
      ret.imagen = ret.imagenUrl;
    }
    delete ret._id;
  },
});

module.exports = model("Product", productSchema);

