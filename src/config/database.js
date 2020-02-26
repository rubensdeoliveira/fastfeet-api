module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeetdb',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
