export default () => ({
  port: parseInt(process.env.PORT || '5000', 10),
  database: {
    uri: process.env.MONGO_URI || 'mongodb+srv://new-user:root@cluster0.qyr92tu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  },
});
