

export const getHome = (req, res) => {
  res.send('Hello World from Express!');
};

export const getHelloApi = (req, res) => {
  res.json({ message: 'Hello from REST API!' });
};

