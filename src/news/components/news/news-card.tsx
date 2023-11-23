import { News } from "../../types";

const NewsCard: React.FC<{ news: News }> = ({ news }) => (
    <div>
        <img loading="lazy" src={news.image_url} className="w-full aspect-video rounded-sm mb-1" />
        <h3 className="line-clamp-2">{news.title}</h3>
    </div>
)

export { NewsCard };