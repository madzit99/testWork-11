import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
  mongoose: {
    db: "mongodb://localhost/lalafo",
  },
};

export default config;
