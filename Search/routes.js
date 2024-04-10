import axios from "axios";

const searchRequest = axios.create({
  baseURL: "http://api.tvmaze.com/search/shows",
});

export const search = async (searchQuery) => {
  const response = await searchRequest.get("", { params: { q: searchQuery } });
  return response.data;
};

export default function SearchRoutes(app) {
  app.get("/search", async (req, res) => {
    const { q: searchQuery } = req.query;

    try {
      const data = await search(searchQuery);
      const refinedData = data.map((show) => ({
        id: show.show.id,
        title: show.show.name,
        image: show.show.image?.original,
        summary: show.show.summary,
        avgRuntime: show.show.avgRuntime,
        status: show.show.status,
        language: show.show.language,
        premiered: show.show.premiered,
        rating: show.show.rating?.average,
      }));
      res.send(refinedData);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  });
}
